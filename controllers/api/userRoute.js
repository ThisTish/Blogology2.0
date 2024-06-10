// todo placeholder for now

const express = require('express')
const User = require('../../models/User')

const router = express.Router()

// GET /api/users
async function getUsers(req, res) {
	try {
		const users = await User.findAll()
		res.json(users)
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// route to run getUsers
router.get('/', getUsers)

module.exports = getUsers

