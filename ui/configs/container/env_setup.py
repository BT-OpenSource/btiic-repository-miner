import os
import json
import sys

variables = {}
variable_base = sys.argv[1]
output_file = sys.argv[2]

for key, value in os.environ.items():
  if key.startswith(variable_base):
    variables[key] = value

with open(output_file, 'w') as f:
  f.write(json.dumps(variables))
