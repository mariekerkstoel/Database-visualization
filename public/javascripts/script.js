$(document).ready(function(){

  $("#submit").click(function(){
    var value = $("#query").val()
    getData(value)
  })

  function getData(query){
    $("#count-table").html('')
    $.get('/api/data?groupby=' + query , function(data){
      var increment = 0
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
  }
});
