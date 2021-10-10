const express = require('express')
const router = express.Router()
const fs = require("fs")

router.get('/', function(req, res){
	res.render('index')
})

router.get('/login', function(req, res){
	const err = req.query.err || ''
	var errmsg = ''
	if(err == 1)
		errmsg = "User not found"
	else if(err == 2)
		errmsg = "Invalid login"
	res.render('user_login', {
		errmsg
	})
})

router.get('/json', (req, res) => {
	const json = fs.readFileSync("./db/users.json")
	res.send(JSON.parse(json.toString()))
})

module.exports = router