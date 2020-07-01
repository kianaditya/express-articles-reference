// /routes/posts.js
const express = require('express')
const router = express.Router()

const postsController = require('../controllers/posts')

router.get('/', postsController.getAllPosts)
router.get('/:id', postsController.getSpecificPost)

module.exports = router
