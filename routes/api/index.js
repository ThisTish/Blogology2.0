const router = require('express').Router()
const { Blog, User, Comment } = require('../../models')
const blogRoutes = require('./blog-routes')

router.use('/blogs', blogRoutes)
// todo require routes from directory
// *const blogRoutes = require('./blog-routes')

// todo assign router.uses
//* router.use('/blogs', blogRoutes)

module.exports = router

// todo need to create api routes files(then tie them here above ^)
