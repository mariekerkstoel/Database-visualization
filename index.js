var app = require('./app')

const port = process.env.port || 3000

app.listen(port , function() {
  console.log('server is running on port 3000')
});
