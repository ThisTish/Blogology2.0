// todo 

router.get('/', (req, res) =>{
	Blog.findAll({raw:true})
	.then((blogs) => res.render('blogs', ({blogs})))
})

// const router = require('express').Router();

// router.get('/', async (req, res) => {
//   // Send the rendered Handlebars.js template back as the response
// 	res.render('homepage');
// });

// module.exports = router;
