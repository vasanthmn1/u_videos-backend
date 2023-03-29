
const express = require('express')
const { getComment, deleteComment, addComment } = require('../controller/commentsCtrl')
// const { text } = require('../controller/userctrl')
const verifyToken = require('../utils/verfieyToken')

const router = express.Router()

router.get('/:videoId', getComment)
router.delete('/:id', verifyToken, deleteComment)
router.post('/videoId', verifyToken, addComment)


module.exports = router