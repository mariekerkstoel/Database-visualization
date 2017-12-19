$(document).ready(function(){

  $.get('/api/data?groupby=userRating', function(data){
    var increment = 0
    var query = 'userRating'
    $("#count-table").append("<tr id='header'></tr>")
    $("#header").append("<th>UserRating</th>")
    $("#header").append("<th>Quantity</th>")
    data.forEach(function(row){
      $("#count-table").append("<tr id='row-" + increment + "'></tr>")
      $("#row-" + increment).append("<th>" + row[query] + "</th>")
      $("#row-" + increment).append("<th>" + row.count +"</th>")
      increment++
    })
  });
});
