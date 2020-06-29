require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const passport = require('passport')

const app = express()
const PORT = process.env.PORT

app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(passport.initialize())
app.use(passport.session())
require('./auth/passport-jwt')(passport)

const db = require('./models')
const { createSeeds, deleteSeeds } = require('./models/seeders')
const auth = require('./auth')
app.use(auth)

const postRouter = require('./routes/posts')
app.use('/posts', postRouter)

const userRouter = require('./routes/users')
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter)

const seed = process.argv[2]
if (seed) {
  db.sequelize
    .sync({ force: true })
    .then(() => {
      seed === 'create' ? createSeeds() : deleteSeeds()
    })

    .catch((err) => {
      console.error(err)
    })
} else {
  db.sequelize
    .sync()
    .then(() => {
      app.listen(PORT, () => {
        console.info(`App listening on port ${PORT}`)
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

module.exports = app
