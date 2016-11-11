var redux = require('redux')
var createStore = redux.createStore;
var applyMiddleware = redux.applyMiddleware;

import actions from './actions/actions'
import reducers from './reducers/reducers'

var thunk = require('redux-thunk').default;

var store = redux.createStore(reducers, redux.applyMiddleware(thunk));

store.dispatch(actions.restartGame()) //todo try commenting it out
store.getState();

module.exports  = store;
