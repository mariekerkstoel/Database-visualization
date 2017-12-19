var chai = require('chai').assert;
var index = require('../index')


describe('test', function(){
  it('returns Hello', function(){
    chai.equal( index.testFunction(), 'Hello' )
  });
  it('returns Bye', function(){
    chai.equal( index.testFunction2(), 'bye' )
  });
});
