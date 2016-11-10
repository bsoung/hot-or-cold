import redux from 'redux'
import actions from './actions/actions'
import { createStore } from 'redux'
import reducers from './reducers/reducers'


const store = createStore(reducers);

store.dispatch(actions.restartGame())
store.getState();

module.exports  = store;

