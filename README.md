# Node-CICD

## Desc

## Tools

### Jenkins

> CI/CD within the SDLC (Software Development Life Cycle)

```
    Devloper > Build > Test > Release > Deploy | Provision > Customer

    Devloper <-> Build (Plan)
    Develper <-> Test (Monitor)
    Release <-> Deploy (use jenkins)
```

> Install (use Docker)

```
    docker pull jenkins/jenkins:lts
    docker run -d --name jenkins -p 8080:8080 jenkins/jenkins:lts
    > localhost:8080
    > 추후에는 VM (Linux) + Docker Volume 다운받아서 진행

    - 처음에 비밀번호는 /var/jenkins_home/secrets/initialAdminPassword 여기에 존재함
```

### Docker

- <a href="https://github.com/zkfmapf123/til/blob/master/Docker_%EC%9D%B4%EB%A1%A0.md"> Docker </a>
