pipeline {
  // agent {
  //   docker {
  //       // image 'node:16'
  //       image 'timbru31/java-node'
  //       args '--user root -v /var/run/docker.sock:/var/run/docker.sock'
  //   }
  // }

  agent any

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

    // stage('Try again') {
    //   steps {
    //     sh 'which sonar-scanner'
    //     sh 'sonar-scanner -Dsonar.host.url=${SONAR_SERVER} -Dsonar.login=${SONAR_TOKEN}'
    //   }
    // }

    stage('SonarQube Scan') {
      steps {
        withSonarQubeEnv('SonarQubeServer') {
          sh 'npm run sonarqube'
        }
      }
    }

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

    stage('Update Deployment File') {
      environment {
        GIT_REPO_NAME = "jenkins-light-auto"
        BUILD_NUMBER = "v4.0.1"
      }
      steps {
        withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
          sh '''
              git config user.email "jimi.hunter008@gmail.com"
              git config user.name "Jimi Hunter"
              sed -i "s/replaceImageTag/${BUILD_NUMBER}/g" argo-cd/deployment.yml
              git add argo-cd/deployment.yml
              git commit -m "New Update deployment image to version ${BUILD_NUMBER}"
              git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:main
          '''
        }
      }
    }
  }
}