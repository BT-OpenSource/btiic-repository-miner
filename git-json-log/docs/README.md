# json-log

## Description
Fetch the log of a provided GIT repository in JSON format

## Required request body 
```json
{
"User": "user",
"Password": "pass",
"ProjectUrl": "/example/repoexmpl.git",
"Server": "gitlab.exampleserver.com",
"Token": "a git access token"
}
```


Attributes:
- projectUrl: Path to the project i.e. user/repo.git
- server: url of the git server i.e. github.com
- user/password/token: (optional) username & password or token required for private repositories
