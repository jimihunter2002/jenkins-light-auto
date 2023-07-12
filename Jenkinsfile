pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'echo $USER'
                sh 'whoami' 
                dir('jenkins-light-auto'){  
                    sh 'npm install'
                    sh 'npm test'
                }               
               
                
                
                
                
            }
        }
    }
}