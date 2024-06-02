const Model = require('sequelize')
const sequelize = require('../config/connection')

class Blog extends Model{}

Blog.init({
	// todo define columns
},
{
	sequelize,
	// todo options/constraints
})

module.exports = Blog