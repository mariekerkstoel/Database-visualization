$(document).ready(function(){

  var graphType

  $("#submit").click(function(){
    var model = $("#model").val()
    var groupby = $("#groupby").val()
    graphType = $("#typeOfGraph").val()
    console.log(111111111111)
    console.log(graphType)
    getData(model, groupby)
  })

  function getData(model, groupby){
    var labels = []
    var quantity = []
    $("#count-table").html('')
    $.get(`/api/data?model=${model}&groupby=${groupby}`, function(data){
      var increment = 0
      $("#count-table").append("<tr id='header'></tr>")
      $("#header").append(`<th>${groupby}</th>`)
      $("#header").append("<th>Quantity</th>")
      data.forEach(function(row){
        $("#count-table").append("<tr id='row-" + increment + "'></tr>")
        $("#row-" + increment).append("<th>" + row[groupby] + "</th>")
        $("#row-" + increment).append("<th>" + row.count +"</th>")
        increment++
        labels.push(row[groupby])
        quantity.push(row['count'])
      })
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: '# of Votes',
                  data: quantity,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      }
                  }]
              }
          }
      });
    });
    if (graphType === 'table') {
      $("#myChart").hide();
      $("#count-table").show()
    } else if (graphType === 'barchart'){
      $("#count-table").hide();
      $("#myChart").show();
    }
  }

  function populateDropDown(){
    $("#model").empty();
    $("#model").prepend("<option value='Choose table'>Choose your table</option>");
    $.get('api/data/tables', function(data){
      data.forEach(function(model){
        $("#model").append(`<option value='${model.split('.')[0]}'>${model.split('.')[0]}</option>`)
      });
    });
  };

  populateDropDown();

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
