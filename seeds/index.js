// todo ???'s
// ?make other files json? and use all logic js here??(act. 21 ref.)


const seedBlogs = require('./blog-seeds')
const seedComments = require('./comment-seeds')
const seedUsers = require('./user-seeds')
// ?maybe more if join models needed

const sequelize = require('../config/connection')

const seedAll = async () =>{
	await sequelize.sync({force:true})
	console.log('*.*.*DATABASE SYNCED*.*.*')
	// ? example has '\n slkdbljks \n' do i need the \n?
	
	await seedBlogs()
	console.log(`*****BLOGS SEEDED*****`)
	
	await seedComments()
	console.log(`*****COMMENTS SEEDED*****`)
	
	await seedUsers()
	console.log(`*****USERS SEEDED*****`)
	
	// ?maybe more if join models needed

	// ?have no idea what this does...
	process.exit(0)
}

seedAll()