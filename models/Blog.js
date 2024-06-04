const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Blog extends Model{}

Blog.init(
	{
		blog_id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title:{
			type: DataTypes.STRING,
			allowNull: false,
		},
		description:{
			type: DataTypes.TEXT,
			allowNull: false
		},
		created_on:{
			type: DataTypes.DATEONLY,
			allowNull: false,
			references: {
				model: 'blog',
				key: 'createdAt'
			}
		},
		created_by: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references:{
				model: 'User',
				key:'user_id'
			}
			},
		comment_id:{
			type: DataTypes.INTEGER,
			allowNull: true,
			references:{
				model: 'comment',
				key: 'comment_id'
			}
		}
		
	},
	{
	sequelize,
	freezeTableName: true,
	underscored: true,
	modelName: 'blog',
	timestamps: true,
	createdAt: true,
	updatedAt: false
	}
)

module.exports = Blog