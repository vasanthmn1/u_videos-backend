const userModel = require("../model/userModel")
const asyncHandeler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateGoogleUser = (req, res, next) => {
    if (!req.body.email || !req.body.name) {
        return res.status(400).json({ message: "Email and name are required." });
    }
    next();
};


const googleAuth = asyncHandeler(async (req, res) => {

    try {
        const user = await userModel.findOne({ email: req.body.email })

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "5d" })
            res.status(200)
                .cookie('token', token, {
                    httpOnly: true
                })
                .json(user._doc)
        } else {
            const newuser = await userModel.create({
                ...req.body,
                fromGoogle: true
            })
            console.log(newuser);
            const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, { expiresIn: "5d" })
            res.status(200)
                .cookie('token', token, {
                    httpOnly: true
                })
                .json(newuser._doc)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }

})

module.exports = {
    googleAuth,
    validateGoogleUser
}