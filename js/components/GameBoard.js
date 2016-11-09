import React from 'react'
import actions from '../actions/actions'
import { connect } from 'react-redux'

/** 
 * MAX 
 * Number of lives
 * @type {Number}
 */
const MAX = 11

/** 
 * Creates GameBoard component that requires a numbers prop 
 * and result prop
 */
const GameBoard = React.createClass({
	checkNumber: function() {
		let numberGuess=this.refs.numberGuess.value
		this.props.dispatch(actions.checkNumber(numberGuess));
	},

	restartGame: function() {
		this.props.dispatch(actions.restartGame(this.props.numbers))
	},

	render: function() {
		return (
			<div className='container'>

				<div className='title'>
				Are You Hot or Cold?
				</div>

				<div className='guesses'>
					Your Guesses: {this.props.numbers.join(' ')}
				</div>

				<div className='input'>
					{this.props.numbers.length < MAX ? <input type='number' ref='numberGuess' placeholder='Enter a Number!' /> : 'YOU LOST!'}
				</div>

				<div className='buttons'>
					{this.props.numbers.length < MAX ? <button type='button' onClick={this.checkNumber}>
					Make a Guess!
					</button> : ''}
					<button type='button' onClick={this.restartGame}>
					Restart
					</button>
				</div>

				<div className='result'>
					{this.props.numbers.length < MAX ? this.props.result : 'Please try again!'}
				</div>

			</div>
		)
	}

})

const mapStateToProps = function(state, props) {
	return {
		numbers: state.numbers,
		result: state.result
	}
}

module.exports = connect(mapStateToProps)(GameBoard)