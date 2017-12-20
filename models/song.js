var Sequelize = require('sequelize')

module.exports = function(sequelize) {
  var Song = sequelize.define('song', {
    trackName: Sequelize.STRING,
    artistName: Sequelize.STRING,
    albumName: Sequelize.STRING,
    discNumber: Sequelize.STRING,
    trackNumber: Sequelize.STRING,
    trackDuration: Sequelize.STRING,
    addedBy: Sequelize.STRING,
    addedAt: Sequelize.STRING,
  })
  return Song;
}
