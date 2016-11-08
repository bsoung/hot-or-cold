var redux = require('redux');
var actions = require('./actions/actions')
var createStore = redux.createStore;

var reducers = require('./reducers/reducers');

var store = createStore(reducers);
//
// store.dispatch(actions.checkNumber())
store.getState();

module.exports  = store;

//component
//var Container = connect(mapsStateToProps)(COMPONENT)
//