'use strict'

let express = require('express');
var mongoose = require('mongoose');
let bodyParser = require('body-parser');
let config = require('./config')

let app = express();
app.use(bodyParser.json());
app.use(express.static("build"));

var HighScore = mongoose.model('HighScore', { highscore: Number });

app.get('/fewest-guesses', function(req, res) {
	HighScore.findOne(function(err, item) {
		console.log("item",item)
		if (err) {
			console.error(err)
			res.status(500).json({message: 'Internal Service Error'})
		}
		res.status(200).json({guesses: item.highscore})
	})
	
})

app.post('/fewest-guesses', function(req, res) {
	console.log(req.body)
	HighScore.findOne(function(err, item) {
		if (err) {
			console.error(err)
			res.status(500).json({message: 'Internal Service Error'})
		}
		item.highscore = req.body.guesses
		item.save(function(err) {
			if (err) {
				console.error(err)
			} else {
				res.status(201).json({guesses: item.highscore})
			}
		})
		
	})
	
})

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

		HighScore.findOne(function(err, item) {
			if (!item) {
				item = { highscore: null }
				HighScore.create(item)
			}
		})

        app.listen(config.PORT, process.env.IP, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
            res.status(500).json({message: 'Internal Service Error'})
        }
    });
};

exports.app = app