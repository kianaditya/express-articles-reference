const db = require('../models')

const getAllPosts = async () => {
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
  return allPosts
}

const getSpecificPost = async (postId) => {
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
  return specificPost
}

module.exports = {
  getAllPosts,
  getSpecificPost,
}
