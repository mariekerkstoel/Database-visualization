var chai = require("chai");
var expect = chai.expect;

describe('homepage', function() {
  it("hello worlds", function(done) {
    browser.url('http://localhost:3000/');
    expect(browser.getText('body')).to.equal("Choose your table\nmovie\nsong\nBarchart\nTable\nSubmit")
    browser.call(done);
  });
});
