// var Sequelize = require('sequelize')
//
// const sequelize = new Sequelize('data_vis_development', null, null, {
//   dialect: 'postgres'
// })

module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define('movie', {
    userRating: DataTypes.FLOAT,
    dateAdded: DataTypes.STRING,
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    titleType: DataTypes.STRING,
    imdbRating: DataTypes.FLOAT,
    runtimeInMins: DataTypes.INTEGER,
    // year: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    numVotes: DataTypes.INTEGER,
    releaseDate: DataTypes.STRING,
    directors: DataTypes.STRING
  })

  return Movie;
}
