const router = require('express').Router()
const {Blog, Comment, User} = require('../../models')
const { Sequelize } = require('sequelize');
// const isAuthenticated = require('../../utils/authorize');
const { use } = require('./userRoute');

// get blogs by logged in user/dashboard
router.get('/dashboard', async (req, res) => {
	// isAuthenticated,
	try {

		const userId = req.session.user_id
		const blogsData = await Blog.findAll({where: {
			user_id: userId
			}
		})
		if(!blogsData || blogsData.length === 0) {
			return res.status(404).json({ message: 'No blogs found' })
		}

		const blogs = blogsData.map(blog => blog.get({ plain: true }))

		res.json(blogs)
		// res.render('dashboard', {blogs})
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Server Error' })
	}
})

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

// post a blog
router.post('/', async (req, res) => {
	// isAuthenticated,
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

// Delete a blog
router.delete('/:id', async (req, res) => {
	// isAuthenticated,
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
router.put('/:id', async (req, res) => {
	// isAuthenticated,
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
// ? i'm here. gotta work on logging in
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
		// res.status(202).json(context)

		res.redirect(`/api/blogs/${id}`)
		
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Server Error updating post', error })
	}
})

module.exports = router