var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var csv = require('fast-csv');
app.set('view engine', 'ejs');

app.set('view engine', 'ejs');
app.use(express.static('public'));

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

app.get('/', function(req, res){
  res.render('index');
})

app.get('/api/data', function(req, res){
  var model = req.query.model
  var query = req.query.groupby
  var Model = require(`./models/${model}`)(sequelize)
    Model.findAll({
    attributes: [query, [sequelize.fn('COUNT', query ), 'count']],
    group: query,
    order: [
          [query, 'ASC']
      ]
  }).then(function(movies){
    res.send(movies);
  })
})

var path = require('path');
var fs = require('fs');
var modelList = []

var directoryPath = path.join(__dirname, 'models');

function readdir(){

  return new Promise(function(resolve, reject) {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
          modelList.push(file);
        });
        resolve(modelList)
    });

  })
};
app.get('/api/data/tables', function(req, res){
  readdir().then(function(data) {
    res.send((data))
  });
});


// app.get('/api/data/tables', function(req, res){
//   // sequelize.query('SELECT tablename FROM pg_catalog.pg_tables ORDER BY ASC').then(function(rows) {
//   //     res.render(JSON.stringify(rows));
//   //   });
// });

app.listen(3000, function() {
  console.log('server is running on port 3000')
});
