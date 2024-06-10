const router = require('express').Router()
const {User} = require('../../models')

// signup
router.post('/signup', async (req, res) => {
	await signup(req, res)
})

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
			// res.json(userData)
			await loginSess(req, res, userData)
			
	} catch (error) {
		res.status(500).json({message: 'Server Trouble signing up', error})	
}
}

// login
router.post('/login', async (req, res) => {
	await login(req, res)
})

async function login(req, res) {
	try {
		const {username, password} = req.body
		
		if(!username || !password){
			return res.status(400).json({message: 'Please enter a username and password'})
		}
		
		const userData= await User.findOne({where: {
			username: username
		}})
		
		if(!userData){
			return res.status(400).json({message: 'User not found'})
		}

		const validPassword = userData.checkPassword(password)
		
		if(!validPassword){
			return res.status(400).json({message: 'Invalid password'})
		}

		loginSess(req, res, userData)

	} catch (error) {
		res.status(500).json({message: 'Trouble logging in', error})	
	}
}
// login session
async function loginSess(req, res, userData) {
	try {
		req.session.save(() => {
			req.session.user_id = parseInt(userData.user_id)
			console.log(`user id: ${parseInt(userData.user_id)}`.yellow)
			req.session.username = userData.username
			console.log(`username: ${userData.username}`.yellow)
			req.session.logged_in = true
			res.status(200).json({ user: userData, message: "You are now logged in".cyan })
		})
	} catch (error) {
		res.status(400).json({ message: 'Trouble logging in', error })
	}
}

// logout
router.post('/logout', async (req, res) => {
	await logout(req, res)
})

async function logout(req, res) {
	const loggedIn = await req.session.logged_in
	if(loggedIn){
		req.session.destroy(() => {
			res.status(204).end()
		})
	}else{
		res.status(404).end()
	}
}

// route to run getUsers to check user data
router.get('/', async (req, res) => {
	await getUsers(req, res)

})
async function getUsers(req, res) {
	try {
		const users = await User.findAll()
		res.json(users)
	} catch (error) {
		console.log(`Trouble getting users: ${error}`.red)
		res.status(500).json({ message: 'Server Error', error })
	}
}


module.exports = router

