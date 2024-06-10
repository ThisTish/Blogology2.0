const router = require('express').Router()
const Blog = require('../../models/Blog')
const { Sequelize } = require('sequelize');
const isAuthenticated = require('../../utils/authorize');
const { use } = require('./userRoute');

// get blog by id
router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const blog = await Blog.findOne({where: { blog_id: id }})
		if(!blog) {
			return res.status(404).json({ message: 'No blogs found' })
		}
		res.json(blog)
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error })
	}
})

router.post('/', isAuthenticated, async (req, res) => {
	try {
		let { title, text} = req.body

		if(!title || !text) {
			console.log(`Missing required fields`)
			return res.status(400).json({ message: 'Missing required fields' })
		}
		const newBlog = await Blog.create({
			title,
			text,
			created_by: req.session.user_id
		})
		res.status(202).json(newBlog)
		// todo make dashboard
		// res.redirect('/dashboard')

		console.log(Object.keys(req.body))
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Server Error', error })
		}
})

router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const blog = await Blog.destroy({where: { blog_id: id }})
		if(!blog) {
			return res.status(404).json({ message: 'No blogs found' })
		}
		res.json({ message: 'Blog deleted' })
	} catch (err) {
		console.error(err)
		res.status(500).json({ message: 'Server Error' })
	}
})


// todo display associated comments

module.exports = router