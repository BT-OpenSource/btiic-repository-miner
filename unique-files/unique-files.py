import sys
import json
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
        clocFiles = inJson['clocOutput']['files']
    except KeyError:
        print('KeyError: clocOutput or files not found')
        exit()
    
    clocBasePath = inJson.get('clocBasePath', '')
    
    # Build a list of unique files in both the svn log and cloc and then
    # find the intersection

    svn_unique_files = set()
    cloc_unique_files = set()

    list(map(lambda entry: svn_unique_files.update(entry['files']), svnLog))
    list(map(lambda file: cloc_unique_files.update([file['name']]), clocFiles))
    cloc_unique_files = set(map(lambda file: os.path.normpath("%s%s" % (clocBasePath, file)), cloc_unique_files))

    result = {
        'unique_files': list(svn_unique_files.intersection(cloc_unique_files))
    }

    print(json.dumps(result))