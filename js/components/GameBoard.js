import React, { Component } from 'react'
import actions from '../actions/actions'
import { connect } from 'react-redux'

/** 
 * MAX 
 * Number of lives
 * @type {Number}
 */
const MAX = 10
/** 
 * Creates GameBoard component that requires a numbers prop 
 * and result prop
 */

// ECMA2015 class 
class GameBoard extends Component {

    constructor (props) {
        super(props);

        this.checkNumber = this.checkNumber.bind(this);
        this.restartGame = this.restartGame.bind(this); // GameBoard or "object"
        this.checkWinnerLabel = this.checkWinnerLabel.bind(this);
        this.checkWinnerButton = this.checkWinnerButton.bind(this)
    }

    checkNumber () {
    	let numberGuess = this.refs.numberGuess.value

    	if (numberGuess !== '') {
    		this.props.dispatch(actions.checkNumber(numberGuess));
    	} else {
    		alert("Please enter a number!")
    	}
    	
    	this.refs.numberGuess.value = null
    }

    restartGame () {
    	this.props.dispatch(actions.restartGame())
    	if (!this.refs.numberGuess) {
    		return;
    	} else {
    		this.refs.numberGuess.value = null
    		
    	}
    	
    }

    checkWinnerLabel (target, guess, current, max, condition) {
    
	    if (condition === true) {
	    	console.log('1')
	    	return (
	    			'YOU WON'
	    		)
	    } else if (current >= max) {
	    	console.log('2')
	    	return (
	    		'YOU LOSE'
	    	)

	    } else {
	    	return (
	    		<input type='number' ref='numberGuess' placeholder='Enter a Number!' />
	    	)
	    	
	    }
	    
    }

    checkWinnerButton (current, max, condition) {
    	if (current >= max || condition === true) {
    		console.log(current, max)
    		return (
    			''
    		)
    	} else {
    		return (
    			<button type='button' onClick={this.checkNumber}>
 				Make a Guess!
 				</button>
    		)
    	}
    }

    render() {
    	console.log(this.props.condition)
    	return (
    		<div className='container'>

 				<div className='title'>
 					<span className='red'>Hot</span> or <span className='blue'>Cold</span>
 				</div>

 				<div className='lives'>
 					Lives: {MAX - this.props.numbers.length}
 				</div>

 				<div className='guesses'>
 					Guesses: {this.props.numbers.join(' ')}
 				</div>

 				<div className='input'>
 					{this.checkWinnerLabel(this.props.targetNumber, 
 					parseInt(this.props.numbers[this.props.numbers.length - 1]), 
 					this.props.numbers.length, 
 					MAX, 
 					this.props.condition) } 					

 				</div>

 				<div className='buttons'>
 					{this.checkWinnerButton(this.props.numbers.length, MAX, this.props.condition)}
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
}

const mapStateToProps = (state, props) => {
	return {
		condition: state.winState,
		numbers: state.numbers,
		targetNumber: state.randomNumber,
		result: state.result
	}
}

module.exports = connect(mapStateToProps)(GameBoard)
