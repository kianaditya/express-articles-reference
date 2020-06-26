const factories = require('../factories')
const db = require('../../src/models')

before(async function () {
  try {
    const author = await factories.create('User',{email: 'author@mail.com'})
    const posts = []
    for (let index = 0; index < 4; index++) {
      const post = await factories.create('Post')
      author.addAuthor(post)
      posts.push(post)
    }
  } catch (error) {
    console.error(error)
  }
})

after(async function () {
  await db.sequelize.sync({ force: true })
})
