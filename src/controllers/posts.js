const db = require('../models')

exports.getAllPosts = async (req, res, next) => {
  const allPosts = await db.Post.findAll({
    attributes: ['id', 'title', 'content'],
    include: [  {
      model: db.User,
      as: 'author',
      attributes: ['firstName', 'lastName'],
    }]
  })
  res.status(200).send(allPosts)
}