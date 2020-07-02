const db = require('../models')

const getAllPosts = async (req, res) => {
  const allPosts = await db.Post.findAll({
    attributes: ['id', 'title', 'content'],
    include: [
      {
        model: db.User,
        as: 'Author',
        attributes: ['firstName', 'lastName'],
      },
    ],
  })
  res.status(200).send(allPosts)
}

const getSpecificPost = async (req, res) => {
  const postId = req.params.id
  const specificPost = await db.Post.findOne({
    where: {
      id: postId,
    },
    attributes: ['id', 'title', 'content'],
    include: [
      {
        model: db.User,
        as: 'Author',
        attributes: ['firstName', 'lastName'],
      },
      {
        model: db.User,
        as: 'savedBy',
        attributes: ['firstName', 'lastName'],
        through: {
          attributes: [],
        },
      },
    ],
  })
  res.status(200).send(specificPost)
}

module.exports = {
  getAllPosts,
  getSpecificPost,
}
