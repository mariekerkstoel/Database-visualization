module.exports = function(sequelize, DataType) {
  var Song = sequelize.define('song', {
    trackName: DataType.STRING,
    artistName: DataType.STRING,
    albumName: DataType.STRING,
    discNumber: DataType.STRING,
    trackNumber: DataType.STRING,
    trackDuration: DataType.STRING,
    addedBy: DataType.STRING,
    addedAt: DataType.STRING,
  })
  return Song;
}
