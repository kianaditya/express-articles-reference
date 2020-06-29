const request = require('supertest')
const app = require('../src/app') // the express server
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
          .that.includes.all.keys(['id', 'title', 'content', 'author',])
          .and.to.have.nested.property('author')
          .to.be.an.instanceof(Object)
          .that.includes.all.keys(['firstName', 'lastName'])
      })
  })
})