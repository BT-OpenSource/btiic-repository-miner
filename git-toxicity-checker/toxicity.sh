#!/bin/bash

# Future reference for validating a temp token with Cerberus
# reply=$(curl -X POST -i -s -H "Content-Type: application/json" -d ${token} http://researchapi.zion.bt.co.uk:8080/function/cerberus | grep 200)
# if [ "$reply" != '' ]; then

reply () {
   if [ -z "${X_Callback_Url}" ]; then
       echo "$1"
       exit 0
   else
       curl -X POST -H "Content-Type: application/json" -d "$1" "${X_Callback_Url}"
   fi
}

is_null () {
  if [[ "$1" = "null" || "$1" = "" || -z "$1" ]]; then
    true
  else
    false
  fi
}

if test -n "$1"; then
    json=$1
elif test ! -t 0; then
    json=$(cat)
else
    reply "{\"error\":\"No data provided...\"}"
    exit 0
fi

token=$(echo "$json" | jq -r '.token')
projectUrl=$(echo "$json" | jq -r '.projectUrl')
server=$(echo "$json" | jq -r '.server')
requestId=$(echo "$json" | jq -r '.requestId')
user=$(echo "$json" | jq -r '.user')
password=$(echo "$json" | jq -r '.password')
src_branch=$(echo "$json" | jq -r '.source_branch')
tg_branch=$(echo "$json" | jq -r '.target_branch')

repoUrl="$requestId"

if is_null "$projectUrl" || is_null "$server"; then
	reply "{\"error\":\"No URL provided\"}"
	exit 0
fi

is_pr=$(is_null "$src_branch" || is_null "$tg_branch" && echo false || echo true)

if [ "$is_pr" = true ]; then
  flags="--depth=1 --no-single-branch -b "$src_branch
else
  flags="--depth=1"
fi

if ! is_null "$token"; then
  git clone ${flags} "https://oauth2:${token}@${server}${projectUrl}" "$repoUrl"repo > /dev/null 2>&1 || reply "{\"error\":\"Error ocurred while cloning repo\"}"
elif ! is_null "$user" && ! is_null "$password"; then
  git clone ${flags} "https://$user:$password@${server}${projectUrl}" "$repoUrl"repo > /dev/null 2>&1 || reply "{\"error\":\"Error ocurred while cloning repo\"}"
else
  git clone ${flags} "https://$server$projectUrl" "$repoUrl"repo > /dev/null 2>&1 || reply "{\"error\":\"Error ocurred while cloning repo\"}"
fi

if [ "$is_pr" = true ]; then
  rm -r "$repoUrl"repo/* > /dev/null 2>&1 || reply "{\"error\":\"Error ocurred while accessing modified files\"}"
  cd "$repoUrl"repo || reply "{\"error\":\"Failed to access cloned repo\"}"
  git archive -o archive.tar.gz origin/"$src_branch" $(git diff --name-only origin/"$tg_branch" origin/"$src_branch") > /dev/null 2>&1
  tar xvzf archive.tar.gz -C ./ > /dev/null 2>&1
  rm -rf .git* > /dev/null 2>&1 || reply "{\"error\":\"Error ocurred while accessing modified files\"}"
  rm archive.tar.gz > /dev/null 2>&1 || reply "{\"error\":\"Error ocurred while accessing modified files\"}"
  cd ..
fi

result=$(java -jar checkstyle.jar -c metrics.xml -r "$repoUrl"repo -f xml | python3 transform-toxicity.py "$repoUrl")
rm -rf "$repoUrl"repo > /dev/null 2>&1 || reply "{\"error\":\"IO error\"}"
reply "{\"result\":$result}"
