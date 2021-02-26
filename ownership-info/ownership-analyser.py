import sys
import json
from functools import reduce

# Method for fetching the request payload from stdin
def get_stdin():
    buf = ""
    while(True):
        line = sys.stdin.readline()
        buf += line
        if line == "":
            break
    return buf

def build_file_author_revisions(svnLog):

    # Calculate the total number of revisions for each file

    file_author_revisions = {}

    for entry in svnLog:

        for f in entry['files']:

            # If we have no author data for this file yet
            # then initiaise the datastructure to store it
            if f not in file_author_revisions:
                file_author_revisions[f] = {}
            
            if entry['author'] in file_author_revisions[f]:
                file_author_revisions[f][entry['author']] += 1
            else:
                file_author_revisions[f][entry['author']] = 1
    
    return file_author_revisions


def build_total_revisions(file_author_revisions, uniqueFiles):
    files = {}
    for f in uniqueFiles:
        files[f] = sum(file_author_revisions[f].values())
    return files

def build_file_owners(file_author_revisions, uniqueFiles):
    files = {}
    for f in uniqueFiles:
        files[f] = max(file_author_revisions[f], key=lambda j: file_author_revisions[f][j])
    return files

# Main service body
if __name__ == "__main__":

    # Load the request body
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
        uniqueFiles = inJson['uniqueFiles']
    except KeyError:
        print('KeyError: uniqueFiles not found')
        exit()

    file_author_revisions = build_file_author_revisions(svnLog)
    total_revisions = build_total_revisions(file_author_revisions, uniqueFiles)
    revision_owners = build_file_owners(file_author_revisions, uniqueFiles)
    
    result = list(map(lambda f: {
        'name': f,
        'total_revisions': total_revisions[f],
        'owner': revision_owners[f],
        'owner_revisions': file_author_revisions[f][revision_owners[f]],
        'owner_percent': str('%.2f' % float(float(file_author_revisions[f][revision_owners[f]]) / float(total_revisions[f])))
    }, uniqueFiles))

    print(json.dumps(result))