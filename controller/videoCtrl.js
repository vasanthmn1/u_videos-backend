const asyncHandeler = require('express-async-handler')
const User = require('../model/userModel')
const Video = require('../model/Video')



const addVideo = asyncHandeler(async (req, res, next) => {
    const newvideo = new Video({ userId: req.user.id, ...req.body })

    try {
        const saveVideo = await newvideo.save()
        res.status(200).json({ massage: "add video", saveVideo })
    } catch (error) {
        console.log(error);
        next(error)
    }
})

const updateVideo = asyncHandeler(async (req, res, next) => {
    try {
        const videos = await Video.findById(req.params.id)

        if (!videos) {
            throw new Error("Video not found")
        }

        if (req.user.id === videos.userId) {
            const updatevideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true })
            res.status(200).json({ updatevideo })
        } else {
            throw new Error("you can update youre video")
        }
    } catch (error) {

    }
})

const editVideo = asyncHandeler(async (req, res, next) => {

})

const deleteVideo = asyncHandeler(async (req, res, next) => {
    try {
        const videos = await Video.findById(req.params.id)

        if (!videos) {
            throw new Error("Video not found")
        }

        if (req.user.id === videos.userId) {
            const updatevideo = await Video.findByIdAndDelete(req.params.id, {
                $set: req.body,
            }, { new: true })
            res.status(200).json({ updatevideo })
        } else {
            throw new Error("you can delete youre video")
        }
    } catch (error) {
        next(error)
        // console.log(error)
    }
})

const getVideo = asyncHandeler(async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)

    } catch (error) {
        next(error)
    }

})

const addView = asyncHandeler(async (req, res, next) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json("the views has been increac")

    } catch (error) {

    }

})
const trend = asyncHandeler(async (req, res, next) => {
    try {
        const video = await Video.find().sort({ views: -1 })
        res.status(200).json(video)

    } catch (error) {

    }

})

const random = asyncHandeler(async (req, res, next) => {
    try {
        const video = await Video.aggregate([{ $sample: { size: 40 } }])
        res.status(200).json(video)

    } catch (error) {
        next(error)
    }

})

const sub = asyncHandeler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subChennal = user.subscribersUsers;

        const list = await Promise.all(
            subChennal.map(channelId => {
                return Video.find({ userId: channelId })
            })
        )


        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))

    } catch (error) {
        next(error);
    }

})


const getBytag = asyncHandeler(async (req, res, next) => {

    const tag = req.query.tags.split(',')
    console.log(tag);
    try {
        const video = await Video.find({ tags: { $in: tag } }).limit(20)
        res.status(200).json(video)

    } catch (error) {
        next(error)
    }

})


const search = asyncHandeler(async (req, res, next) => {
    const query = req.query.q
    // console.log(tag);
    try {
        const video = await Video.find({
            title: {
                $regex: query, $options: "i"
            },
        }).limit(20)
        res.status(200).json(video)
    } catch (error) {
        next(error)
    }

})

module.exports = {
    addVideo,
    updateVideo,
    editVideo,
    deleteVideo,
    getVideo,
    trend,
    sub,
    random,
    addView,
    search,
    getBytag

}