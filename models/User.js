const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')


class User extends Model{
	// grab blog method
	// async getBlogs(){
	// 	try {
	// 		console.log(this.getBlogs())
	// 	} catch (error) {
	// 		console.log(`Something went wrong with getting blogs by user`,error)
	// 	}
	// }
	// // grab comment method?
	// async getComments(){
	// 	try {
	// 		console.log(this.getComments())
	// 	} catch (error) {
	// 		console.log(`Something went wrong with getting comments by user`,error)
	// 	}
	// }
	checkPassword(loginPw) {
		return bcrypt.compareSync(loginPw, this.password);
	}
}

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
		beforeCreate: async (newUserData) =>{
			newUserData.password = await bcrypt.hash(newUserData.password, 10)
			return newUserData
		},
		beforeUpdate: async (updatedUser) =>{
			updatedUser.password = await bcrypt.hash(updatedUser.password, 10)
			return updatedUser
		}

	},
	sequelize,
	freezeTableName: true,
	modelName: 'user',
	underscored: true,
	timestamps: false
})

module.exports = User