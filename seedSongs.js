var csv = require('fast-csv');
var db = require('./config/db.js');

db.song.sync({force:true}).then(function() {
  csv
  .fromPath("songs.csv")
  .on("data", function(data) {
    db.song.create({
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
