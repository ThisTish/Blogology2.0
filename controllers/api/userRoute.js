// todo placeholder for now

const express = require('express')
const User = require('../../models/User')

const router = express.Router()

// GET /api/users
async function getUsers(req, res) {
	try {
		const users = await User.findAll()
		res.json(users)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Server Error' })
	}
}
// route to run getUsers
router.get('/', getUsers)




// login
router.post('/', async (req, res) => {
	try {
		const {username, password} = req.body
		if(!username || !password){
			return res.status(400).json({message: 'Please enter a username and password'})
		}
		const userData= await User.findOne({where: {
			username: username
		}})
		console.log(`userData: ${Object.keys(userData)}`.yellow)
		// todo serialize
		if(!userData){
			return res.status(400).json({message: 'User not found'})
	
		}
		const validPassword = await userData.checkPassword(password)
		if(!validPassword){
			return res.status(400).json({message: 'Invalid password'})
		}
		loginSess(req, res)

	} catch (error) {
		console.log('Trouble Logging In:', error)
	}
})

async function loginSess(req, res) {
	try {
		req.session.save(() => {
			req.session.user_id = userData.id
			req.session.username = userDate.username
			req.session.loggedIn = true
			res.json({ user: userDate, message: "You are now logged in".cyan })
		})
	} catch (error) {
		console.log(`Trouble logging in: ${error}`.red)
	}
}

// signup
async function signup(req, res){
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
			// todo create session->redirect to dashboard
			loginSess(req, res)
			// const users = getUsers()
			
			} catch (error) {
				console.log(`Trouble signing up: ${error}`.red)
	}
}

module.exports = getUsers
