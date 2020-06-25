const request = require('supertest');
const app = require('../app.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

afterAll((done) => {
  queryInterface
    .bulkDelete('Users')
    .then(() => done())
    .catch((err) => done(err));
});

let userCustomer = {
  email: 'customer1@gmail.com',
  password: '123456',
};

let userAdmin = {
  email: 'admin1@gmail.com',
  password: '123456',
  role: 'admin',
};

describe('POST /Register', function() {
  test('Register Admin: response 201 with property id, email, role(admin)', function(done) {
    request(app)
      .post('/register')
      .send(userAdmin)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty('email', userAdmin.email);
        expect(body).toHaveProperty('role', 'admin');
        done();
      })
  })

  test('Register Customer: response 201 with property id, email, role(customer)', function(done) {
    request(app)
      .post('/register')
      .send(userCustomer)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty('email', userCustomer.email);
        expect(body).toHaveProperty('role', 'customer');
        done();
      })
  })
})

describe('POST /login', function() {
  test('response 200 with property access_token', function(done) {
    request(app)
      .post('/login')
      .send(userCustomer)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('id', expect.any(Number));
        expect(body).toHaveProperty('email', userCustomer.email);
        expect(body).toHaveProperty('role', 'customer');
        expect(body).toHaveProperty('access_token', expect.any(String));
        done();
      })
  })

  test('response 400 wrong password', function(done) {
    request(app)
      .post('/login')
      .send({
        email: 'customer1@gmail.com',
        password: '123455'
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'invalid email / password');
        done();
      })
  })

  test('response 400 password empty ', function(done) {
    request(app)
      .post('/login')
      .send({
        email: 'customer1@gmail.com',
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'invalid email / password');
        done();
      })
  })

  test('response 400 wrong email', function(done) {
    request(app)
      .post('/login')
      .send({
        email: 'customer12@gmail.com',
        password: '123456',
      })
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'invalid email / password');
        done();
      })
  })

})