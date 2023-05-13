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
        shell "npm install"
    }

    steps {
        shell "npm run test"
    }
}