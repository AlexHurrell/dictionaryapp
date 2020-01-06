import { createStore, combineReducers } from 'redux';
import dictReducer from '../reducers/dictReducer';

const store = createStore(
    combineReducers({
        dictionaries: dictReducer
    })
);

export default store;