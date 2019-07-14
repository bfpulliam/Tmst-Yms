import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import monitorReducersEnhancer from './reducers/monitorReducer';
import loggerMiddleware from './utils/logger';
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
    const middlewares = [loggerMiddleware, thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
    const composedEnhancers = compose(...enhancers)

    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    return store
};