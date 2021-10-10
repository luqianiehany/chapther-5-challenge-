const express = require('express')
const app = express()
const fs = require("fs")
const database = require('./db/users.json')
const path = require('path')

app.set('view engine', 'ejs')

const router = require('./router/router')
app.use(router)

app.use('/challenge-3',express.static('./challenge3'))
app.use('/challenge-4',express.static('./challenge4'))
app.use(express.json())

const auth = require('./middleware/auth')
app.use(auth)

app.use('*', (req, res, next) => {
	console.error("Route not found")
	return res.status(404).sendFile('/views/notfound.html', {
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