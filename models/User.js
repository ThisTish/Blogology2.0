const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

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
			len:{
				msg: 'Username must be between 3 and 25 letters/numbers',
				args:[3,25]
			},
			isAlphanumeric:{
				msg: 'Username can only be letters & numbers'
			},
			notEmpty:{
				msg: 'Usesrname is required'
			},
			isLowercase:{
				msg: 'Please enter as lowercase'
			}
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate:{
			len:{
				msg: 'Password must be at least 8 characters long',
				args:[8]
			},
			notEmpty:{
				msg: 'Password is required'
			}
		}
	}
},
{
	hooks:{
		beforeCreate: (user =>{
				user.password = bcrypt.hash(user.password, 10)
				return user
		}),
		beforeUpdate: aync (user =>{
			user.password = bcrypt.hash(user.password, 10)
			return user
		}),

	},
},
{
	sequelize,
	freezeTableName: true,
	modelName: 'user',
	underscored: true,
	timestamps: false
})

module.exports = User