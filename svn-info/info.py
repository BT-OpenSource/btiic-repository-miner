import svn.remote
import sys
import json

def send_error(errStr):
    err = {
        'error': errStr
    }
    print(err)
    sys.exit(0)

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
    try:
        details = json.loads(get_stdin())
        repo = svn.remote.RemoteClient(details.get('repository'), username=details.get('user'), password=details.get('password'))
        info = repo.info()
        info['relative_url'] = info['relative_url'][1:]
        print(json.dumps(info, default=str))
    except ValueError as err:
        print(err)
        send_error("Unexpected Error Occurred")



