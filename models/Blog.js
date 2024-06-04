const {Model, DataTypes, STRING} = require('sequelize')
const sequelize = require('../config/connection')

class Blog extends Model{}

Blog.init(
	{
		id:{
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
		createdOn:{
			type: DataTypes.DATE,
			allowNull: false
		},
		createdById: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references:{
				model: 'User',
				key:'id'
			}
			}
		
	},
	{
	sequelize,
	// todo options/constraints
	}
)

module.exports = Blog