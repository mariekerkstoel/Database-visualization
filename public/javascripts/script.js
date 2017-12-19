$(document).ready(function(){

  $.get('/api/data?groupby=userRating', function(data){
    console.log(data);
  });
});
