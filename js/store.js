// weird bug with ES6 import for redux and middleware
const redux = require('redux')
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

import actions from './actions/actions'
import reducers from './reducers/reducers'

const thunk = require('redux-thunk').default;

const store = redux.createStore(reducers, redux.applyMiddleware(thunk));

store.dispatch(actions.restartGame()) //todo try commenting it out
store.getState();

module.exports  = store;
