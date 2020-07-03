const sinon = require('sinon')
const expect = require('chai').expect

const queries = require('../../../src/models/queries')
const { index, show } = require('../../../src/controllers/posts')

describe('Posts controller', () => {
  const posts = []
  const specificPost = {}

  describe('GET Posts', () => {
    it('should use index action and send response', async () => {
      const findAll = sinon.stub(queries, 'getAllPosts').resolves(posts)
      let resSpy = sinon.spy()
      const req = {}
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      }

      await index(req, res)

      expect(findAll.calledOnce).to.equal(true)
      expect(resSpy.calledOnce).to.equal(true)
      expect(resSpy.calledWith(posts)).to.equal(true)

      findAll.restore()
    })
  })

  describe('GET specific post', () => {
    it('should use show action and send response', async () => {
      const findOne = sinon
        .stub(queries, 'getSpecificPost')
        .resolves(specificPost)
      let resSpy = sinon.spy()
      const req = {
        params: {
          id: 1,
        },
      }
      const res = {
        status: () => {
          return {
            send: resSpy,
          }
        },
      }

      const spy = sinon.spy(res, 'status')
      await show(req, res)

      expect(findOne.calledOnce).to.equal(true)
      expect(spy.calledOnce).to.equal(true)
      expect(resSpy.calledOnce).to.equal(true)
      expect(resSpy.calledWith(specificPost)).to.equal(true)

      findOne.restore()
    })
  })
})
