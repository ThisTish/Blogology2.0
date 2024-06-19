const router = require('express').Router()
const {User, Blog, Comment} = require('../models')
const { Sequelize } = require('sequelize')
const isAuthenticated = require('../utils/authorize')

// get & display all blogs
router.get('/', async (req, res) => {
	try {
		const blogData = await Blog.findAll({
			include:[
				
				{
					model: User,
					attributes: ['username']
					// *todo username(user)& user_id showing null
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
					// *todo comment showing empty but comment_id is there if there is one.
				}
			]

			
		})
		if(!blogData){
			return res.status(404).json({message: 'No blogs found'})
		}

		const blogs = blogData.map(blog => blog.get({plain: true}))
		console.log(logged_in = req.session.logged_in)
		res.json(blogs)		
		// res.render('homepage', {
		// 	blogs,
		// 	logged_In: req.session.logged_in
		// })
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