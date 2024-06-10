const router = require('express').Router()
const userRoutes = require('./userRoute')
const blogRoutes = require('./blogRoute')
const commentRoutes = require('./commentRoute')

router.use('/users', userRoutes)
router.use('/blog', blogRoutes)
router.use('/comments', commentRoutes)

module.exports = router;
