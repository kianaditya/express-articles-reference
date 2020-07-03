const queries = require('../models/queries')

const show = async (req, res) => {
  const email = req.user.email
  const user = await queries.getUser(email)
  res.status(200).send(user)
}

module.exports = { show }
