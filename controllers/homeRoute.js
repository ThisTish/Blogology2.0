const router = require('express').Router()
const {User, Blog, Comment} = require('../models')
const { Sequelize } = require('sequelize')

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
					attributes: ['comment']
					// *todo comment showing empty but comment_id is there if there is one.
				}
			]
		})
		if(!blogData){
			return res.status(404).json({message: 'No blogs found'})
		}

		const blogs = blogData.map(blog => blog.get({plain: true}))
		// res.json(blogs)		
		res.render('homepage', {
			blogs
		// todo login functions not availabe yet.
		// ,loggedIn: req.session.loggedIn
		})
	} catch (error) {
		res.status(500).json({msg:`Trouble getting blogs:`, error})
	}
})

// get blog by id
router.get('/blog/:id', async (req, res) => {
	try {
		console.log(`id: ${req.params.id}`.yellow)
		const id = req.params.id;
		const blog = await Blog.findOne({where: { blog_id: id }})
		if(!blog) {
			return res.status(404).json({ message: 'No blogs found' })
		}
		res.json(blog)
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server Error' })
	}
})

// todo check if authorized/loggedin


module.exports = router