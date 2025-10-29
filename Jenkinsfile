pipeline {
    agent { label 'skytrack_ssh' }

    stages {
        stage('Deploy RDC') {
            steps {
                echo "Running deployment on skytrack_slave node"
                sh '''
                git config --global --add safe.directory /home/azureuser/projects/round-the-clock
                cd /home/azureuser/projects/round-the-clock
                docker-compose down
                docker image prune -a -f
                git fetch origin main
                git reset --hard origin/main
                docker-compose build --no-cache
                docker-compose up -d
                '''
            }
        }
    }
}
