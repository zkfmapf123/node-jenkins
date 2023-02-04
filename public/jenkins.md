# Jenkins

## 1. Jenkins 설치

> image 설치

```
    docker pull jenkins/jenkins:lts
```

> process 설치

```
    docker run -d --restart always --name jenkins -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

## 2. Jenkins 파일 위치

> initialAdminPassword 위치

- var/jenkins_home/secrets/...

> Application 위치

- var/jenkins_home/workspace/[project_name]

## 3.Jenkins에 Application 등록하는 법

> 1. Nodejs plugin 설치

- Jenkins 관리 > Plugin Manager > Availble plugins > nodeJS

> 2. Global Plugin 설치

- Jenkins 관리 > Golbal Tool Configuration > Nodejs 설정

> 3. Github 연동

- Create a Job > Project 생성 >
- 소스코드관리 > Git > Repository URL 설정 OR Branched to Build 설정 (기본값 master)
- Build Environment > Check to "Provide Node & npm bin/folder to PATH"
- Build > Execute Shell > "npm install"
- Console로 확인

> 4. Jenkins Docker 연동하는 법

- Jenkins 관리 > Plugin Manager > Available plugins > install "cloudBees Docker Build and Publish"

- local > git clone https://github.com/zkfmapf123/jenkins-docker > docker build -t jenkins-docker ./

- docker container 있는 버전으로 다시 설치

```
    docker run -u 0 -d --restart always --name jenkins -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins-docker
```

> 5. Docker 형태로 배포하기 in Jenkins

- [Project_name] > Configure > Build Steps > Select "Docker Build and Publish" > Docker Hub에 존재하는 Repository를 입력한다

> docker.sock 확인

- var/jenkins_home/run/docker.sock

## n. Issue

> Docker Volume > Wrong Volume Permission?

- 권한 없음
- -u 매개변수를 사용해서 root로 실행

```
    docker run -u 0 -d --restart always --name jenkins -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```
