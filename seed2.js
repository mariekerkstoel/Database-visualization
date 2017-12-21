var Sequelize = require('sequelize');
var csv = require('fast-csv');

const sequelize = new Sequelize('data_vis_development', null, null, {
  dialect: 'postgres'
})

var Song = require('./models/song')(sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

Song.sync({force:true}).then(function() {
  csv
  .fromPath("songs.csv")
  .on("data", function(data) {
    Song.create({
      trackName: data[1],
      artistName: data[2],
      albumName: data[3],
      discNumber: data[4],
      trackNumber: data[5],
      trackDuration: data[6],
      addedBy: data[7],
      addedAt: data[8]
    })
  })
  .on("end", function() {
    console.log("done");
  })
})
