var chai = require("chai");
var expect = chai.expect;

describe('homepage', function() {
  it("prompts user with dropdown columns", function(done) {
    browser.url('http://localhost:3000/');
    expect(browser.getText('body')).to.equal("Data Visualisation\nChoose your table\nmovie\nsong\nChoose your attribute\nChoose your chart type\nBar chart\nPie chart\nTable\nSubmit");
    browser.call(done);
  });
  it('Creates a table that user chooses', function(done){
    browser.url('http://localhost:3000/');
    browser.selectByValue('#model','movie');
    browser.selectByValue('#groupby','titleType');
    browser.selectByValue('#typeOfGraph','table');
    browser.call(done);
  });
});
