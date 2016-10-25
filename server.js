var express = require("express")
var app = express();
var mongo = require("mongodb").MongoClient
var url = process.env.MONGOLAB_URI //'mongodb://localhost:27017/microservice'
var port = process.env.PORT || 8080;

// app.use(express.static(__dirname + '/public'))

var responseData = ''
app.get('/new/*', function (req, res){
  var param = req.params[0]
   
})



app.listen(port, function () {
  console.log('The app listening on port ' + port +  '!');
});