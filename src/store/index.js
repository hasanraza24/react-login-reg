import { createStore } from 'redux';
import { rootReducer } from "../reducers/index";

/**
 * Global store for storing global states.
 * @type {Store<any>}
 */

 
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;