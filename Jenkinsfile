pipeline {
    agent { docker { image 'node:16.17.1-alpine' } }
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
            }
        }
        stage('Test'){
            steps{
                echo "Looks good to me !"
            }
        }
    }
}