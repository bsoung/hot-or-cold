import React, { Component } from 'react'
import actions from '../actions/actions'
import { connect } from 'react-redux'



class Guesses extends Component {

	constructor (props) {
        super(props);

        
    }

    render () {
    	if (this.props.fetchedGuesses === undefined) {
    		this.props.dispatch(actions.fetchFewestGuesses());
    	}
    	
    	
    	console.log(this.props)
    	return (
    		<div>{this.props.fetchedGuesses}</div>
    	)
    }


}


const mapStateToProps = (state, props) => {

	return {
		fetchedGuesses: state.fetchedGuesses
	}
}

module.exports = connect(mapStateToProps)(Guesses)