const { getAllPosts, getSpecificPost } = require('../queries')

const index = async (req, res) => {
  const allPosts = await getAllPosts()
  res.status(200).send(allPosts)
}

const show = async (req, res) => {
  const specificPost = await getSpecificPost(req.params.id)
  res.status(200).send(specificPost)
}
module.exports = {
  index,
  show
}
