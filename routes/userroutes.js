
const express = require('express')
const { updateUser, deleteUser, getUser, unsubscribeUser, subscribeUser, link, dislike } = require('../controller/userCtrl')
const verifyToken = require('../utils/verfieyToken')

const router = express.Router()


// ! update user
router.put('/:id', verifyToken, updateUser)

// ! delete user
router.delete('/:id', verifyToken, deleteUser)
router.get('/find/:id', getUser)

//subscribe a user
router.put("/sub/:id", verifyToken, subscribeUser);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribeUser);

router.put("/like/:videoId", verifyToken, link);
router.put("/dislike/:videoId", verifyToken, dislike);



// router.put('/test', text)
module.exports = router