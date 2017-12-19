var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var csv = require('fast-csv');

app.listen(3000, function() {
  console.log('server is running on port 3000')
});

var sequelize = new Sequelize('data_vis_development', null, null, {
  dialect: 'postgres'
})

sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully');
  })
  .catch(function(err) {
    console.error('Unable to connect to the database:', err);
  });

var Movie = require('./models/movie')(sequelize);

app.get('/api/data', function(req, res) {
  var query = req.query.groupby
  Movie.findAll({
    attributes: [query, [sequelize.fn('COUNT', query ), 'ratingCount']],
    group: query
  }).then(function(movies){
    res.send(movies);
  })
})
