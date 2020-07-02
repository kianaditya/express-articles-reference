const sinon = require('sinon')
const expect = require('chai').expect

const db = require('../../src/models')

const { getUser } = require('../../src/controllers/users')

describe('Users Controller', () => {
  const user = {}
  describe('GET User', () => {
    it('should use getUser() and send response', async () => {
      const findAll = sinon.stub(db.User, 'findOne').resolves(user)
      let resSpy = sinon.spy()
      const req = {
        user: {
          email: 'user@mail.com',
        },
      }
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      }

      await getUser(req, res)

      expect(findAll.calledOnce).to.equal(true)
      expect(resSpy.calledOnce).to.equal(true)
      expect(resSpy.calledWith(user)).to.equal(true)

      findAll.restore()
    })
  })
})
