const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')

const { addUser, getAllUsers } = require('../controllers/user')

//GET ALL USERS
router.get('/user', getAllUsers)

//ADD USER
router.post('/user', upload.single('picture'), addUser)

module.exports = router