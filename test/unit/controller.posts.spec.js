const sinon = require('sinon')
const expect = require('chai').expect

const db = require('../../src/models')
const { getAllPosts, getSpecificPost } = require('../../src/controllers/posts')

describe('Posts controller', () => {
  const posts = []
  const specificPost = {}

  describe('GET Posts', () => {
    it('should use findAll() and send response', async () => {
      const findAll = sinon.stub(db.Post, 'findAll').resolves(posts)
      let resSpy = sinon.spy()
      const req = {}
      const res = {
        status: sinon.stub().returns({ send: resSpy }),
      }

      await getAllPosts(req, res)

      expect(findAll.calledOnce).to.equal(true)
      expect(resSpy.calledOnce).to.equal(true)
      expect(resSpy.calledWith(posts)).to.equal(true)

      findAll.restore()
    })
  })

  describe('GET specific post', () => {
    it('should use findOne() and send response', async () => {
      const findOne = sinon.stub(db.Post, 'findOne').resolves(specificPost)
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
      await getSpecificPost(req, res)

      expect(findOne.calledOnce).to.equal(true)
      expect(spy.calledOnce).to.equal(true)
      expect(resSpy.calledOnce).to.equal(true)
      expect(resSpy.calledWith(specificPost)).to.equal(true)

      findOne.restore()
    })
  })
})
