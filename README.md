# Project: dev.api
### Tech Stack
![Express](https://img.shields.io/badge/-Express-black?style=flat-square&logo=express)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![Eslint](https://img.shields.io/badge/-Eslint-black?style=flat-square&logo=eslint)
![Webpack](https://img.shields.io/badge/-Webpack-black?style=flat-square&logo=webpack)
![Docker](https://img.shields.io/badge/-Docker-black?style=flat-square&logo=docker)
![Nginx](https://img.shields.io/badge/-Nginx-black?style=flat-square&logo=nginx)
![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js)
![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb)
![Mongoose](https://img.shields.io/badge/-Mongoose-black?style=flat-square&logo=mongoose)
![Git](https://img.shields.io/badge/-Git-black?style=flat-square&logo=git)

### Installation
```bash
# Clone the repository on your computer:
$ git clone git@github.com:bmazurme/dev.api.git

# Install dependencies:
$ npm install

# Run dev mode:
$ npm run dev

# Build project:
$ npm run build

# Clear project:
$ npm run clear

# Run eslint:
$ npm run eslint

# Launch:
$ npm start
```

Implemented features:
- [X] Signup, signin, logout
- [X] Password confirm send email, reset, update
- [X] User info get, update
- [X] CI/CD GitHub Actions

### Docker

`docker-compose build`

`docker-compose up`

`docker-compose stop`

`docker system prune -a`

`docker push cr.yandex/${REGISTRY_ID}/devapi:latest`

`docker pull cr.yandex/${REGISTRY_ID}/devapi:latest`

`docker run cr.yandex/${REGISTRY_ID}/devapi:latest`

`docker run -d -p 80:3000 cr.yandex/${REGISTRY_ID}/devapi:latest`

[https://cloud.yandex.ru/docs/container-registry/tutorials/run-docker-on-vm#before-begin](https://cloud.yandex.ru/docs/container-registry/tutorials/run-docker-on-vm#before-begin)

`docker exec -it container_ID_or_name /bin/bash`

`docker-compose down --rmi all`

### NGINX

`sudo apt update`

`sudo apt install -y nginx`

`sudo ufw allow 'Nginx Full'`

`sudo ufw allow OpenSSH`

`sudo ufw enable`

`sudo systemctl enable --now nginx`

`sudo nano /etc/nginx/sites-available/default`

`sudo nginx -t`

`sudo systemctl reload nginx`

### SSL

`sudo apt update`

`sudo apt install -y certbot python3-certbot-nginx`

`sudo certbot --nginx`

`sudo systemctl reload nginx`
