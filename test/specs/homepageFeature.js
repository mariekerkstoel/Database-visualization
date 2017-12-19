var chai = require("chai");
var expect = chai.expect;

describe('homepage', function() {
  it("hello worlds", function(done) {
    browser.url('http://localhost:3000/');
    expect(browser.getText('body')).to.equal("Hello World")
    browser.call(done);
  });
});
