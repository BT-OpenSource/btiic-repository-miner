#!/bin/sh

reply () {
   if [ -z "${X_Callback_Url}" ]; then
       echo $1
   else
       curl -X POST -H "Content-Type: application/json" -d $1 ${X_Callback_Url}
   fi
}

json=$(cat)
url=$(echo $json | jq -r '.repository')
user=$(echo $json | jq -r '.user')
password=$(echo $json | jq -r '.password')
repoUrl=$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-32});

if [ "$url" = "null" ]
then
    reply "{\"error\":\"No URL provided\"}"
else
    if [ "$user" = "null" ] | [ "$password" = "null" ] | [ "$user" = '' ] | [ "$password" = '' ]; then
      svn export $url "$repoUrl"repo > /dev/null 2>&1
    else
      svn export $url "$repoUrl"repo --username $user --password $password --non-interactive > /dev/null 2>&1
    fi
    result=$(java -jar checkstyle.jar -c metrics.xml -r "$repoUrl"repo -f xml | python3 transform-toxicity.py $repoUrl)
    reply "{\"result\":$result}"
    rm -rf "$repoUrl"repo > /dev/null 2>&1
fi