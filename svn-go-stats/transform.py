import sys
import json
import subprocess
import re
import statistics

def get_complexity():

    # Load the cyclomatic complexity info
    cyclostats = subprocess.check_output(['./gocyclo', 'repo']).decode("utf-8") 
    results = re.findall('([0-9]+)\s([^\s]+)\s([^\s]+)\s([^:]+):([0-9]+):([0-9]+)', cyclostats)

    # Setup a dictionary in which to keep track of the complixities
    # for each file
    files = {}

    # Build an array of complexities for each file
    for result in results:
        if result[3] in files:
            files[result[3]].append(int(result[0]))
        else:
            files[result[3]] = [int(result[0])]

    # Pick out the median value (picking the highest of the two
    # middle entries if needed) for each file
    for name, values in files.items():
        files[name] = statistics.median_high(values)

    return files

def get_duplicate_const_strings():

    # Load the const string duplication info
    cyclostats = subprocess.check_output(['./goconst', './repo/...']).decode("utf-8") 
    results = re.findall('([^:]+).+ other occurrence\(s\) of \"(.+)\" found in: ([^:]+).+\n?', cyclostats)

    files = {}

    # Build an array containing the number of potentially duplicated
    # constants by file
    for result in results:
        if result[0] in files:
            files[result[0]] = files[result[0]]+1
        else:
            files[result[0]] = 1

    return files

# Main service body
if __name__ == "__main__":  

    complexity = get_complexity()
    duplicate_const_strings = get_duplicate_const_strings()

    files = set()
    files.update(complexity.keys())
    files.update(duplicate_const_strings.keys())

    result = []

    for f in files:
        result.append({
            'filename': f,
            'cyclomaticComplexity': complexity[f] if f in complexity else 0,
            'duplicateConstStrings': duplicate_const_strings[f] if f in duplicate_const_strings else 0
        })

    print(json.dumps(result))