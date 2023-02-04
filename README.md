# Node-CICD

### Todo

- [ ] docker-compose.yml을 실행시킬수는 없을까?
- [ ] Github Push가 되면 Jenkins에서 알아서 배포할 수는 없을까?

## Command

```
    // docker-compose in nodejs
    make docker-run

    // jenkins 설치
    docker pull jenkins/jenkins:lts

    // jenkins conatainer
    docker run -u 0 -d --restart always --name jenkins -p 8080:8080 -p 50000:50000 -p 3001:3001 -p 3000:3000 -v /var/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts

```

- <a href="https://github.com/zkfmapf123/til/blob/master/Docker_%EC%9D%B4%EB%A1%A0.md"> Docker </a>
