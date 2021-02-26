import sys
import json
import itertools

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
    try:
        inJson = json.loads(get_stdin())
    except ValueError:
        print('Decoding JSON has failed')
        exit()

    try:
        svnLog = inJson['svnLog']
    except KeyError:
        print('KeyError: svnLog not found')
        exit()

    try:
        uniqueFilesSet = set(inJson['uniqueFiles'])
    except KeyError:
        print('KeyError: uniqueFiles not found')
        exit()

    fileRevisionCount = {}

    # Loop through the commits in the SVN log
    for entry in svnLog:
        
        # Get only the files from the SVN log that also appear in unique files
        fileSet = set(entry.get("files"))
        fileSet = fileSet.intersection(uniqueFilesSet)

        for f in fileSet:
            fileRevisionCount[f] = fileRevisionCount.get(f, 0) + 1

    output = []

    for f in fileRevisionCount:
        output.append({
            'name': f,
            'commits': fileRevisionCount[f]
        })

    print(json.dumps(output))