const express = require('express')
const router = express.Router()

const { create } = require('../controllers/category')
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth")
const { userById } = require('../controllers/user')

router.param('userId', userById) // set req.profile = user

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create)

module.exports = router