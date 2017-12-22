var request = require("supertest");
var expect = require("chai").expect;
var app = require('../app.js')

describe('api returns movies information', function() {
  it('returns movies grouped by user rating', function(done) {
    request(app).get("/api/data?model=movie&groupby=userRating")
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('[{"userRating":1,"count":"4"},{"userRating":2,"count":"16"},{"userRating":3,"count":"61"},{"userRating":4,"count":"124"},{"userRating":5,"count":"188"},{"userRating":6,"count":"232"},\
{"userRating":7,"count":"251"},{"userRating":8,"count":"199"},{"userRating":9,"count":"59"},{"userRating":10,"count":"5"}]')
      .end(done)
  });
  it('return movies grouped by type', function(done){
    request(app).get("/api/data?model=movie&groupby=titleType")
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('[{"titleType":"movie","count":"1045"},{"titleType":"tvMiniSeries","count":"11"},{"titleType":"tvMovie","count":"7"},{"titleType":"tvSeries","count":"76"}]')
      .end(done)
  });
})

describe('api returns tables information', function(){
  it('returns all tables in the database', function(done){
    request(app).get("/api/data/tables")
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('["movie.js","song.js"]')
      .end(done)
  });
});

describe('api returns all columns in the given table information', function(){
  it('returns columns name array', function(done){
    request(app).get("/api/data/columns?model=movie" )
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('["userRating","dateAdded","title","url","titleType","imdbRating","runtimeInMins","year","genre","numVotes","releaseDate","directors"]')
      .end(done)
  });
});
