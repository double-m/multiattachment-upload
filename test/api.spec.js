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

	it('should return 201 on route /api/files', function (done) {
      request
		.post('/api/files')
		.attach('file1', 'test/fixtures/upload-file-1.txt')
		.attach('file2', 'test/fixtures/upload-file-2.txt')
		.expect(201, [], done);
    });

	it('should return 201 on route /api/documents', function (done) {
      request
		.post('/api/documents')
		.send({
		  field1: 'test value 1',
		  field2: 'test value 2',
		  field3: 'test value 3'
		})
		.expect(201, [], done);
    });

	it('should return 400 on route /api/files if no content is sent', function (done) {
      request.post('/api/files').expect(400, [], done);
    });

	it('should return 400 on route /api/documents if no content is sent', function (done) {
      request.post('/api/documents').expect(400, [], done);
    });

  });
});
