const express = require('express')
const app = express()
const fs = require("fs")
const database = require('./db/users.json')
const path = require('path')

app.set('view engine', 'ejs')

const router = require('./router')
app.use(router)

app.use('/challenge-3',express.static('./challenge3'))
app.use('/challenge-4',express.static('./challenge4'))
app.use(express.json())

app.post('/login-post', (req, res) => {
	const { username, password } = req.body;
	try {
		const exists = database.find((data) => {
			return data.username === username;
		});
		
		if(!exists) {
			return res.status(404).json({
				message: "User not found"
			})
		}
		
		if(exists.password !== password) {
			return res.status(401).json({
				message: "Invalid login"
			})
		}
		
		return res.status(200).json({
			message: "Login successful"
		})
		
		res.redirect('/');
	}
	catch (error) {
		console.log(error);
	}
})

app.use('*', (req, res, next) => {
	console.error("Route not found")
	return res.status(404).sendFile('404.html', {
		root: path.join(__dirname)
	})
	/*
	res.status(404).json({
		status: 'Fail',
		errors: 'Route not found'
	})
	*/
})

app.listen(2100, function(){
	console.log('Server nyala')
})