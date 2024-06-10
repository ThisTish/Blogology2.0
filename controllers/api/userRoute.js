const express = require('express');
const User = require('../../models/User');

const router = express.Router();

// GET /api/users
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server Error' });
	}
});

module.exports = router;