#!/bin/sh

json=$(cat)
url=$(echo $json | jq -r '.repository')
user=$(echo $json | jq -r '.user')
password=$(echo $json | jq -r '.password')

if [ "$url" = "null" ]; then
      reply "{\"error\":\"No URL provided\"}"
else
    if [ "$user" = "null" ] | [ "$password" = "null" ] | [ "$user" = '' ] | [ "$password" = '' ]; then
      svn export $url repo > /dev/null 2>&1
    else
      svn export $url repo --username $user --password $password --non-interactive > /dev/null 2>&1
    fi
    cd repo
    cloc ./ --by-file --json --quiet --unix --report-file=../fileStats.json
    cd ..
    python3 format-results.py
    rm -rf repo > /dev/null 2>&1
    rm *.json > /dev/null 2>&1
fi