const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
var port = process.env.PORT || 8080;
MongoClient.connect(process.env.mlaburl , function(err, database){

	if(err) return console.log(err);

	db = database

	app.listen(port, function(){
		console.log('listening on '+port);
	})
	app.get('*',function(req,res,next){ 
		if(req.headers['x-forwarded-proto']!='https') 
			res.redirect('https://brew-maps.herokuapp.com'+req.url) ;
		else 
			next();
	})
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
	})

	app.get('/Locations', function(req, res) {
		console.log("hello");
		db.collection('BeerLocations').find().toArray(function(err, results){
			res.send(results);
		})
	})

	app.post('/AddLocation', function(req, res){
		//console.log(req.body);
	})  
})




