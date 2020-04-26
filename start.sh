cd ../home-automation-client &&
sudo docker build -t home-automation-client . &&
cd ../home-automation-api &&
sudo docker-compose down &&
sudo docker-compose up --build -d
