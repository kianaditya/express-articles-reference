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
  const User = UserModel(sequelize, dataTypes)
  const user = new User()

  checkModelName(User)('User')

  context('Properties', () => {
    ;['firstName', 'lastName', 'email'].forEach(checkPropertyExists(user))
  })

  context('associations', () => {
    before(() => {
      User.hasMany(PostModel, { as: 'Written', foreignKey: 'AuthorId' })
      User.belongsToMany(PostModel, { through: 'SavedPosts', as: 'Saved' })
    })

    it('defined a hasMany association with Post', () => {
      expect(User.hasMany).to.have.been.calledWith(PostModel, {
        as: 'Written',
        foreignKey: 'AuthorId',
      })
    })
    it('defined a belongsToMany through SavedPosts association with Post', () => {
      expect(User.belongsToMany).to.have.been.calledWith(PostModel, {
        through: 'SavedPosts',
        as: 'Saved',
      })
    })
  })
})
