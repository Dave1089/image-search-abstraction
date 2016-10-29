var express = require("express")
var app = express();
var request = require('request');
var mongo = require("mongodb").MongoClient
var link = process.env.MONGOLAB_URI // if its local c9 'mongodb://localhost:27017/microservice'
var port = process.env.PORT || 8080;

// app.use(express.static(__dirname + '/public'))
app.get('/search/*',function(req,res){
   var param = req.params[0]
  // var ofset = req.query.offset
var options = {
  url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q='+param+'&count=30&mkt=en_us&safeSearch=Moderate',
  headers: {
    'User-Agent': 'request',
    'Ocp-Apim-Subscription-Key': '76784dbdc4cd408f8bede1ff03905d75',
  }
}

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var ar = [],el,i;
    // "use strict";
    var newObj = JSON.parse(body)
    newObj["value"].forEach(function(el,i){
              ar.push(el)
            })
    
    res.send(ar)
            }
    })
})

app.listen(port, function () {
  console.log('The app listening on port ' + port +  '!');
});