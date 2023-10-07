import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk, logger];

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));
export default store;
