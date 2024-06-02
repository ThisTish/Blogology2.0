const { Blog } = require('../models')

const blogData = [
	{
		// todo input filler according to schmea
	}
]

const seedBlogs = () => Blog.bulkCreate(blogData)

module.exports = seedBlogs