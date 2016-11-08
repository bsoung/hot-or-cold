import React from 'react'
import actions from '../actions/actions'
import { connect } from 'react-redux'

const GameBoard = React.createClass({
	checkNumber: function() {
		let numberGuess=this.refs.numberGuess.value
		// 
		this.props.dispatch(actions.checkNumber(numberGuess));
	},

	render: function() {
		return (
			<div>
				Enter a number!
				<input type='number' ref='numberGuess' />
				<button type='button' onClick={this.checkNumber}>
				Go
				</button>
			</div>
		)
	}

})

const mapStateToProps = function(state, props) {
	return {
		numbers: state
	}
}

module.exports = connect(mapStateToProps)(GameBoard)