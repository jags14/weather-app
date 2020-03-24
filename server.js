const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiKey = '4659b34256e2cf80fa4a9abe268c5265';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	// res.send('Hey there!');
	res.render('index');
});

app.post('/', function(req, res){
	let city = req.body.city;
	
	let url = 'api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}';
	request(url, function(err, response, body){
		if(err){
			res.render('index', {weather: null, error: 'Error, please try again'});
		} else{
			let weather = JSON.parse(body);
			if(weather.main == undefined){
				res.render('index', {weather: null, error: 'Error, please try again'});
			}else{
				let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
				res.render('index', {weather: weatherText, error: null});
			}
		}
	})
	
});

app.listen(3000, function(){
	console.log('Weather app listening on port 3000');
});