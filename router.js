const express = require('express')
const router = express.Router()
const fs = require("fs")

router.get('/', function(req, res){
	res.render('index')
})

router.get('/json', (req, res) => {
	const json = fs.readFileSync("./db/users.json")
	res.send(JSON.parse(json.toString()))
})

module.exports = router