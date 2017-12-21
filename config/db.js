var Sequelize = require('sequelize');
const sequelize = new Sequelize('data_vis_development', null, null, {
  dialect: 'postgres'
})

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movie = require('../models/movie.js')(sequelize, Sequelize);
db.song = require('../models/song.js')(sequelize, Sequelize);

module.exports = db;
