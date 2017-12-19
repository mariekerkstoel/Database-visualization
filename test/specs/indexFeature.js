var webdriverio = require('webdriverio');
var chai = require('chai');
var expect = chai.expect;

describe('testing hello', function(){
  it('feature test', function(done){
    console.log(11111111111111)
    browser.url('http://google.com')
    console.log(222222222222222)
    console.log(browser.getUrl());
    browser.getText('body' ,function(err, text){
      expect(text).to.equal('Hello World')
    })
    console.log(3333333333333333)
    browser.call(done);
    console.log(4444444444)
  });

});
