pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Set up Node.js') {
            steps {
                script {
                    // NVM veya node kurulumu için ek adımlar eklenebilir
                    sh 'node --version || nvm install $NODE_VERSION'
                }
            }
        }
        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        // stage('Test Backend') {
        //     steps {
        //         dir('backend') {
        //             sh 'npm test'
        //         }
        //     }
        // }
        // stage('Deploy') {
        //     steps {
        //         echo 'Deploy adımını burada tanımlayın.'
        //     }
        // }
    }
} 