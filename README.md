# Authorization Server use Jenkins

## Architecture

![aws](./public/aws.png)

## Desc

- 간단한 인증 API
- Docker 활용
- Jenkins를 사용한 CI/CD

## Function

### Func

- [ ] 회원가입
- [ ] 로그인
- [ ] 아이디 찾기 (Email)
- [ ] 비밀번호 찾기
- [ ] 로그아웃

### AWS

- [ ] public / private subnet으로 서비스 분리
- [ ] Jenkins를 사용하여 CI/CD 구성
  - [ ] DLS use Groovy
  - [ ] send Email
  - [ ] Deploy Dev, Prod

## DSL

```groovy
    // 1. ci.groovy
    job("NodeJS CI Process") {

    scm {
        git("https://github.com/zkfmapf123/node-jenkins.git") { node ->
            node / gitConfigName("leedonggyu")
            node / gitConfigEmail("zkfmapf123@naver.com")
        }
    }

    triggers {
        scm("H/5 * * * *")
    }

    wrappers {
        nodejs("nodejs")
    }

    steps {
        shell "npm run test"
    }
}
```

## ...

- Nat Gateway 비싸다.. (Side Project에서는 안쓰는 걸로)
- VPC Endpoint를 사용하자.
