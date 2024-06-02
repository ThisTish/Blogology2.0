// *basic layout, controllers will go in function arguments.
// todo make controllers
// todo make other routes files


const router = require('express').Router()
const {Blog, User, Comment} = require('../../models')

router.route('/')
	.get()
	.post()

router.route('/:id')
	.get()
	.put()
	.delete()

module.exports = router

