pipeline {
  agent {
    docker {
        image 'node:16'
        args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }

  stages {
    stage('Build') {
      steps {
        sh 'node -v'
        sh 'npm install'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Sonar Scan') {
      steps {
        sh 'npm run sonarqube'
      }
    }

    stage('SonarQube Scan') {
      steps {
        withSonarQubeEnv('SonarQubeServer') {
          sh 'npm run sonarqube'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t jimi-jenkins-ci-image .'
      }
    }

    stage('Push Docker Image') {
      steps {
        sh 'docker push jimi-jenkins-ci-image'
      }
    }
  }
}