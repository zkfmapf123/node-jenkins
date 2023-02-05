# Node-Jenkins Example

## Desc

- [ ] Upload Jenkins Server In Linux
- [ ] Manage Jenkins Server
- [ ] Deploy Dev Servier And Prod Server Another Linux Server

## Index

- [1. 서버 구조 만들기](#서버-구조-만들기)
- [2. jenkins 설정](#jenkins-설정)
- [3. github webhooks 설정하기](#github-webhooks)
- [4. dev, prod 배포하기](#dev-prod-배포)

## 서버 구조 만들기

> (DEV Server) -> PORT 3001 && (PROD Server) -> PORT 3000

- docker-compse up --build

> (Jenkins Server) -> PORT 4000

- docker pull jenkins/jenkins:lts
- docker run -u 0 -d --restart always --name jenkins-server -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts

![서버구조](./public/68wcv.png)

1. 수정된 프로젝트는 Github Merge 된다.
2. 머지된 Master 브랜치는 Github Webhooks를 이용하여 Jenkins에 요청한다. + Docker
3. jenkins는 Dev, Prod 서버에 각각 배포를 진행한다

## Jenkins 설정

- 간단한 위치

  - initialPassword 위치 > var/jenkins_home>secrets>initial...
  - workspace 위치 > var/jenkins_home/workspace/...

- Jenkins > plugin Management + Global Tool Configuration을 활용하여 필요한 plugins들을 설치한다
  - Node
  - Docker build and publish
- Node Job 생성

## Github WebHooks

## DEV, PROD 배포
