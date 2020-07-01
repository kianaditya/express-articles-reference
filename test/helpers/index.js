const factories = require('../factories')
const db = require('../../src/models')

before(async function () {
  try {
    factories.cleanUp()
    const author = await factories.create('User', { email: 'author@mail.com' })
    const author2 = await factories.create('User', {email: 'author2@mail.com' })
    const reader = await factories.create('User', { email: 'reader@mail.com' })

    for (let index = 0; index < 4; index++) {
      const post = await factories.create('Post')
      author.addWritten(post)
      author2.addSaved(post)
      // reader.addSaved(post)
      post.addSavedBy(reader)
      // posts.push(post)
    }
    for (let index = 0; index < 4; index++) {
      const post = await factories.create('Post')
      author2.addWritten(post)
      author.addSaved(post)
      reader.addSaved(post)
      // posts.push(post)
    }
  } catch (error) {
    console.error(error)
  }
})

after(async function () {
  await db.sequelize.sync({ force: true })
})
