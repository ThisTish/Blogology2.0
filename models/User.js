const Model = require('sequelize')
const sequelize = require('../config/connection')

class User extends Model{}

User.init({
	// todo define columns
},
{
	sequelize,
	// todo options/constraints
})

module.exports = User