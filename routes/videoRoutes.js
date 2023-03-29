
const express = require('express')
// const { text } = require('../controllers/userctrl')
const { getVideo, updateVideo, editVideo, deleteVideo, addVideo, random, sub, trend, search, getBytag } = require('../controller/videoCtrl')
const verifyToken = require('../utils/verfieyToken')

const router = express.Router()

router.get('/find/:id', getVideo)
router.post('/add', verifyToken, addVideo)
// router.put('view/:id', editVideo)

router.delete('/:id', verifyToken, deleteVideo)
router.get('/rendom', random)
router.get('/sub', verifyToken, sub)
// router.delete('/:id', trend)
router.delete('/:id', deleteVideo)
router.get("/trend", trend)
router.get('/tags', getBytag)
router.get('/search', search)



module.exports = router