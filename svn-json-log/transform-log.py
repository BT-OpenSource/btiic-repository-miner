import sys
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

    # Load the xml body
    svn_data = get_stdin()
    loaded_xml = elementTree.fromstring(svn_data)

    # Find and loop through the log entries converting each one
    # to an equivalent JSON format
    xml_log_entrys = loaded_xml.findall('logentry')
    json_entries = []

    for entry in xml_log_entrys:

        # Collect together the information about the files (not folders)
        # involved in the commit

        filesXML = entry.findall("paths/path")
        files = list(map(lambda path: path.text.strip(), filesXML))

        json_entries.append({
            'revision': entry.get('revision').strip() if entry.get('revision') is not None else '',
            'author': entry.find('author').text.strip() if entry.find('author').text is not None else '',
            'date': entry.find('date').text.strip() if entry.find('date').text is not None else '',
            'message': entry.find('msg').text.strip() if entry.find('msg').text is not None else '',
            'files': files
        })

    print(json.dumps({ 'result': json_entries }))






