$(document).ready(function(){

  $("#submit").click(function(){
    var model = $("#model").val()
    var groupby = $("#groupby").val()
    getData(model, groupby)
  })

  function getData(model, groupby){
    $("#count-table").html('')
    $.get(`/api/data?model=${model}&groupby=${groupby}`, function(data){
      var increment = 0
      $("#count-table").append("<tr id='header'></tr>")
      $("#header").append("<th>UserRating</th>")
      $("#header").append("<th>Quantity</th>")
      data.forEach(function(row){
        $("#count-table").append("<tr id='row-" + increment + "'></tr>")
        $("#row-" + increment).append("<th>" + row[groupby] + "</th>")
        $("#row-" + increment).append("<th>" + row.count +"</th>")
        increment++
      })
    });
  }

  $.get('api/data/tables', function(data){
    data.forEach(function(model){
      $("#model").append(`<option value='${model.split('.')[0]}'>${model.split('.')[0]}</option>`)
    });
  })

  $("#model").change(function(){
    model = $("#model").val()
    $('#groupby').html('')
    $.get(`/api/data/columns?model=${model}`, function(data){
      data.forEach(function(column){
        $("#groupby").append(`<option value='${column}'>${column}</option>`)
      });
    })
  });

});
