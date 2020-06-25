const request = require('supertest');
const app = require('../app.js');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { User } = require ('../models');
const jwt = require('jsonwebtoken');

// let userCustomer = {
//   email: 'customerTestProduct1@gmail.com',
//   password: '123456',
// };

let userAdmin = {
  email: 'adminTestProduct1@gmail.com',
  password: '123456',
  role: 'admin',
};

let validProduct = {
  name: 'Baju Lebaran',
  image_url: 'http://google.com',
  price: 10000,
  stock: 5,
  category: 'Fasion',
}

let notValidPriceProduct = {
  name: 'Baju Lebaran',
  image_url: 'http://google.com',
  price: -900,
  stock: 5,
  category: 'Fasion',
}

let notValidStockProduct = {
  name: 'Baju Lebaran',
  image_url: 'http://google.com',
  price: 900,
  stock: -5,
  category: 'Fasion',
}

let notValidNameProduct = {
  name: '',
  image_url: 'http://google.com',
  price: 900,
  stock: 5,
  category: 'Fasion',
}

let notValidImageUrlProduct = {
  name: 'Baju Lebaran',
  image_url: '',
  price: 900,
  stock: 5,
  category: 'Fasion',
}

let editProduct = {
  name: 'Baju Lebaran 3',
  image_url: 'http://facebook.com',
  price: 1000,
  stock: 15,
  category: 'Fasion',
}

beforeAll((done) => {
  User.create(userAdmin)
    .then((data) => {
      let token = jwt.sign({
        id: data.id,
        email: data.email,
        role: data.role
      }, process.env.SECRET);
      userAdmin.access_token = token;
      done();
    })
    .catch(err => {
      done(err);
    })
});

afterAll((done) => {
  queryInterface
    .bulkDelete('Users')
    .then(() => {return queryInterface.bulkDelete('Products')})
    .then(() => done())
    .catch((err) => done(err));
});

describe('POST /product', function() {
  test('response 201', function(done) {
    request(app)
      .post('/product')
      .set('access_token', userAdmin.access_token)
      .send(validProduct)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(201);
        validProduct.id = body.id;
        done();
      })
  })

  test('response 404 token not found', function(done) {
    request(app)
      .post('/product')
      .send(validProduct)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'Token Not Found');
        done();
      })
  })

  test('response 400 invalid token', function(done) {
    request(app)
      .post('/product')
      .set('access_token', 'invalidToken')
      .send(validProduct)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'Invalid Token / invalid username, please input correct Token');
        done();
      })
  })

  test('response 400 not valid input Price', function(done) {
    request(app)
      .post('/product')
      .set('access_token', userAdmin.access_token)
      .send(notValidPriceProduct)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'price cannot be negative');
        done();
      })
  })

  test('response 400 not valid input Stock', function(done) {
    request(app)
      .post('/product')
      .set('access_token', userAdmin.access_token)
      .send(notValidStockProduct)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'stock cannot be negative');
        done();
      })
  })

  test('response 400 not valid input Name', function(done) {
    request(app)
      .post('/product')
      .set('access_token', userAdmin.access_token)
      .send(notValidNameProduct)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', `name can't be empty`);
        done();
      })
  })

  test('response 400 not valid input Image Url', function(done) {
    request(app)
      .post('/product')
      .set('access_token', userAdmin.access_token)
      .send(notValidImageUrlProduct)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response; 
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', `image_url can't be empty`);
        done();
      })
  })
})

describe('GET /product', function() {
  test('response 200', function(done) {
    request(app)
      .get('/product')
      .set('access_token', userAdmin.access_token)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(200);
        done();
      })
  })

  test('response 400 token not found', function(done) {
    request(app)
      .get('/product')
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'Token Not Found');
        done();
      })
  })

  test('response 400 invalid token', function(done) {
    request(app)
      .get('/product')
      .set('access_token', 'tokensalah')
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty('message', 'Invalid Token / invalid username, please input correct Token');
        done();
      })
  })
})

describe('GET /product/:id', function() {
  test('response 200', function(done) {
    request(app)
      .get('/product/' + validProduct.id)
      .set('access_token', userAdmin.access_token)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(200);
        done();
      })
  })

  test('response 404 id product not found', function(done) {
    request(app)
      .get('/product/1000')
      .set('access_token', userAdmin.access_token)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(404);
        done();
      })
  })
})

describe('PUT /product/:id', function() {
  test('response 200', function(done) {
    request(app)
      .put('/product/' + validProduct.id)
      .set('access_token', userAdmin.access_token)
      .send(editProduct)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(200);
        done();
      })
  })

  // test('response 404 id product not found', function(done) {
  //   request(app)
  //     .put('/product/100000')
  //     .set('access_token', userAdmin.access_token)
  //     .expect('Content-type', /json/)
  //     .send(editProduct)
  //     .then((response) => {
  //       const {body, status} = response;
  //       expect(status).toBe(404);
  //       expect(body).toHaveProperty('message', 'Product Not Found, invalid parameter id');
  //       done();
  //     })
  // })
})

describe('Delete /product/:id', function() {
  test('response 200', function(done) {
    request(app)
      .delete('/product/' + validProduct.id)
      .set('access_token', userAdmin.access_token)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(200);
        done();
      })
  })

  test('response 404 id product not found', function(done) {
    request(app)
      .delete('/product/100000')
      .set('access_token', userAdmin.access_token)
      .expect('Content-type', /json/)
      .then((response) => {
        const {body, status} = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty('message', 'Product Not Found, invalid parameter id');
        done();
      })
  })
})



