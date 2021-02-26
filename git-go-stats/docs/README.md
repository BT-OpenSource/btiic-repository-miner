# git-go-stats-mr

## Description
Provide statistics relating to any go source code found in a provided GIT repository

## Required request body 
```json
{
"user": "user",
"password": "pass",
"projectUrl": "/example/repoexmpl.git",
"requestId":"{uuid}",
"server": "gitlab.exampleserver.com",
"token": "a git access token",
"source_branch": "changes",
"target_branch": "master"
}

```


Attributes:
- projectUrl: Path to the project i.e. user/repo.git
- server: url of the git server i.e. github.com
- user/password/token: (optional) username & password or token required for private repositories
- requestId: request v4 uuid
- source_branch: (optional) the merge request source branch
- target_branch: (optional) the merge request target branch
