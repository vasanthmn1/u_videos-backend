const express = require('express')
const { googleAuth, validateGoogleUser } = require('../controller/authCtrl')

const routes = express.Router()


routes.post('/google', validateGoogleUser, googleAuth)

module.exports = routes