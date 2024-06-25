const express = require('express')
const router = express.Router()
const Comment = require('../../models/Comment')
const Blog = require('../../models/Blog')
const sequelize = require('sequelize')
// get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll()

        if(!comments || comments.length === 0){
            res.status(404).json({message: 'No comments found'})
        }

        commentsPlain = comments.map(comment => comment.get({ plain: true }))

            res.status(200).json(commentsPlain)
                
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error', error })
    }
})

// ?post comment is in blog api controller
// router.post('/:id', async (req, res) => {
//     try {
//         const blog = await Blog.findByPk(req.params.id)
//         let { comment, user_id, blog_id } = req.body
//         const commentDetails = await Blog.create({ comment, user_id, blog_id })

//         const context = {
//             commentDetails,
//             blog,
//             logged_in: req.session.logged_in
//         }
//         res.status(200).json(context)
//         // todo recieve blog info as well with through association
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Server Error', error })
//     }
// })


router.put('/:id', async (req, res) => {
    try {
        const comment = await Blog.findByPk(req.params.id)
        res.status(200).json(comment)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error', error })
    }
})

// delete comment
router.delete('/delete/:id', async (req, res) => {
    const commentId = req.params.id

    await Comment.destroy({
        where:{
            comment_id : commentId
        }
    })

    res.status(200).json({message: 'Deleted Comment Succesfully'})

    // ?dunno if this is right
    // res.redirect('/blog/:id')
})

module.exports = router
