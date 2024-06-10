const router = require('express').Router()
const {User, Blog} = require('../models')
const { Sequelize } = require('sequelize')


router.get('/', async (req, res) => {
	try {
		const blogs = await Blog.findAll()
		if(!blogs){
			return res.status(404).json({message: 'No blogs found'})
			return
		}
		res.json(blogs)		
		// res.render('homepage' , {blogs})
	} catch (error) {
		console.log(`Trouble getting blogs: ${error}`.red)
	}
})


router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const blog = await Blog.findOne({where: { blog_id: id }})
		if(!blog) {
			return res.status(404).json({ message: 'No blogs found' });
		}
		res.json(blog);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
});

module.exports = router


// login
// logout
// signup

