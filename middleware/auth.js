const express = require('express')
const middleware = express()
const fs = require("fs")
const database = require('../db/users.json')

middleware.use(express.urlencoded({ extended: false }))

/* Login form submission */
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

/* Login API endpoint for Postman testing */
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

/* Signup form submission */
middleware.post('/signup-post', (req, res) => {
	const { username, password } = req.body;
	
	try {
		const saveData = (data) => {
			fs.writeFileSync("./db/users.json", JSON.stringify(data));
		};
		
		let foundUser = database.find((json) => {
			return json.username === username;
		});
		
		if((username == "")||(password == ""))
		{
			res.redirect('/signup?stat=3');
		}
		else
		{
			if(!foundUser) {
				let newUser = {
					id: Date.now(),
					username,
					password,
				};
				database.push(newUser);
				saveData(database);
				res.redirect('/signup?stat=1');
			}
			else
			{
				res.redirect('/signup?stat=2');
			}
		}
	}
	catch (error) {
		console.log(error);
	}
})

/* Signup API endpoint for Postman testing */
middleware.post('/signup-api-endpoint', (req, res) => {
	const { username, password } = req.body;
	
	try {
		const saveData = (data) => {
			fs.writeFileSync("./db/users.json", JSON.stringify(data));
		};
		
		let foundUser = database.find((json) => {
			return json.username === username;
		});
		
		if((username == "")||(password == ""))
		{
			return res.status(401).json({
				message: "One of the field is empty"
			})
		}
		else
		{
			if(!foundUser) {
				let newUser = {
					id: Date.now(),
					username,
					password,
				};
				database.push(newUser);
				saveData(database);
				
				return res.status(200).json({
					message: "Signup successful"
				})
			}
			else
			{
				return res.status(401).json({
					message: "You already have an account"
				})
			}
		}
	}
	catch (error) {
		console.log(error);
	}
})

module.exports = middleware