// *basic layout, controllers will go in function arguments.
// todo make controllers
// todo make other routes files


const router = require('express').Router()
const {Blog, User, Comment} = require('../../models')

router.route('/')
	.get(async (req, res) => {
		try {
			const blogs = await Blog.findAll();
			res.json(blogs);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	})

module.exports = router;

// router.route('/')
// 	.get()
// 	.post()

// router.route('/:id')
// 	.get()
// 	.put()
// 	.delete()

module.exports = router

