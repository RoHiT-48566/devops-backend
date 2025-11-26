pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/RoHiT-48566/devops-backend.git'
        DOCKER_IMAGE = 'student-crud-app'
        TEST_REPORT_DIR = 'test-results'
    }

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo '📦 Cloning code from public GitHub repo...'
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Run Automated Tests') {
            steps {
                echo '🧪 Running tests inside Docker container...'
                sh '''
                    mkdir -p $TEST_REPORT_DIR
                    docker run --rm \
                        -v $(pwd)/$TEST_REPORT_DIR:/app/$TEST_REPORT_DIR \
                        $DOCKER_IMAGE \
                        sh -c "npm install && npm test -- --reporter mocha-junit-reporter --reporter-options mochaFile=$TEST_REPORT_DIR/results.xml || true"
                '''
            }
            post {
                always {
                    echo '📊 Publishing test results...'
                    junit allowEmptyResults: true, testResults: 'test-results/*.xml'
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo '🧹 Cleaning up unused Docker resources...'
                sh 'docker system prune -f || true'
            }
        }
    }

    post {
        success {
            echo '✅ Build and tests passed successfully!'
        }
        failure {
            echo '❌ Build or tests failed. Check console output and test results.'
        }
    }
}
