var csv = require('fast-csv');
var db = require('./config/db.js');

db.year.sync({force: true}).then(function(){
  db.movie.sync({force: true}).then(function (){
    csv
    .fromPath("movies.csv")
    .on("data", function(movie) {
      csv
      .fromPath("uniqueYears.csv")
      .on("data", function(year) {
        if(movie[8] === year[0]) {
          var yearRow = db.year.findOrCreate({where: {year:year[0]}}).then(function(yearRow) {
            var movieRow = db.movie.create({
              userRating: movie[1],
              dateAdded: movie[2],
              title: movie[3],
              url: movie[4],
              titleType: movie[5],
              imdbRating: movie[6],
              runtimeInMins: movie[7],
              genre: movie[9],
              numVotes: movie[10],
              releaseDate: movie[11],
              directors: movie[12],
              year_id: yearRow[0].get('id')
            })
            return movieRow;
          })
        }
      })
      .on("end", function() {
      })
    })
    .on("end", function() {
      console.log("done");
    })
  })
})
