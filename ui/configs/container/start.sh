#!/bin/bash

# Ensure that the config file is empty
echo "{}" > /usr/share/nginx/html/config.json;

# Setup the config.json file from the environment
python3 env_setup.py REACT_APP /usr/share/nginx/html/config.json

# Now start nginx

nginx -g 'daemon off;'
