const Model = require('sequelize')
const sequelize = require('../config/connection')

class Comment extends Model{}

Comment.init({
	// todo define columns
},
{
	sequelize,
	// todo options/constraints
})

module.exports = Comment