# Jenkins

## Jenkins 설치

> image 설치

```
    docker pull jenkins/jenkins:lts
```

> process 설치

```
    docker run -d --restart always --name jenkins -p 8080:8080 -p 50000:50000 -v ~/var/jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

## Jenkins Folder 위치구조

> initialAdminPassword 위치

- var/jenkins_home/secrets/...

> Application 위치

- var/jenkins_home/workspace/[project_name]

## Issue

> Docker Volume > Wrong Volume Permission?

- 권한 없음
- -u 매개변수를 사용해서 root로 실행

```
    docker run -u 0 -d --restart always --name jenkins -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```
