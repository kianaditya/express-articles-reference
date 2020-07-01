const request = require('supertest')
const app = require('../src/app')
const expect = require('chai').expect

describe.only('GET /user endpoint', async () => {
  it('GET /user endpoint success', async () => {
    try {
      const authResponse = await request(app)
        .post('/login')
        .send({ email: 'author@mail.com', password: 'password' })
      const token = authResponse.body.token
      const response = await request(app).get('/user').set({
        'Content-Type': 'application/json',
        Authorization: token,
      })
      expect(response.statusCode).to.equal(200)

      expect(response.body)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys(['firstName', 'lastName'])
        .and.to.have.property('Written')
        .to.be.an.instanceof(Array)
        .and.to.have.length(4)
        .and.to.have.property(0)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys(['id', 'title', 'content'])

      expect(response.body)
        .and.to.have.property('Saved')
        .to.be.an.instanceof(Array)
        .and.to.have.length(4)
        .and.to.have.property(0)
        .to.be.an.instanceof(Object)
        .that.includes.all.keys(['id', 'title', 'content'])
    } catch (error) {
      console.error(error)
    }
  })
  it('GET /user endpoint failure', async () => {
    try {
      const response = await request(app).get('/user')
      expect(response.statusCode).to.equal(401)
    } catch (error) {
      console.log(error)
    }
  })
})
