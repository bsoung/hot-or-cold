require('isomorphic-fetch');

/** 
 * CHECK_NUMBER 
 * redux for checking user input against randomly generated number
 * 
 */
const CHECK_NUMBER = 'CHECK_NUMBER'
const checkNumber = (number) => {
    return {
        type: CHECK_NUMBER,
        number: number

    }
}

/** 
 * RESTART_GAME 
 * redux action for restarting the game with the default state
 * 
 */
const RESTART_GAME = 'RESTART_GAME'
const restartGame = () => {
	return {
		type: RESTART_GAME,
		numbers: []
	}
}

const FETCH_GUESSES = 'FETCH_GUESSES'
const fetchGuessSuccess = (numGuess) => {
	return {
		type: FETCH_GUESSES,
		guesses: numGuess
	}
}

const SEND_GUESSES = 'SEND_GUESSES'
const sendGuessSuccess = (guess) => {
	return {
		type: SEND_GUESSES,
		guesses: guess
	}
}
//const name
//fetchGuessSuccess function

const FETCH_ERROR = 'FETCH_ERROR'
const fetchGuessError = (error) => {
	return {
		type: FETCH_ERROR,
		error: error
	}
}
//const name
//fetchGuessError function

//call in diff component

var fetchFewestGuesses = function(guess) {
	return function(dispatch) {
		var url = '/fewest-guesses';
		return fetch(url).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
            	console.log("in first if?")
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response.json();
        })
        .then(function(data) {
        	console.log("data here?")
    		console.log(data)
            var numGuesses = data.guesses; //update
            return dispatch(
                fetchGuessSuccess(numGuesses) //todo
            );
        })
        .catch(function(error) {
        	console.log("error?")
        	return dispatch(
        		fetchGuessError(error) //todo
        	)
        })

    }
}



var fetchFewestGuesses = function() {
	console.log('here?')
	return function(dispatch) {
		console.log("in function?")
		var url = '/fewest-guesses';
		return fetch(url).then(function(response) {
            if (response.status < 200 || response.status >= 300) {
            	console.log("in first if?")
                var error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response.json();
        })
        .then(function(data) {
        	console.log("data here?")
    		console.log(data)
            var numGuesses = data.guesses; //update
            return dispatch(
                fetchGuessSuccess(numGuesses) //todo
            );
        })
        .catch(function(error) {
        	console.log("error?")
        	return dispatch(
        		fetchGuessError(error) //todo
        	)
        })

    }
}



exports.fetchFewestGuesses = fetchFewestGuesses

exports.CHECK_NUMBER = CHECK_NUMBER
exports.checkNumber = checkNumber

exports.RESTART_GAME = RESTART_GAME
exports.restartGame = restartGame

exports.FETCH_GUESSES = FETCH_GUESSES
exports.fetchGuessSuccess = fetchGuessSuccess

exports.FETCH_ERROR = FETCH_ERROR
exports.fetchGuessError = fetchGuessError






