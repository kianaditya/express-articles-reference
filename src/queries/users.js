const db = require('../models')

const getUser = async (email) => {
  const user = await db.User.findOne({
    where: { email: email },
    attributes: ['firstName', 'lastName'],
    include: [
      {
        model: db.Post,
        as: 'Written',
        attributes: ['id', 'title', 'content'],
      },
      {
        model: db.Post,
        as: 'Saved',
        attributes: ['id', 'title', 'content'],
        through: {
          attributes: [],
        },
      },
    ],
  })
  return user
}

module.exports = getUser
