const router = require('express').Router()
const Blog = require('../../models/Blog')
const { Sequelize } = require('sequelize')

// get blog by id
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