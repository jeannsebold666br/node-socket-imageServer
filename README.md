# node-socket-imageServer
A simple image server which loads image from Mysql DB and sends it when client
connects on socket.io
## Running Locally
```sh
git clone git@github.com:rnayathodan/node-socket-imageServer.git
cd node-socket-imageServer
npm install

mysql -u root mysql
mysql> create database chatserver;
mysql> create user 'chat'@'localhost' identified by 'chat123';
mysql> grant all privileges on chatserver.* to 'chat'@'localhost';
mysql> exit

mysql -u root chatserver <chatserver.sql

node index.js

Open url http://localhost:3000/ in browser

```
