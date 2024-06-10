const sequelize = require('../config/connection')
const { User, Blog, Comment } = require('../models')
const colors = require('colors')
const userData =require('./userData.json')
const commentData =require('./commentData.json')
const blogData =require('./blogData.json')


const seedData = async()=>{
try {
	await sequelize.sync({force: true})
	
	const users = await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true
	})
	
	const blogs = await Blog.bulkCreate(blogData)
		console.log('Database seeded'.yellow)
		returning: true
	// const data = [users, comments, blogs]
	// 	console.log(data)

	const comments = await Comment.bulkCreate(commentData, {
	returning: true
	})

} catch (error) {
	console.log('error! error! error'.red, error)
}
	// sequelize.close()
}

seedData()