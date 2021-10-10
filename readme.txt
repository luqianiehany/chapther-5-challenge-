Commands:
npm install
node index.js

Main page http://localhost:2100/
Challenge 3 page http://localhost:2100/challenge-3
Signup page http://localhost:2100/signup
Login page http://localhost:2100/login
Challenge 4 page http://localhost:2100/challenge-4
JSON data page http://localhost:2100/json
404 page http://localhost:2100/abc

Postman:
POST http://localhost:2100/login-api-endpoint
raw, JSON
{
    "username": "hany",
    "password": "123"
}

POST http://localhost:2100/signup-api-endpoint
raw, JSON
{
    "username": "testuser",
    "password": "123456"
}