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

    # Load the request body and get the files from the cloc output
    try:
        inJson = json.loads(get_stdin())
    except ValueError:
        print('Decoding JSON has failed')
        exit()

    try:
        files = inJson['files']
    except KeyError:
        print('KeyError: files not found')
        exit()

    # Loop through all the files and generate the stats

    languages = {}

    for f in files:

        language = f['language']

        # Create the language dict if it does not exist
        if language not in languages:
            languages[language] = {
                'name': language,
                'loc': 0,
                'numfiles': 0
            }
        
        # Add the data for the file
        languages[language]['loc'] += f['code']
        languages[language]['numfiles'] += 1

    print(json.dumps(languages))