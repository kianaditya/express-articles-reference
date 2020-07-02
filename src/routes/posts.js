// /routes/posts.js
const express = require('express')
const router = express.Router()

const postsController = require('../controllers/posts')

router.get('/', postsController.index)
router.get('/:id', postsController.show)

module.exports = router
