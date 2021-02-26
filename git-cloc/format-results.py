import json
import sys

if __name__ == "__main__":
    fileName='./'+sys.argv[1]+ 'fileStats.json'
   

    with open(fileName) as f:

        # Read the JSON from cloc
        inJson = json.load(f)

        # Generate the initial output object
        del inJson['header']['report_file']
        outputObj = {'header': inJson['header'], 'SUM': inJson['SUM'], 'files': []}
        
        # Remove non-file data from input object and attach the remainder
        # as files to the output object
        del inJson['header']
        del inJson['SUM']

        # Reformat files into array
        for key, value in inJson.items():
            f = value
            value['name'] = key[1:]
            outputObj['files'].append(f)

        # Return the output
        print(json.dumps({ 'result': outputObj }))
