module.exports = function(sequelize, DataType) {
  var Year = sequelize.define('year', {
    year: DataType.INTEGER
  })
  return Year;
}
