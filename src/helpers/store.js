import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, loggerMiddleware))
  );

// run the saga
sagaMiddleware.run(rootSaga);