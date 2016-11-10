import actions from '../actions/actions'

const reducer = (state={}, action={}) => {
	let payload = {}
	
	switch (action.type) {
		case actions.CHECK_NUMBER:
			if (state.numbers.indexOf(action.number) !== -1) {
				payload.result = 'You already entered this number!'
				return Object.assign({}, state, payload)
			}

			if (state.randomNumber - action.number === 0) {
				payload.result = 'WINNER WINNER CHICKEN DINNER!'
				payload.winState = true
				
			} else if (Math.abs(state.randomNumber - action.number) <= 2) {
				payload.result = 'Call the fire department because you\'re on fire!'
				
			} else if (Math.abs(state.randomNumber - action.number) <= 15) {
				payload.result = 'You\'re getting hotter!'
				
			} else if (Math.abs(state.randomNumber - action.number) <= 30) {
				payload.result = 'You\'re reaching room temperature!'
				
			} else if (Math.abs(state.randomNumber - action.number) <= 60) {
				payload.result = 'Grab a jacket because you\'re getting cold!'
				
			} else {
				payload.result = 'Did you move to Antarctica- brrrrrr!'
				
			} 

			payload.numbers = state.numbers.concat(action.number)
	
			return Object.assign({}, state, payload);

		case actions.RESTART_GAME:
			let randomNumber = Math.floor(Math.random() * 100) + 1
			console.log(randomNumber)
			return Object.assign({}, state, {result: 'Are you ready for infinite fun?!', 
								randomNumber, 
								guess: 'Your Guesses: ', 
								numbers: [], 
								winState: false});

		//more cases for catch //
		case actions.FETCH_GUESSES:
			console.log("inside reducer?")
			return Object.assign({}, state, {fetchedGuesses: action.guesses})

		case actions.FETCH_ERROR:
			return Object.assign({}, state, {error: action.error})

		case actions.SEND_GUESSES:
			return Object.assign({}, state, {fetchedGuesses: action.guesses})

		default:

			return state

	}
}

module.exports = reducer
