const {Model, DataTypes, STRING} = require('sequelize')
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
				key: 'created_at'//createdAt?
				// this might work, if not make format_time function. from createdAt timestamp
			}
		},
		created_by: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references:{
				model: 'User',
				key:'user_id'
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