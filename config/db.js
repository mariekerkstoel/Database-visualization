var Sequelize = require('sequelize');
const sequelize = new Sequelize('data_vis_development', null, null, {
  dialect: 'postgres',
  logging: false
})

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movie = require('../models/movie.js')(sequelize, Sequelize);
db.song = require('../models/song.js')(sequelize, Sequelize);
db.year = require('../models/year.js')(sequelize, Sequelize);

db.movie.belongsTo(db.year)
db.year.hasMany(db.movie)

module.exports = db;
