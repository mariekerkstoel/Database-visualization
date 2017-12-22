var request = require("supertest");
var expect = require("chai").expect;
var app = require('../app.js')

describe('api returns movies information', function() {
  it('returns movie', function(done) {
    request(app).get("/api/data?model=movie&groupby=userRating")
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done)
  })
})
