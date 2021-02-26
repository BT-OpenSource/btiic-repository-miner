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

if [ "$url" = "null" ]
then
    reply "{\"error\":\"No URL provided\"}"
else
    if [ "$user" = "null" ] | [ "$password" = "null" ] | [ "$user" = '' ] | [ "$password" = '' ]; then
      svn export $url repo > /dev/null 2>&1
    else
      svn export $url repo --username $user --password $password --non-interactive > /dev/null 2>&1
    fi
    result=$(echo $json | python3 space-complexity-analyser.py)
    reply "{\"result\":$result}"
    rm -rf repo > /dev/null 2>&1
fi