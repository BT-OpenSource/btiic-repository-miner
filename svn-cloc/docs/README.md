# Cloc

This is a microservice which sits on the research platform api. It allows users to perform a cloc analysis of a zip archive containing source code files. Constraints can be put in place on the minimum number of lines of code a file should have and how many results should be returned.

## Usage

### Perform a cloc analysis

To perform a cloc analysis simply send a JSON body of "repository":"url-of-zip-archive". Minimum number of lines of code can be set using "minLOC":"some number", and the number of results to return by "topResults":"some other number"

Example:

```bash
curl -X POST -H "Content-Type: application/json" -d '{ "repository": "http://www.fakeurl.com/files/repo.zip", "minLOC":"10", "topResults":"5" }' <microservice-endpoint>
``` 

This JSON message will analyse the repository contained in the zip archive, exclude all files with less then 10 lines of code, and return the results of the top 5 files. The analysis results will be returned to you in the JSON body of the reply.

## Develop

To develop for this project you need a shell environment (such as sh or bash) and the curl, wget, jq and cloc (> 1.72) packages installed.

Install the dependencies, for example for Ubuntu:

```bash
$ apt-get install curl wget jq cloc
```

Run:

```bash
$ chmod +x cloc.sh

$ ./cloc.sh
```