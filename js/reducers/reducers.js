import actions from '../actions/actions'

const initialState = {
	result: 'Are you ready for infinite fun?!', 
	randomNumber: 0, 
	guess: 'Your Guesses: ', 
	numbers: [], 
	winState: false
}

const reducer = (state={}, action={}) => {
	let payload = {}
	
	switch (action.type) {
		
		case actions.RESTART_GAME:
			initialState.randomNumber  = Math.floor(Math.random() * 100) + 1
			console.log(initialState)
			return Object.assign({}, state, initialState);

		case actions.CHECK_NUMBER:
			return Object.assign({}, state, action.payload)

		case actions.FETCH_GUESSES:
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
