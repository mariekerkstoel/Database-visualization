var express = require('express');
var app = express();
var csv = require('fast-csv');
var pluralize = require('pluralize')
var path = require('path');
var fs = require('fs');
var directoryPath = path.join(__dirname, 'models');
var db = require('./config/db.js')

app.set('view engine', 'ejs');
app.use(express.static('public'));

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

app.get('/', function(req, res){
  res.render('index');
})

app.get('/api/data', function(req, res){
  var model = req.query.model
  var query = req.query.groupby
  var Model = require(`./models/${model}`)(db.sequelize, db.Sequelize)
  if (query) {
    Model.findAll({
    attributes: [query, [db.sequelize.fn('COUNT', query ), 'count']],
    group: query,
    order: [
          [query, 'ASC']
      ]
    }).then(function(movies){
      res.send(movies);
    })
  } else {
    Model.all().then(function(movies){
      res.send(movies);
    })
  }
})

app.get('/api/data/tables', function(req, res){
  readdir().then(function(data) {
    res.send(data)
  });
});

app.get('/api/data/columns', function(req, res){
  var table = pluralize(req.query.model)
  var columnList = []
  db.sequelize.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table}' AND column_name!='id'AND column_name!='updatedAt' AND column_name!='createdAt';`).then(function(data) {
    data[0].forEach(function(hash){
     columnList.push(hash.column_name)
    })
  res.send(columnList)
  });
});

db.sequelize
.authenticate()
.then(function() {
  console.log('Connection has been established successfully');
})
.catch(function(err) {
  console.error('Unable to connect to the database:', err);
});

module.exports = app;
