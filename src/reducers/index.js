import {
    combineReducers
} from 'redux';
import {
    homeReducer
} from './component.reduers/reducer.home';

/**
 * Rootreducer to map the reducer state with global state
 * @type {Reducer<any>}
 */
export const rootReducer = combineReducers({
    homeReducer
});