import sys
import json
import itertools
import os

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

    # We need to take the output from the unique files service to build the
    # matrix and then take the svnLog info and generate the coupling pairs
    # to populate the matrix
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

    try:
        fileRevisionCountsRaw = inJson['revisionCounts']
    except KeyError:
        print('KeyError: revisionCounts not found')
        exit()

    # Initialise
    fileRevisionCount = {}
    for revision in fileRevisionCountsRaw:
        fileRevisionCount[revision.get("name")] = revision.get("commits")    

    # Initialise pair    
    pairCounts = {}

    nodes = set()

    # Loop through the commits in the SVN log
    for entry in svnLog:
        
        # Get only the files from the SVN log that also appear in unique files
        fileSet = set(entry.get("files"))
        fileSet = fileSet.intersection(uniqueFilesSet)
        nodes.update(fileSet)
        
        pairList = list(itertools.combinations(fileSet, 2))

        for pair in pairList:
            # Generate the inverse pair
            inversePair = pair[::-1]
            # First check if the pair of inverse pair already exist
            if pair in pairCounts:
                pairCounts[pair] += 1
            elif inversePair in pairCounts:
                pairCounts[inversePair] += 1
            else:
                pairCounts[pair] = 1

    edges = []

    for pair in pairCounts:
        maxCommits = max(fileRevisionCount[pair[0]], fileRevisionCount[pair[1]])
        edges.append({
            'edge': [pair[0], pair[1]],
            'weight': pairCounts[pair],
            'percent': pairCounts[pair] / maxCommits
        })

    outputNodes = []

    for node in nodes:
        outputNodes.append({
            'name': node.split(os.sep)[-1],
            'filename': node
        })

    print(json.dumps({
            'nodes': outputNodes,
            'edges': edges
        }))