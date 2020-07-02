const expect = require('chai').expect
const chai = require('chai')
chai.use(require('sinon-chai'))

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers')

const UserModel = require('../../../src/models/user')
const PostModel = require('../../../src/models/post')

describe('src/models/User', () => {
  const Post = PostModel(sequelize, dataTypes)
  const post = new Post()

  checkModelName(Post)('Post')

  context('Properties', () => {
    ;['title', 'content'].forEach(checkPropertyExists(post))
  })

  context('associations', () => {
    before(() => {
      Post.belongsTo(UserModel, { as: 'Author', foreignKey: 'AuthorId' })
      Post.belongsToMany(UserModel, { through: 'SavedPosts', as: 'savedBy' })
    })

    it('defined a belongsTo association with Post', () => {
      expect(Post.belongsTo).to.have.been.calledWith(UserModel, {
        as: 'Author',
        foreignKey: 'AuthorId',
      })
    })
    it('defined a belongsToMany through SavedPosts association with Post', () => {
      expect(Post.belongsToMany).to.have.been.calledWith(UserModel, {
        through: 'SavedPosts',
        as: 'savedBy',
      })
    })
  })
})
