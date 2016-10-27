var express = require("express")
var app = express();
var request = require('request');
var mongo = require("mongodb").MongoClient
var url = process.env.MONGOLAB_URI // if its local c9 'mongodb://localhost:27017/microservice'
var port = process.env.PORT || 8080;

// app.use(express.static(__dirname + '/public'))
app.get('/',function(req,res){
    // var param = req.params[0]
var options = {
  url: 'https://api.imgur.com/3/gallery/search?q_any=cats',
  headers: {
    'User-Agent': 'request',
    'Authorization': 'Client-ID 5e7a8b343b0ae8b',

  }
}

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    res.send(JSON.parse(body)) 
         }
    })
})

app.listen(port, function () {
  console.log('The app listening on port ' + port +  '!');
});