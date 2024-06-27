const router = require('express').Router()
const {Blog, Comment, User} = require('../../models')
const { Sequelize, json } = require('sequelize');
// const isAuthenticated = require('../../utils/authorize');

// get blogs by //todologged in
//user/dashboard
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

// new blog page
router.get('/newBlog', async (req, res) => {
		if(req.session.loggedIn){
			res.redirect('/')
			return
		}
		res.render('newBlog')
})

// Delete a blog
router.delete('/:id/delete', async (req, res) => {
	// isAuthenticated,
	console.log(`%cBlog delete triggered blogroutes ln 44`, `color: green`)
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

// edit blog form
router.get('/:id/editBlog', async (req, res) =>{
	try{
		const id = req.params.id
		const blogData = await Blog.findOne({
			where: {blog_id: id}
		})
		if(!blogData){
			res.status(404).json({message: `no blog found`})
		}
		
		const blog = await blogData.get({plain: true})
		console.log(`got blog data ln 72:${Object.keys(blog)}`.green)
		
		// res.json(blog)
		res.render('editBlog', blog)
	}
	catch(error){
		console.log(error.red)
	}
})
	
// get blog by id
router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id
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
router.post('/newBlog', async (req, res) => {
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
		// res.status(202).json(newBlog)
		
		res.redirect('/dashboard')

		console.log(Object.keys(req.body))
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Server Error', error })
		}
})


// update a blog
router.put('/:id', async (req, res) => {
	// isAuthenticated,
	try {
		const { title, text } = req.body
// !not getting title or text
		if(!title || !text){
			console.log(`error no content to update`)
			return
		}

		const id = req.params.id
		console.log(`blogroute id : ${id}`)
		const blog = await Blog.findByPk(id)
		console.log(`put blog route ln 146: ${blog}`.yellow)

		if(!blog) {
			return res.status(404).json({ message: 'No blogs found' })
		}
		const newBlog = await blog.update({ title, text })
		console.log(`updating blog route ln 150: ${newBlog}`.yellow)
		res.status(202).json(newBlog)
		//todo  not acutally updateing
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
		// res.status(202).json(context)

		res.redirect(`/api/blogs/${id}`)
		
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Server Error updating post', error })
	}
})

module.exports = router