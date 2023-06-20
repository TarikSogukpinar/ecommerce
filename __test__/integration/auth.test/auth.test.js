import request from 'supertest'
import app from '../../../app.js'

let token;

beforeEach(async () => {
  // Create a new user

  await request(app).post('/api/auth/register').send({
    firstName: 'exampleuserFirstName',
    lastName: 'exampleuserLastName',
    email: 'example@example.com',
    password: 'testTarik123password',
    confirmPassword: 'testTarik123password',
  })

  // Login the user
  const res = await request(app).post('/api/auth/login').send({
    email: 'example@example.com',
    password: 'testTarik123password',
  })
  token = res.body.token // Assuming the response contains a JWT token
})

describe('User Authentication', () => {
  it('should register a new user and return 200 status', async () => {
    const res = await request(app).post('/api/auth/register').send({
      firstName: 'newUserFirstName',
      lastName: 'newUserLastName',
      email: 'new@example.com',
      password: 'newUserPassword',
      confirmPassword: 'newUserPassword',
    })

    expect(res.statusCode).toEqual(200)
  })

  it('should login user and return 200 status', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'new@example.com',
      password: 'newUserPassword',
    })

    expect(res.statusCode).toEqual(200)
  })

  // You can use the token for other tests...
})
