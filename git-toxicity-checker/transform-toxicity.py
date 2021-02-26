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

def sumValuesAtPosition(errors, position):
    
    if len(errors) == 0:
        return int(0)

    sum = int(0)
    for error in errors:
        sum += int(error.get("message").split(" ")[position])

    return sum

# Main service body
if __name__ == "__main__":

    # Load the xml body
    toxicity_data = get_stdin()
    loaded_xml = elementTree.fromstring(toxicity_data)
    xml_file_entrys = loaded_xml.findall("file")

    json_entries = []

    for f in xml_file_entrys:

        filename = f.get('name')

        if not filename.endswith('.java'):
            continue

        # Extract Errors

        anonInnerLengthCheckErrors = f.findall("error[@source='com.puppycrawl.tools.checkstyle.checks.sizes.AnonInnerLengthCheck']")
        methodLengthCheckErrors = f.findall("error[@source='com.puppycrawl.tools.checkstyle.checks.sizes.MethodLengthCheck']")
        nestedIfDepthCheckErrors = f.findall("error[@source='com.puppycrawl.tools.checkstyle.checks.coding.NestedIfDepthCheck']")
        booleanExpressionComplexityCheckErrors = f.findall("error[@source='com.puppycrawl.tools.checkstyle.checks.metrics.BooleanExpressionComplexityCheck']")
        classDataAbstractionCouplingCheckErrors = f.findall("error[@source='com.puppycrawl.tools.checkstyle.checks.metrics.ClassDataAbstractionCouplingCheck']")
        classFanOutComplexityCheckErrors = f.findall("error[@source='com.puppycrawl.tools.checkstyle.checks.metrics.ClassFanOutComplexityCheck']")
        cyclomaticComplexityCheckErrors = f.findall("error[@source='com.puppycrawl.tools.checkstyle.checks.metrics.CyclomaticComplexityCheck']")

        # Process errors and generate json entry

        repoUrl="%s.%s"+sys.argv[1] + "repo"

        json_entries.append({
         #   'name': filename[filename.find("%s.%srepo" % (os.sep, os.sep)) + 7:].split(os.sep)[-1],
            'filename': "/" + filename[filename.find(repoUrl % (os.sep, os.sep)) + 7:],
            'anonInnerLength': sumValuesAtPosition(anonInnerLengthCheckErrors,5),
            'methodLength': sumValuesAtPosition(methodLengthCheckErrors,3),
            'nestedIfDepth': sumValuesAtPosition(nestedIfDepthCheckErrors,4),
            'booleanExpressionComplexity': sumValuesAtPosition(booleanExpressionComplexityCheckErrors,4),
            'classDataAbstractionCoupling': sumValuesAtPosition(classDataAbstractionCouplingCheckErrors,5),
            'classFanOutComplexity': sumValuesAtPosition(classFanOutComplexityCheckErrors,4),
            'cyclomatic_complexity': sumValuesAtPosition(cyclomaticComplexityCheckErrors,3)
        })

    print(json.dumps(json_entries))