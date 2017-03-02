var expect = require('chai').expect
  , supertest = require('supertest')
  , app = require('../server/app');

describe('api test', function () {
  var request;

  before(function (done) {
    request = supertest(app);
    done();
  });

  describe('routing', function () {

    it('should return 200 on route /', function (done) {
      request.get('/').expect(200, [], done);
    });

	it('should return 200 on route /css/main.css', function (done) {
      request.get('/css/main.css').expect(200, [], done);
    });

    it('should return 404 on route /non_existing_route', function (done) {
      request.get('/non_existing_route').expect(404, [], done);
    });

  });
});
