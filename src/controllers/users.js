const db = require('../models')

exports.getUser = async (req, res, next) => {
  const user = await db.User.findOne({
    where: { email: req.user.email },
    attributes: ['firstName', 'lastName'],
    include: [
      {
        model: db.Post,
        as: 'author',
        attributes: ['id', 'title', 'content'],
      },
    ],
  })
  res.status(200).send(user)
}
