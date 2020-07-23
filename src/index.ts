const express = require('express')
const app = express()
const port = 3000

app.route('/posts')
  .get(function(req, res) {
    res.send('hello');
  })
  .post(function(req, res) {
    res.send('bye');
  });

app.route('/posts/:id')
  .get(function(req, res) {
    res.send('Hello!');
  })
  .post(function(req, res) {
    res.send('Bye!');
  })
  .put(function(req, res) {
    res.send('Bye?');
  });


  
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
 
