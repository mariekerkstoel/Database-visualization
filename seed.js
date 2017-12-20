var csv = require('fast-csv');
var db = require('./config/db');

var years = [];

db.movie.sync({force:true}).then(function() {
  db.year.sync({force:true});
})

// db.movie.sync({force: true}).then(function (){
//   csv
//   .fromPath("ratings.csv")
//   .on("data", function(data) {
//     db.movie.create({
//       userRating: data[1],
//       dateAdded: data[2],
//       title: data[3],
//       url: data[4],
//       titleType: data[5],
//       imdbRating: data[6],
//       runtimeInMins: data[7],
//       year: data[8],
//       genre: data[9],
//       numVotes: data[10],
//       releaseDate: data[11],
//       directors: data[12]
//     })
//     years.push(data[8]);
//   })
//   .on("end", function() {
//     console.log("done");
//     console.log("11111111111111111111111111111111111");
//     console.log(years);
//   })
//
// })

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function sortNumber(a,b) {
    return a - b;
}

csv
.fromPath("ratings.csv")
.on("data", function(data) {
  years.push(data[8]);
})
.on("end", function() {
  console.log("done");
  console.log("11111111111111111111111111111111111");
  // console.log(years.filter(onlyUnique).sort(sortNumber));
})
