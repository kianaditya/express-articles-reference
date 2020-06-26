// const jwt = require('jsonwebtoken')
const express = require('express')
// const secret = process.env.SECRET || 'some other secret as default'
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')
const router = express.Router()

passport.serializeUser(function (user, done) {
  done(null, user.id)
})
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      return done(err)
    }
    done(null, user)
  })
})
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async function (email, password, done) {
      const user = await db.User.findOne({ where: { email: email } })
      if (!user) {
        return done(null, false)
      }
      const passwordIsValid = await user.validatePassword(password)
      return passwordIsValid === true ? done(null, user) : done(null, false)
    }
  )
)

router.post('/login', passport.authenticate('local'), async (req, res) => {
  res.status(200).send()
})

module.exports = router
