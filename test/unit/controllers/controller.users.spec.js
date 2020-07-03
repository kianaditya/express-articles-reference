const sinon = require('sinon')
const expect = require('chai').expect

const queries = require('../../../src/models/queries')

const { show } = require('../../../src/controllers/users')

describe('Users Controller', () => {
  const user = {}
  describe('GET User', () => {
    it('should use show action and send response', async () => {
      const getUserStub = sinon.stub(queries, 'getUser').resolves(user)
      let resSpy = sinon.spy()
      const req = {
        user: {
          email: 'user@mail.com',
        },
      }
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      }

      await show(req, res)

      expect(getUserStub.calledOnce).to.equal(true)
      expect(resSpy.calledOnce).to.equal(true)
      expect(resSpy.calledWith(user)).to.equal(true)

      getUserStub.restore()
    })
  })
})
