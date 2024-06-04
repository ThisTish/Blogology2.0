const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Comment extends Model{}

Comment.init({
	comment_id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	text: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	blog_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'blog',
			key: 'blog_id'
		}
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references:{
			model: 'user',
			key: 'user_id'
		}
	}
},
{
	sequelize,
	freezeTableName: true,
	modelName: 'comment',
	timestamps: true,
	createdAt: true,
	updatedAt: false,
	underscored: true
})

module.exports = Comment