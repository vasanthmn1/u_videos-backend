const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
},
    { timesstamps: true }
)
module.exports = mongoose.model('Comment', commentSchema)