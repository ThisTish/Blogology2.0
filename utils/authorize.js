const isAuthenticated = (req, res, next) => {
	if (!req.session.logged_in) {
	res.status(401)
	} else {
	next()
	}
}

module.exports = isAuthenticated
