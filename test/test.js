const supertest = require('supertest');

var server = supetest.agent('http://localhost:3000');

describe('Sampleunit test', () => {
  it('should return home page', (done) => {
    server
      .get('/')
      .expect('Content-type', /text/)
      .expect(200)
      .end(function (err, res) {
        done();
      });
  });
});
