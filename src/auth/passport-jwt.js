const { Strategy, ExtractJwt } = require('passport-jwt')
const secret = 'secret'

const db = require('../models')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: secret,
}

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await db.User.findOne({ where: { email: payload.email } })
    if (user) {
      return done(null, { email: user.email })
    } else {
      return done(null, false)
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = (passport) => {
  passport.use(jwtStrategy)
}
