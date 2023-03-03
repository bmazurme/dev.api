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

### Installation
...

Implemented features:
- [ ] Auth

### Docker

`docker-compose build`

`docker-compose up`

`docker-compose stop`

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
