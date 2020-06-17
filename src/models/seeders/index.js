const db = require('../index')
const chance = require('chance').Chance()
const faker = require('faker')

const createSeeds = async () => {
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
    const post = await db.Posts.create(chance.post())
  }
  for (let index = 0; index < postsCount; index++) {
    const post = await db.Posts.create({
      title: faker.lorem.sentence(),
      content: faker.lorem.sentence(),
    })
  }
}

module.exports = createSeeds
