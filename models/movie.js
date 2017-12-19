var Sequelize = require('sequelize')

module.exports = function(sequelize) {
  var Movie = sequelize.define('movie', {
    userRating: Sequelize.FLOAT,
    dateAdded: Sequelize.STRING,
    title: Sequelize.STRING,
    url: Sequelize.STRING,
    titleType: Sequelize.STRING,
    imdbRating: Sequelize.FLOAT,
    runtimeInMins: Sequelize.INTEGER,
    year: Sequelize.INTEGER,
    genre: Sequelize.STRING,
    numVotes: Sequelize.INTEGER,
    releaseDate: Sequelize.STRING,
    directors: Sequelize.STRING
  })
  return Movie;
}
