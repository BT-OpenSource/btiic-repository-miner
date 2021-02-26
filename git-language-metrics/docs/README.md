# git language metrics
This python and shell script will return cyclomatic complexity for each file in the repo provided.


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
{
    "result": {
        "cpp": [],
        "c": [],
        "csharp": [],
        "javascript": [],
        "swift": [],
        "scala": [],
        "python": [
            {
                "filename": "/gitlab-mr-comment/mr_comment.py",
                "cyclomatic_complexity": 3,
                "num_lines": 37,
                "num_tokens": 181
            },
            {
                "filename": "/orchestrator-function/app/functions/__init__.py",
                "cyclomatic_complexity": 0,
                "num_lines": 0,
                "num_tokens": 0
            },
            {
                "filename": "/orchestrator-function/app/functions/failure_threshold.py",
                "cyclomatic_complexity": 4,
                "num_lines": 12,
                "num_tokens": 85
            },
            {
                "filename": "/orchestrator-function/app/functions/mr_comment.py",
                "cyclomatic_complexity": 2,
                "num_lines": 12,
                "num_tokens": 85
            },
            {
                "filename": "/orchestrator-function/app/functions/collect_metrics.py",
                "cyclomatic_complexity": 2.5,
                "num_lines": 24,
                "num_tokens": 174
            },
            {
                "filename": "/orchestrator-function/app/functions/bug_predict.py",
                "cyclomatic_complexity": 1,
                "num_lines": 6,
                "num_tokens": 28
            },
            {
                "filename": "/orchestrator-function/app/health/__init__.py",
                "cyclomatic_complexity": 0,
                "num_lines": 3,
                "num_tokens": 18
            },
            {
                "filename": "/orchestrator-function/app/health/endpoints.py",
                "cyclomatic_complexity": 1,
                "num_lines": 5,
                "num_tokens": 38
            },
            {
                "filename": "/orchestrator-function/app/errors/handlers.py",
                "cyclomatic_complexity": 1.0,
                "num_lines": 16,
                "num_tokens": 103
            },
            {
                "filename": "/orchestrator-function/app/errors/__init__.py",
                "cyclomatic_complexity": 0,
                "num_lines": 3,
                "num_tokens": 18
            },
            {
                "filename": "/orchestrator-function/app/api/__init__.py",
                "cyclomatic_complexity": 0,
                "num_lines": 3,
                "num_tokens": 18
            },
            {
                "filename": "/orchestrator-function/app/api/endpoints.py",
                "cyclomatic_complexity": 8,
                "num_lines": 32,
                "num_tokens": 219
            },
            {
                "filename": "/orchestrator-function/app/models/ApplicationIntegration.py",
                "cyclomatic_complexity": 1,
                "num_lines": 12,
                "num_tokens": 55
            },
            {
                "filename": "/orchestrator-function/app/models/gitlab.py",
                "cyclomatic_complexity": 1,
                "num_lines": 35,
                "num_tokens": 228
            },
            {
                "filename": "/orchestrator-function/app/models/jenkins.py",
                "cyclomatic_complexity": 1.0,
                "num_lines": 38,
                "num_tokens": 270
            },
            {
                "filename": "/orchestrator-function/app/models/http_status.py",
                "cyclomatic_complexity": 0,
                "num_lines": 7,
                "num_tokens": 42
            },
            {
                "filename": "/orchestrator-function/app/models/orchestrator_error.py",
                "cyclomatic_complexity": 1.5,
                "num_lines": 10,
                "num_tokens": 69
            },
            {
                "filename": "/orchestrator-function/app/util/constants.py",
                "cyclomatic_complexity": 0,
                "num_lines": 1,
                "num_tokens": 3
            },
            {
                "filename": "/orchestrator-function/app/util/metrics_mapper.py",
                "cyclomatic_complexity": 3,
                "num_lines": 137,
                "num_tokens": 411
            },
            {
                "filename": "/orchestrator-function/app/util/helpers.py",
                "cyclomatic_complexity": 1.0,
                "num_lines": 27,
                "num_tokens": 147
            },
            {
                "filename": "/orchestrator-function/app/service/service.py",
                "cyclomatic_complexity": 6.5,
                "num_lines": 43,
                "num_tokens": 272
            },
            {
                "filename": "/orchestrator-function/app/__init__.py",
                "cyclomatic_complexity": 5,
                "num_lines": 31,
                "num_tokens": 213
            },
            {
                "filename": "/orchestrator-function/tests/test_app.py",
                "cyclomatic_complexity": 1.0,
                "num_lines": 243,
                "num_tokens": 1996
            },
            {
                "filename": "/orchestrator-function/tests/test_helpers.py",
                "cyclomatic_complexity": 2,
                "num_lines": 17,
                "num_tokens": 102
            },
            {
                "filename": "/orchestrator-function/tests/conftest.py",
                "cyclomatic_complexity": 1,
                "num_lines": 7,
                "num_tokens": 27
            },
            {
                "filename": "/orchestrator-function/tests/test_factory.py",
                "cyclomatic_complexity": 1.0,
                "num_lines": 9,
                "num_tokens": 59
            },
            {
                "filename": "/orchestrator-function/wsgi.py",
                "cyclomatic_complexity": 0,
                "num_lines": 4,
                "num_tokens": 22
            },
            {
                "filename": "/orchestrator-function/config.py",
                "cyclomatic_complexity": 0,
                "num_lines": 20,
                "num_tokens": 76
            },
            {
                "filename": "/gitlab-fetch-mr-details/gitlab-fetch-mr-details.py",
                "cyclomatic_complexity": 3,
                "num_lines": 75,
                "num_tokens": 428
            },
            {
                "filename": "/collect-metrics/collect_metrics.py",
                "cyclomatic_complexity": 1,
                "num_lines": 163,
                "num_tokens": 979
            }
        ],
        "ruby": [],
        "php": [],
        "lua": [],
        "ttcn": [],
        "ttcn3": []
    }
}
```
