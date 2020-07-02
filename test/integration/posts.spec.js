const request = require('supertest')
const app = require('../../src/app')
const expect = require('chai').expect

describe('GET /posts endpoint', () => {
  it('GET /posts endpoint successfully returns response', () => {
    return request(app)
      .get('/posts')
      .then((response) => {
        expect(response.statusCode).to.equal(200)
        expect(response.body)
          .to.be.an.instanceof(Array)
          .and.to.have.length(8)
          .and.to.have.property(0)
          .that.includes.all.keys(['id', 'title', 'content', 'Author'])
          .and.to.have.nested.property('Author')
          .to.be.an.instanceof(Object)
          .that.includes.all.keys(['firstName', 'lastName'])
      })
  })
})

describe('GET /posts/:id endpoint', () => {
  it('GET /posts/:id endpoint successfully returns response', () => {
    return request(app)
      .get('/posts/1')
      .then((response) => {
        expect(response.statusCode).to.equal(200)

        expect(response.body)
          .to.be.an.instanceof(Object)
          .that.includes.all.keys([
            'id',
            'title',
            'content',
            'Author',
            'savedBy',
          ])
          .and.to.have.nested.property('Author')
          .to.be.an.instanceof(Object)
          .that.includes.all.keys(['firstName', 'lastName'])

        expect(response.body)
          .to.have.own.property('savedBy')
          .to.be.an.instanceof(Array)
          .and.to.have.length(2)
          .and.to.have.property(0)
          .that.includes.all.keys(['firstName', 'lastName'])
      })
  })
})
