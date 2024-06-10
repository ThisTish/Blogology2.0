const router = require('express').Router()
const {User, Blog} = require('../models')
const { Sequelize } = require('sequelize')
const getUsers = require('./api/userRoute')

// get & display all blogs
router.get('/', async (req, res) => {
	try {
		const blogs = await Blog.findAll()
		if(!blogs){
			return res.status(404).json({message: 'No blogs found'})
			return
		}
		res.json(blogs)		
		// res.render('homepage' , {blogs})
	} catch (error) {
		console.log(`Trouble getting blogs: ${error}`.red)
	}
})

// signup

router.post('/', async (req, res) => {
	try {
		// res.send(req.body)
		let {username, password1, password2} = req.body
		console.log(`username: ${username}, password1: ${password1}, password2: ${password2}`.yellow)
		if(!username || !password1 ||!password2){
			return res.status(400).json({message: 'Please enter a username and password'})
		}
		if(password1 !== password2){
			return res.status(400).json({message: 'Passwords do not match'})
		}
		
		const password = password1
		const user = {
			username,
			password
		}
		const userData = await User.create(user)
		res.json(userData)
		
		// const users = getUsers()
		
	} catch (error) {
		console.log(`Trouble signing up: ${error}`.red)
	}
})

module.exports = router


// login
// logout
// signup

