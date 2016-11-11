import React, { Component } from 'react'
import actions from '../actions/actions'
import { connect } from 'react-redux'

class Guesses extends Component {

	constructor (props) {
        super(props);       
    }

    // run once when component is bout to mount
    componentWillMount () {
        if (this.props.fetchedGuesses === undefined) {
            this.props.dispatch(actions.fetchFewestGuesses());
        }
    }

    render () {
    	console.log(this.props)
    	return (
    		<div className="highscore">highscore: {this.props.fetchedGuesses === null ? 'No Highscore!' : this.props.fetchedGuesses}</div>
    	)
    }

}

const mapStateToProps = (state, props) => {

	return {
		fetchedGuesses: state.fetchedGuesses
	}
}

module.exports = connect(mapStateToProps)(Guesses)