#!/bin/sh

json=$(cat)
url=$(echo $json | jq -r '.repository')
user=$(echo $json | jq -r '.user')
password=$(echo $json | jq -r '.password')

if [ "$url" = "null" ]
then
    echo "{\"error\":\"No URL provided\"}"
else
  if [ "$user" = "null" ] | [ "$password" = "null" ] | [ "$user" = '' ] | [ "$password" = '' ]; then
    svn log -v --xml $url | python3 transform-log.py
  else
    svn log -v --xml $url --non-interactive --username $user --password $password | python3 transform-log.py
  fi
    
fi