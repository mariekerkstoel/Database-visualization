var Sequelize = require('sequelize')

//Connect all models to tables so it is accessible
//in the db object
const sequelize = new Sequelize('data_vis_development', null, null, {
  dialect: 'postgres'
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.movie = require('../models/movie')(sequelize, Sequelize);
db.year = require('../models/year')(sequelize, Sequelize);

//Relations
db.movie.belongsTo(db.year);
db.year.hasMany(db.movie);

module.exports = db;
