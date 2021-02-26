import sys
import json

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
    
    unique_authors = set()
    list(map(lambda entry: unique_authors.add(entry['author']), svnLog))

    
    print(json.dumps({
        'developers': list(unique_authors)
    }))