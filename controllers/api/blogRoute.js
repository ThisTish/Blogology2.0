const router = require('express').Router()
const {Blog, Comment, User} = require('../../models')
const { Sequelize } = require('sequelize');
const isAuthenticated = require('../../utils/authorize');
const { use } = require('./userRoute');

// get blog by id
router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const blogData = await Blog.findOne({
			where: { blog_id: id },
			include: [
				{
					model: User,
					attributes: ['username']
				},
				{
				model: Comment,
				attributes: ['comment', 'user_id', 'createdAt'],
				include:[{
					model: User,
					attributes: ['username']
					}]
				}
			]})
		if(!blogData) {
			return res.status(404).json({ message: 'No blogs found' })
		}
		const blog = blogData.get({plain: true})
		console.log(blog)

		// res.status(204).json(blog)
		res.render('blog', {blog})
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error })
	}
})

// get blogs by logged in user/dashboard
router.get('/', isAuthenticated, async (req, res) => {
	try {
		const blogs = await Blog.findAll({where: { user_id: req.session.user_id }})
		if(!blogs) {
			return res.status(404).json({ message: 'No blogs found' })
		}
		res.json(blogs)
		// res.render('dashboard', {blogs})
	} catch (error) {
		res.status(500).json({ message: 'Server Error', error })
	}
})

// post a blog
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
			user_id: req.session.user_id
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

router.delete('/:id',isAuthenticated, async (req, res) => {
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

// update a blog
router.put('/:id', isAuthenticated, async (req, res) => {
	try {
		let { title, text } = req.body
		const id = req.params.id
		const blog = await Blog.findOne({where: { blog_id: id }})
		if(!blog) {
			return res.status(404).json({ message: 'No blogs found' })
		}
		const newBlog = await Blog.update({ title, text }, { where: { blog_id: id }})
		res.status(202).json(newBlog)
		// res.redirect('/dashboard')

	} catch (error) {
		res.status(500).json({ message: 'Server Error updating post', error })
	}
})

// add comment
router.post('/:id/comment',  async (req, res) => {
// isAuthenticated,
	try {
		const id = req.params.id
		const blog = await Blog.findOne({
			where: { 
				blog_id: id 
			}
		})
		if(!blog) {
			return res.status(404).json({ message: 'No blogs found' })
		}

		if(!req.body.comment) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		const comment = await Comment.create({
			comment: req.body.comment,
			user_id: req.session.user_id,
			blog_id: parseInt(id)
		})

		const fullPost = await blog.addComment(comment)

		const context = {
			fullPost,
			logged_in: req.session.logged_in
		}
		res.status(202).json(context)
		
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Server Error updating post', error })
	}
})

// todo display associated comments

module.exports = router