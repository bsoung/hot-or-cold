import actions from '../actions/actions'
const randomNumber = Math.floor(Math.random() * 100) + 1
const reducer = (state=[], action={}) => {
	switch (action.type) {
		case actions.CHECK_NUMBER:
			if (action.number > randomNumber) {
				console.log('Cold')
			} else {
				console.log('hot')
			}

		default:
			return state

	}
}

module.exports = reducer