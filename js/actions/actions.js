import 'isomorphic-fetch'

/** 
 * CHECK_NUMBER 
 * redux for checking user input against randomly generated number
 * 
 */
const CHECK_NUMBER = 'CHECK_NUMBER'
const checkNumber = (payload) => {
    return {
        type: CHECK_NUMBER,
        payload

    }
}

const checkNumberTest = (number) => {
	return (dispatch, getState) => {
		const payload = {}
		const state = getState()
		switch (true) {

			case state.numbers.indexOf(number) !== -1:
				payload.result = 'You already entered this number!'
				break

			case state.randomNumber - number === 0:
				payload.result = 'WINNER WINNER CHICKEN DINNER!'
				payload.winState = true
				break

			case Math.abs(state.randomNumber - number) <= 2:
				payload.result = 'Call the fire department because you\'re on fire!'
				break

			case Math.abs(state.randomNumber - number) <= 15:
				payload.result = 'You\'re getting hotter!'
				break

			case Math.abs(state.randomNumber - number) <= 30:
				payload.result = 'You\'re reaching room temperature!'
				break

			case Math.abs(state.randomNumber - number) <= 60:
				payload.result = 'Grab a jacket because you\'re getting cold!'
				break

			default:
				payload.result = 'Did you move to Antarctica- brrrrrr!'
				break
		}

		payload.numbers = state.numbers.concat(number)
		
		dispatch(checkNumber(payload))
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

const sendFewestGuesses = (guess) => {
	return (dispatch, getState) => {
		const state = getState()
		if (state.fetchedGuesses !== null && state.fetchedGuesses < guess) {  // reverse < for debugging
			return
		}

		const url = '/fewest-guesses';
		return fetch(url, {method: 'post', 
			body: '{"guesses": ' + guess + '}', 
			headers: {'content-type': 'application/json', 'Accept': 'application/json'}})
		.then((response) => {

            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response.json();
        })
        .then((data) => {
            const numGuesses = data.guesses; 
            return dispatch(
                sendGuessSuccess(numGuesses) 
            );
        })
        .catch((error) => {
        	return dispatch(
        		fetchGuessError(error) 
        	)
        })

    }
}

const fetchFewestGuesses = () => {
	return (dispatch) => {

		const url = '/fewest-guesses';
		return fetch(url)
		.then((response) => {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText)
                error.response = response
                throw error;
            }
            return response.json();
        })
        .then((data) => {
        	
            const numGuesses = data.guesses; //update
            return dispatch(
                fetchGuessSuccess(numGuesses) //todo
            );
        })
        .catch((error) => {
        	return dispatch(
        		fetchGuessError(error) //todo
        	)
        })

    }
}

exports.checkNumberTest = checkNumberTest

exports.fetchFewestGuesses = fetchFewestGuesses
exports.sendFewestGuesses = sendFewestGuesses

exports.SEND_GUESSES = SEND_GUESSES
exports.FETCH_GUESSES = FETCH_GUESSES

exports.CHECK_NUMBER = CHECK_NUMBER
exports.checkNumber = checkNumber

exports.RESTART_GAME = RESTART_GAME
exports.restartGame = restartGame

exports.FETCH_ERROR = FETCH_ERROR
exports.fetchGuessError = fetchGuessError






