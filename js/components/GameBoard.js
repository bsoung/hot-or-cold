import React, { Component } from 'react'
import actions from '../actions/actions'
import { connect } from 'react-redux'
import Guesses from './Guesses'

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

class GameBoard extends Component {

    constructor (props) {
        super(props);

        this.checkNumber = this.checkNumber.bind(this);
        this.restartGame = this.restartGame.bind(this); // GameBoard or "object"
        this.hideOrShowLabel = this.hideOrShowLabel.bind(this);
        this.hideOrShowButton = this.hideOrShowButton.bind(this);

        
    }

    //component did mount initializer

    checkNumber () {
    	let numberGuess = Math.abs(parseInt(this.refs.numberGuess.value))

    	if (!(isNaN(numberGuess))) {
    		this.props.dispatch(actions.checkNumber(numberGuess));
            this.props.dispatch(actions.sendFewestGuesses(numberGuess));
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

    hideOrShowLabel (target, guess, current, max, condition) {
    	
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
	    		<input type='number' ref='numberGuess' placeholder='Enter a Number!' style={{outline: 0}} />
	    	)
	    	
	    }
	    
    }

    hideOrShowButton (current, max, condition) {
    	if (current >= max || condition === true) {
    		console.log(current, max)
    		return (
    			''
    		)
    	} else {
    		return (
    			<button id='enter' type='submit' onClick={this.checkNumber} style={{outline: 0}}>
 				Enter
 				</button>
    		)
    	}
    }

    render() {

    	return (
    		<div className='container'>
                <Guesses />
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
 					{this.hideOrShowLabel(this.props.targetNumber, 
 					parseInt(this.props.numbers[this.props.numbers.length - 1]), 
 					this.props.numbers.length, 
 					MAX, 
 					this.props.condition) } 					

 				</div>

 				<div className='buttons'>
 					{this.hideOrShowButton(this.props.numbers.length, MAX, this.props.condition)}
 					<button type='button' onClick={this.restartGame} style={{outline: 0}}>
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
