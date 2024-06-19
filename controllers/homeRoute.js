const router = require('express').Router()
const {User, Blog, Comment} = require('../models')
const { Sequelize } = require('sequelize')
const isAuthenticated = require('../utils/authorize')
const colors = require('colors')
const session = require('express-session')

// get & display all blogs
router.get('/', async (req, res) => {
	try {
		const blogData = await Blog.findAll({
			include:[
				
				{
					model: User,
					attributes: ['username']
				},
				{
					model: Comment,
					attributes: ['comment', 'user_id', 'createdAt'],
					include: [
						{
							model: User,
							attributes: ['username']
						}
					]
				}
			]
			
		})
		if(!blogData){
			return 'No blogs found!'
		}

		const blogs = blogData.map(blog => blog.get({plain: true}))
		console.log(`logged in: ${req.session.logged_in}`.yellow)
		// !undefined
		// res.json(blogs)		
		res.render('homepage', {
			blogs,
			logged_In: req.session.logged_in
		})
	} catch (error) {
		res.status(500).json({msg:`Trouble getting blogs:`, error})
	}
})

// check if authorized/loggedin before going to user dashboard
router.get('/dashboard', isAuthenticated, async (req, res) => {
	try {
		const userData = await User.findByPk(req.session.user_id,{
			attributes: {
				exclude: [
					'password'
				]
			},
			include: [
				{
					model: Blog
				}, 
				{
					model: Comment
				}
			]
		})

		const user = userData.get({plain: true})

		res.render('dashboard', {
			...user,
			// logged_in: true
		})
	} catch (error) {
		res.status(500).json({msg:`Trouble loading dashboard:`, error})
	}
})

// render signup page
router.get('/signup', (req, res) => {
	if(req.session.loggedIn){
		res.redirect('/')
		return
	}
	res.render('signup')
})
// render login page
router.get('/login', (req, res) => {
	if(req.session.loggedIn){
		res.redirect('/')
		return
	}
	res.render('login')
})


module.exports = router