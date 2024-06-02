const { User } = require('../models')

const userData = [
	{
		// todo input filler according to schmea
	}
]

const seedUsers = () => User.bulkCreate(userData

)

module.exports = seedUsers