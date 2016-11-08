require('babel-polyfill');
import React from 'react'
import ReactDOM from 'react-dom'
import GameBoard from './components/GameBoard'
var Provider = require('react-redux').Provider;
var store = require('./store');


document.addEventListener('DOMContentLoaded', function() {
	ReactDOM.render(<Provider store={store}>
					<GameBoard />
					</Provider>, document.getElementById('app'))
})