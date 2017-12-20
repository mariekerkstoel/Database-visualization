var express = require('express');
var app = express();
var Sequelize = require('sequelize');
var csv = require('fast-csv');
var pluralize = require('pluralize')

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


var directoryPath = path.join(__dirname, 'models');

function readdir(){
  var modelList = []
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
    res.send(data)
  });
});

app.get('/api/data/columns', function(req, res){
  var table = pluralize(req.query.model)
  var columnList = []
  sequelize.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table}' AND column_name!='id'AND column_name!='updatedAt' AND column_name!='createdAt';`).then(function(data) {
    data[0].forEach(function(hash){
     columnList.push(hash.column_name)
    })
  res.send(columnList)
  });
});

app.listen(3000, function() {
  console.log('server is running on port 3000')
});
