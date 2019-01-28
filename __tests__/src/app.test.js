'use strict';

const rootDir = process.cwd();
const supergoose = require('../supergoose.js');
const {server} = require(`${rootDir}/src/server.js`);
const mockRequest = supergoose.server(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('api server', () => {

  it('should respond with a 404 on an invalid route', () => {

    return mockRequest
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });

  it('should respond with a 404 on an invalid method', () => {

    return mockRequest
      .post('/notes/12')
      .then(results => {
        expect(results.status).toBe(404);
      });

  });

  it('should respond properly on request to /', () => {

    return mockRequest
      .get('/')
      .then(results => {
        expect(results.status).toBe(200);
      });

  });

});
