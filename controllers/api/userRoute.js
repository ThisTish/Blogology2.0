const router = require('express').Router()
const {User} = require('../../models')

// todo dashboard not working


// signup
router.post('/signup', async (req, res) => {
	await signup(req, res)
})

async function signup(req, res){
	try {
		let {username, password1, password2} = req.body
		console.log(`Signup ln 12: username: ${username}, password1: ${password1}, password2: ${password2}`.yellow)
		
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
		await loginSess(req, res, userData)
		
// res.redirect is in loginSess()

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
		console.log(`Login line 49 ${username} & ${password}`.blue)
		if(!username || !password){
			return res.status(400).json({message: 'Please enter a username and password'})
		}
		
		const userData= await User.findOne({where: {
			username: username
		}})
		
		if(!userData){
			return res.status(400).json({message: 'User not found'})
		}
		console.log(`Login ln 61 ${userData.password}`.blue)
		const validPassword = userData.checkPassword(password)
		console.log(`Login Valid line 63 ${validPassword}`.blue)
		if(!validPassword){
			return res.status(400).json({message: 'Invalid password'})
		}

		await loginSess(req, res, userData)
// redirecting in loginSess
	} catch (error) {
		console.log(error.red)
		res.status(500).json({message: 'Trouble logging in', error})	
	}
}
// login session
async function loginSess(req, res, userData) {
	try {
		req.session.save(() => {
			req.session.user_id = userData.user_id
			console.log(`loginSess ln 81: user id: ${(userData.user_id)}`.yellow)
			req.session.username = userData.username
			console.log(`loginSess ln 83: username: ${userData.username}`.yellow)
			req.session.logged_in = true
			console.log(` loginSess line 79${req.session.logged_in}`.cyan)
			res.redirect('/')//until dashboard is done

			// res.status(200).json({ user: userData, message: "You are now logged in".cyan })
		})
	} catch (error) {
		res.status(400).json({ message: 'Trouble logging in', error })
	}
}

// logout
router.post('/logout', async (req, res) => {
	await logout(req, res)
	console.log(`logout router ln 99 clicked`.red);
})
	
async function logout(req, res) {
	try {
		const logged_in = await req.session.logged_in
		if(logged_in){
			await req.session.destroy(() => {
				console.log(`logout route ln104: ${logged_in}`)
				res.status(204).json({message:`logged out`}).end()
			})
	
		}else{
			res.status(404).end()
		}
	
	} catch (error) {
		console.log(error.red)
		res.status(500).json({message: `error logging out`, error})
	}
}



// route to run getUsers to check user data
// !destroy before deploy
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

// todo seperate controllers from routes into respective folders