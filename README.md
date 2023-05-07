# Authorization Server use Jenkins

## Architecture

![aws](./public/aws.png)

## Desc

- 간단한 인증 API
- Docker 활용
- Jenkins를 사용한 CI/CD

## Function

- [ ] 회원가입
- [ ] 로그인
- [ ] 아이디 찾기 (Email)
- [ ] 비밀번호 찾기
- [ ] 로그아웃

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
        step("1. hello world") {
            sh "echo 'hello world'"
        }
        step("2. ci"){
            sh "npm run test"
        }
    }
}
```

## ...

- Nat Gateway 비싸다.. (Side Project에서는 안쓰는 걸로)
- VPC Endpoint를 사용하자
