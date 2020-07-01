const db = require('../models')

exports.getUser = async (req, res, next) => {
  const user = await db.User.findOne({
    where: { email: req.user.email },
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
  res.status(200).send(user)
}
