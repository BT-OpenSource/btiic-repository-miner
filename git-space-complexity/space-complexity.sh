#!/bin/sh

reply () {
   if [ -z "${X_Callback_Url}" ]; then
       echo $1
   else
       curl -X POST -H "Content-Type: application/json" -d $1 ${X_Callback_Url}
   fi
}


json=$(cat)
projectUrl=$(echo $json | jq -r '.projectUrl')
server=$(echo $json | jq -r '.server')
user=$(echo $json | jq -r '.user')
password=$(echo $json | jq -r '.password')
languages=$(echo $json | jq -r '.languages')
requestId=$(echo $json | jq -r '.requestId')
name=$(echo $json | jq -r '.name')

repoUrl="$requestId"_"$name"_

if [ "$projectUrl" = "null" ] | [ "$server" = "null" ]
then
    reply "{\"error\":\"No URL provided\"}"
else
    if  [ "$password" = "null" ] | [ "$user" = '' ] | [ "$password" = '' ]; then
      git clone --depth=1 "https://$server$projectUrl" "$repoUrl"repo > /dev/null 2>&1
    else
      git clone --depth=1 "https://$user:$password@$server$projectUrl" "$repoUrl"repo > /dev/null 2>&1
    fi
    result=$(echo $json | python3 space-complexity-analyser.py $repoUrl)
    reply "{\"result\":$result}"
    rm -rf "$repoUrl"repo > /dev/null 2>&1
fi
