const express = require('express')
const router = express.Router()
const {Comment} = require('../../models')

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll()
        res.status(200).json(comments)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error', error })
    }
})

router.post('/', async (req, res) => {
    try {
        const comment = await Blog.findByPk(req.params.id)
        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error', error })
    }
})

module.exports = router
