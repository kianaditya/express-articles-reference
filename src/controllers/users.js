const { getUser } = require('../queries')

const show = async (req, res) => {
  const user = await getUser(req.user.email)
  res.status(200).send(user)
}

module.exports = { show }
