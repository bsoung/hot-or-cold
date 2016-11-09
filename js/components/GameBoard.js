import React from 'react'
import actions from '../actions/actions'
import { connect } from 'react-redux'
let numbers = ''

//{this.props.guesses.length === 0 ? this.props.defaultGuess : this.props.guesses.join(' ')}
const GameBoard = React.createClass({
	checkNumber: function() {
		let numberGuess=this.refs.numberGuess.value
		// 
		this.props.dispatch(actions.checkNumber(numberGuess));
	},

	restartGame: function() {
		this.props.dispatch(actions.restartGame(this.props.numbers))
	},

	render: function() {

		let test = [{result: 'blah'}]
		// console.log('THIS IS OUR PROPS', this.props)
		
		numbers += (' ' + this.props.guesses)
		console.log(numbers)
		
		// console.log(this.props.guesses)
		return (
			<div className='container'>

				<div className='title'>
				Are You Hot or Cold?
				</div>

				<div className='guesses'>
					Your Guesses: {numbers}
				</div>

				<div className='input'>
					<input type='number' ref='numberGuess' placeholder='Enter a Number!' />
				</div>

				<div className='buttons'>
					<button type='button' onClick={this.checkNumber}>
					Make a Guess!
					</button>
					<button type='button' onClick={this.restartGame}>
					Restart
					</button>
				</div>

				<div className='result'>
					{this.props.result}
				</div>

			</div>
		)
	}

})

const mapStateToProps = function(state, props) {
	return {
		guesses: state.guesses,
		defaultGuess: state.guess,
		result: state.result
	}
}

module.exports = connect(mapStateToProps)(GameBoard)