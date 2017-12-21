var csv = require('fast-csv');
var db = require('./config/db.js');

db.movie.sync({force: true}).then(function (){
  csv
  .fromPath("movies.csv")
  .on("data", function(data) {
    db.movie.create({
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
