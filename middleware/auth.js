const express = require('express')
const middleware = express()
const database = require('../db/users.json')

middleware.use(express.urlencoded({ extended: false }))


middleware.post('/login-post', (req, res) => {
	const { username, password } = req.body;
	try {
		const exists = database.find((data) => {
			return data.username === username;
		});
		
		if(!exists) {
			res.redirect('/login?err=1');
			res.end();
		}
		else
		{
			if(exists.password !== password) {
				res.redirect('/login?err=2');
				res.end();
			}
			else
			{
				res.redirect('/challenge-4');
			}
		}
	}
	catch (error) {
		console.log(error);
	}
})

middleware.post('/login-api-endpoint', (req, res) => {
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
		else
		{
			if(exists.password !== password) {
				return res.status(401).json({
					message: "Invalid login"
				})
			}
			else
			{
				return res.status(200).json({
					message: "Login successful"
				})
			}
		}
		
	}
	catch (error) {
		console.log(error);
	}
})

module.exports = middleware