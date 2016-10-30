var express = require("express")
var app = express();
var request = require('request');
var mongo = require("mongodb").MongoClient
var link = process.env.MONGOLAB_URI // if its local c9 'mongodb://localhost:27017/microservice'  && 
var port = process.env.PORT || 8080;

//Fetching most recent searches
app.get('/api/latest/imagesearch',function(req,res){
  
  mongo.connect(link,function(err,db){
    if(err) throw (err)
    var collection = db.collection('images')
    collection.find({},{ _id: 0 }).sort([["_id", -1]]).limit(10).toArray(function(err, docu) {
    if(err) throw (err)
    res.send(docu)
    
      })
     db.close()
 })
  
})



app.get('/api/imagesearch/:para',function(req,res){
   var param = req.params['para']
  var ofset = req.query['offset'] || 0 // shorthand for ternary check for undefined
  var options = {
  url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q='+param+'&count=30&offset='+ofset+'&mkt=en_us&safeSearch=Moderate',
  headers: {
    'User-Agent': 'request',
    'Ocp-Apim-Subscription-Key': '76784dbdc4cd408f8bede1ff03905d75',
  }
}
//Requesting Image API 
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var ar = [],el,i;
    var newObj = JSON.parse(body)
    newObj["value"].forEach(function(el,i){
              ar.push(el)
            })
    var transfer = ar.map(function(a){
      return ({"Text" : a.name, "Image URL" : a.thumbnailUrl , "Page URL": a.hostPageDisplayUrl})
    })
    
    // Connecting and insrting to db
  mongo.connect(link,function(err,db){
    if(err) throw err;
  var collection = db.collection('images')
  var d = new Date()
  var doc = {
      "Search Term": param,
      "When": d.toISOString()
  }
  collection.insert(doc,function(err,data){
        if(err) throw err
        db.close()
        })
    })    
    // 
    res.send(transfer)
        }
    })
})


app.listen(port, function () {
  console.log('The app listening on port ' + port +  '!');
});