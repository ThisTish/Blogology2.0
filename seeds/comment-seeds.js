const { Comment } = require('../models')

const commentData = [
	{
		// todo input filler according to schmea
	}
]

const seedComments = () => Comment.bulkCreate(commentData)

module.exports = seedComments