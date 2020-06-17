const db = require('../index')
const chance = require('chance').Chance()
const faker = require('faker')

const createSeeds = async () => {
  const author1 = await db.User.create({
    firstName: chance.first(),
    lastName: chance.last(),
  })

  const author2 = await db.User.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  })
  const postsCount = 3

  chance.mixin({
    post: function () {
      return {
        title: chance.sentence({ words: 5 }),
        content: chance.sentence({ words: 15 }),
      }
    },
  })
  for (let index = 0; index < postsCount; index++) {
    const post = await db.Post.create(chance.post())
    author1.addAuthor(post)
  }
  for (let index = 0; index < postsCount; index++) {
    const post = await db.Post.create({
      title: faker.lorem.sentence(),
      content: faker.lorem.sentence(),
    })
    author2.addAuthor(post)
  }
}

module.exports = createSeeds
