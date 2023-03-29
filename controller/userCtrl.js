const asyncHandeler = require('express-async-handler')
const User = require('../model/userModel')
const Video = require('../model/Video')

const updateUser = asyncHandeler(async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updateuser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updateuser)
        } catch (error) {
            next(error)

        }

    } else {

        throw new Error("you can update your account")
    }

})

const deleteUser = async (req, res) => {
    if (req.params.id === req.user.id) {
        try {
            const deleteuser = await User.findByIdAndDelete(req.params.id)
            res.status(200).json(deleteuser)
        } catch (error) {
            next(error)

        }

    } else {
        throw new Error("you can delete your account")
    }
}

const getUser = asyncHandeler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {

    }
})
const subscribeUser = asyncHandeler(async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $push: { subscribersUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 },
        })
        res.status(200).json({ message: "subscriber Success" })
    } catch (error) {

    }
})

const unsubscribeUser = asyncHandeler(async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $pull: { subscribersUsers: req.params.id }
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 },
        })
        res.status(200).json({ message: "Unsubscriber Success" })
    } catch (error) {
        next(error)
    }
})
const link = asyncHandeler(async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        const likes = await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        }
        )
        res.status(200).json({ message: "The video has liked", likes })

    } catch (error) {
        next(err)
    }


})

const dislike = asyncHandeler(async (req, res) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        const dislike = await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }

        })
        res.status(200).json({ message: "The video has liked", dislike })

    } catch (error) {
        next(err)
    }
})

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    subscribeUser,
    unsubscribeUser,
    link,
    dislike,
}