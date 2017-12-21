var Sequelize = require('sequelize');
var csv = require('fast-csv');

const sequelize = new Sequelize('data_vis_development', null, null, {
  dialect: 'postgres'
})

var Movie = require('./models/movie')(sequelize);

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

Movie.sync({force: true}).then(function(){
  csv
  .fromPath("ratings.csv")
  .on("data", function(data) {
    Movie.create({
      userRating: data[1],
      dateAdded: data[2],
      title: data[3],
      url: data[4],
      titleType: data[5],
      imdbRating: data[6],
      runtimeInMins: data[7],
      year: data[8],
      genre: data[9],
      numVotes: data[10],
      releaseDate: data[11],
      directors: data[12]
    })
  })
  .on("end", function() {
    console.log("done");
  })
})
