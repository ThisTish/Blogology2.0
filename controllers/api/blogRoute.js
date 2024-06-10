const router = require('express').Router()
const Blog = require('../../models/Blog')
const { Sequelize } = require('sequelize')


router.get('/:id', async (req, res) => {
	try {
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
});

module.exports = router