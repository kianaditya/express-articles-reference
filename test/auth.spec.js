const request = require('supertest')
const app = require('../src/app')
const expect = require('chai').expect

describe('POST /login endpoint', async () => {
  it('POST /login endpoint success', async () => {
    try {
      return await request(app)
        .post('/login')
        .send({ email: 'author@mail.com', password: 'password' })
        .then((response) => {
          expect(response.statusCode).to.equal(200)
          expect(response.body)
            .to.be.an.instanceof(Object)
            .that.includes.key('token')
        })
    } catch (error) {
      console.log(error)
    }
  })
  it('POST /login endpoint failure', async () => {
    try {
      return await request(app)
        .post('/login')
        .send({ email: 'author5@mail.com', password: 'password' })
        .then((response) => {
          expect(response.statusCode).to.equal(401)
        })
    } catch (error) {
      console.log(error)
    }
  })
})
