pipeline {
  agent {
    docker {
        // image 'node:16'
        image 'timbru31/java-node'
        args '--user root -v /var/run/docker.sock:/var/run/docker.sock'
    }
  }

//   agent any

  stages {
    stage('Build') {
      steps {
        sh 'node -v'
        sh 'npm install'
        sh 'java --version'
        sh 'echo $USER'
        sh 'whoami'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }

    // stage('SonarQube Scan') {
    //   steps {
    //     sh 'npm run sonarqube'
    //   }
    // }

    stage('Try again') {
      step {
        sh 'sonar-scanner -Dsonar.host.url=${SONAR_SERVER} -Dsonar.login=${SONAR_TOKEN}'
      }
    }

    // stage('SonarQube Scan') {
    //   steps {
    //     withSonarQubeEnv('SonarQubeServer') {
    //       sh 'npm run sonarqube'
    //     }
    //   }
    // }

    stage("Build Docker Image") {
      steps {
        sh "docker build -t jimi-jenkins-ci-image ."

        //Tag the docker image
        sh "docker tag jimi-jenkins-ci-image $DHUB_UNAME/ultimate-cicd:latest"
      }
    }

    stage('Push Docker Image') {
      steps {
        // sh 'docker push jimi-jenkins-ci-image'
        withCredentials([usernamePassword(credentialsId: 'dockerHubCred', passwordVariable: 'DHUB_PWORD', usernameVariable: 'DHUB_UNAME')]){
            sh 'docker login -u $DHUB_UNAME -p $DHUB_PWORD'
        }
        sh 'docker push $DHUB_UNAME/ultimate-cicd:latest'
      }
    }
  }
}