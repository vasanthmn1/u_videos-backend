const asyncHandeler = require('express-async-handler')
const CommentModel = require('../model/comment')
const videoModel = require('../model/Video')


const addComment = asyncHandeler(async (req, res, next) => {
    try {
        const newcommenet = await CommentModel.create({ ...req.body, userId: req.user.id })
        res.status(200).json(newcommenet)
    } catch (error) {
        next(error)
    }
})

const deleteComment = asyncHandeler(async (req, res, next) => {
    try {
        const comment = await CommentModel.findById(req.params.id)

        const video = await videoModel.findById(req.params.id)

        if (req.userId == comment.userID || req.user.id === req.userId) {
            const del = await CommentModel.findOneAndDelete(req.params.id)
            res.status(200).json({ success: true, del })
        } else {
            throw new Error("you Can delete Youe comment")
        }

    } catch (error) {
        next(error)
    }
})

const getComment = asyncHandeler(async (req, res, next) => {
    try {
        const allcomment = await CommentModel.find({ videoId: req.params.videoId })
        res.status(200).json({ success: true, allcomment })
    } catch (error) {
        next(error)
    }
})

module.exports = {
    addComment,
    getComment,
    deleteComment
}