const queries = require('../models/queries')

const index = async (req, res) => {
  const allPosts = await queries.getAllPosts()
  res.status(200).send(allPosts)
}

const show = async (req, res) => {
  const specificPost = await queries.getSpecificPost(req.params.id)
  res.status(200).send(specificPost)
}
module.exports = {
  index,
  show,
}
