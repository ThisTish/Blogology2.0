const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Comment extends Model{}

Comment.init({
	comment_id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	comment: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references:{
			model: 'user',
			key: 'user_id'
		}
	},
	blog_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'blog',
			key: 'blog_id'
		}
	}
},
{
	sequelize,
	freezeTableName: true,
	modelName: 'comment',
	underscored: true,
	schema: 'blogology'
})

module.exports = Comment