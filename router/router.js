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

router.get('/signup', function(req, res){
	const stat = req.query.stat || ''
	var msg = ''
	if(stat == 1)
		msg = "<span style='color:#F9B23D;'>Thank you for signing up, please login <a href='/login'>here</a></span><style>form {display:none;}</style>"
	else if(stat == 2)
		msg = "You already have an account, please login <a href='/login'>here</a>"
	else if(stat == 3)
		msg = "Please fill up the form"
	res.render('signup', {
		msg
	})
})

router.get('/json', (req, res) => {
	const json = fs.readFileSync("./db/users.json")
	res.send(JSON.parse(json.toString()))
})

module.exports = router