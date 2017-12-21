module.exports = function(sequelize, DataType) {
  var Movie = sequelize.define('movie', {
    userRating: DataType.FLOAT,
    dateAdded: DataType.STRING,
    title: DataType.STRING,
    url: DataType.STRING,
    titleType: DataType.STRING,
    imdbRating: DataType.FLOAT,
    runtimeInMins: DataType.INTEGER,
    genre: DataType.STRING,
    numVotes: DataType.INTEGER,
    releaseDate: DataType.STRING,
    directors: DataType.STRING
  }, {underscored:true })
  return Movie;
}
