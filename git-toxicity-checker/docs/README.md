# git-toxicity-checker


## Description
Toxicity Checker arbitrarily assigns a toxicity rating to the user's files and gives a quick description of its toxicity level.
CLOC analysis can be run against an entire repo (default) or only against the files modified in a merge request.
To analyse modified files only, provide the source and target branches for the merge request.

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

## Example Response body
```json
"result": [
    {
      "filename": "/src/main/java/com/bt/cats/appiumengine/execution/CommandBuilder.java",
      "anonInnerLength": 0,
      "methodLength": 55,
      "nestedIfDepth": 0,
      "booleanExpressionComplexity": 0,
      "classDataAbstractionCoupling": 0,
      "classFanOutComplexity": 10,
      "cyclomatic_complexity": 4
    }
]
```