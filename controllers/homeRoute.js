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
					// exclude?
				},
				// {
				// 	model: Comment,
				// 	attributes: ['comment', 'user_id', 'createdAt'],
				// 	include: [
				// 		{
				// 			model: User,
				// 			attributes: ['username']
				// 			// exclude?
				// 		}
				// 	]
				// }
			]
			
		})
		if(!blogData){
			return 'No blogs found!'
		}

		const blogs = blogData.map(blog => blog.get({plain: true}))
		console.log(`Home Route ln 36: logged in: ${req.session.logged_in}`.yellow)
		res.render('homepage', {
			blogs,
			logged_in: req.session.logged_in
		})
	} catch (error) {
		res.status(500).json({msg:`Trouble getting blogs:`, error})
	}
})

// check if authorized/loggedin before going to user dashboard
router.get('/dashboard', isAuthenticated,  async (req, res) => {
	
	try {
		const userData = await User.findByPk(req.session.user_id,{
			attributes: {
				exclude: [
					'password'
				]
			},
			include: [
				{
					model: Blog,
					include: [
						{
							model:User,
							attributes: ['username']
						}
					]
				}, 
				// {
				// 	model: Comment
				// }
			]
		})
		const user = userData.get({plain: true})
		res.render('dashboard', {
			...user,
			logged_in: req.session.logged_in
		})
	} catch (error) {
		res.status(500).json({msg:`Trouble loading dashboard:`, error})
	}
})



module.exports = router