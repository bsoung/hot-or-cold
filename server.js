'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let guesses = 100

let app = express();
app.use(bodyParser.json());
app.use(express.static("build"));

app.get('/fewest-guesses', function(req, res) {
	console.log('getting it?')
	res.status(200).json({guesses: guesses})
})

app.post('/fewest-guesses', function(req, res) {
	console.log(req.body)
	guesses = req.body.guesses
	res.status(201).json(guesses)
})

app.listen(process.env.PORT || 8080, process.env.IP, function() {
	console.log("Listening");
})

exports.app = app

//npm run build
//npm run serve