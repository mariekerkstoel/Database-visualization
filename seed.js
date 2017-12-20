var csv = require('fast-csv');
var db = require('./config/db');

var years = [];

db.year.sync({force:true}).then(function() {
  db.movie.sync({force:true}).then(function(){


    var year = db.year.create({year: '1000'}).then(function(year){
      var movie = db.movie.create({
        userRating: 1,
        dateAdded: 'jun',
        title: 'title',
        url: 'url',
        titleType: 'DataTypes.STRING',
        imdbRating: 10.5,
        runtimeInMins: 10,
        genre: 'DataTypes.STRING',
        numVotes: 10,
        releaseDate: 'DataTypes.STRING',
        directors: 'DataTypes.STRING',
        yearId: year.get('id')
      });
      return movie;
    }).then(function(movie){
    })
  })
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
  var uniqueYears = years.filter(onlyUnique).sort(sortNumber)
  console.log(uniqueYears);
})
