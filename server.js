'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config')

const app = express();
const jsonParser = bodyParser.json()
app.use(express.static("build"));

const HighScore = mongoose.model('HighScore', { highscore: Number });

app.get('/fewest-guesses', (req, res) => {
	HighScore.findOne((err, item) => {
		if (err) {
			console.error(err)
			res.status(500).json({message: 'Internal Service Error'})
		}
		res.status(200).json({guesses: item.highscore})
	})
	
})

app.post('/fewest-guesses', jsonParser, (req, res) => {
	HighScore.findOne((err, item) => {
		if (err) {
			console.error(err)
			res.status(500).json({message: 'Internal Service Error'})
		}

		item.highscore = req.body.guesses
		item.save((err) => {
			if (err) {
				console.error(err)
			} else {
				res.status(201).json({guesses: item.highscore})
			}
		})
		
	})
	
})

const runServer = (callback) => {
    mongoose.connect(config.DATABASE_URL, (err) => {
        if (err && callback) {
            return callback(err);
        }

		HighScore.findOne((err, item) => {
			if (!item) {
				item = { highscore: null }
				HighScore.create(item)
			}
		})

        app.listen(config.PORT, process.env.IP, () => {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({message: 'Internal Service Error'})
        }
    });
};

exports.app = app