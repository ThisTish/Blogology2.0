const express = require('express');
const Blog = require('../models/Blog');

const router = express.Router();

router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const blog = await Blog.findAll(id)
		if(!blogs) {
			return res.status(404).json({ message: 'No blogs found' });
		}
		res.json(blog);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
});

module.exports = router;