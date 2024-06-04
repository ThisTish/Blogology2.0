const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const { hash } = require('bcrypt')

class User extends Model{}

User.init({
	user_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	username:{
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			//todo  check for validation options
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			min:{
				args: 5
			}//todo maybe?
		}
	}
},
{
	// todo check...
	hooks:{
beforeCreate: hash('password', 10)
	}
},
{
	sequelize,
	// todo options/constraints
})

module.exports = User