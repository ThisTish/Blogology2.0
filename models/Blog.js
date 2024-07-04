const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Blog extends Model{
	
}

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
		text:{
			type: DataTypes.TEXT,
			allowNull: false
		},
		user_id:{
			type: DataTypes.INTEGER,
			refrences:{
				model: 'user',
				key: 'user_id'
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
	updatedAt: false,
	schema: 'blogology'
	}
)

module.exports = Blog