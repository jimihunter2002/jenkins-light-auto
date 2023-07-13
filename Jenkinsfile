pipeline {
    agent {
        docker {
            image 'node:16.17.0-bullseye-slim'
            args '--user root -v /var/run/docker.sock:/var/run/docker.sock' // mount Docker socket to access the host's Docker daemon
        }
    }
    stages {
        stage('Checkout') {
            steps {
                sh 'echo passed'
                //git branch: this step would be checked out anyways
            }
        }
        stage('Build and Test') {
            steps {
                sh 'node --version'
                sh 'ls -ltr'
                //install dependencies
                sh 'cd jenkins-light-auto && npm install'
                // dir('jenkins-light-auto'){  
                //     sh 'npm install'
                //     sh 'npm test'
                // }                 
                
            }
        }
    }
}