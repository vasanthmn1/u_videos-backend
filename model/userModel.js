const mongoose = require('mongoose')

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    img: {
        type: String,
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribersUsers: {
        type: [String],
    },
    fromGoogle: {
        type: Boolean,
        default: false
    }
},
    { timesstamps: true }
)
module.exports = mongoose.model('User', userschema)