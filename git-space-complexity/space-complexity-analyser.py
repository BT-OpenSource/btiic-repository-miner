import sys
import os
import json
import xml.etree.ElementTree as elementTree

# Method for fetching the request payload from stdin
def get_stdin():
    buf = ""
    while(True):
        line = sys.stdin.readline()
        buf += line
        if line == "":
            break
    return buf

# Main service body
if __name__ == "__main__":

    # Load the request body and extract needed info
    inJson = json.loads(get_stdin())
    uniqueFilesSet = set(inJson['uniqueFiles'])

    spaceInfo = []

    for file in uniqueFilesSet:

        spaces = []

        with open(sys.argv[1]+"repo" + file, encoding='utf-8') as f:
            for line in f.readlines():
                modifiedLine = line.replace('\t', '    ')
                spaces.append(len(modifiedLine) - len(modifiedLine.lstrip()))
        
        if len(spaces) != 0:
            spaceInfo.append({
                'name': file,
                'meanSpaces': (sum(spaces)/len(spaces)),
                'maxSpaces': max(spaces)
            })
        else:
            spaceInfo.append({
                'name': file,
                'meanSpaces': 0,
                'maxSpaces': 0
            })

    print(json.dumps(spaceInfo))