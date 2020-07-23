import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import { App } from "./containers/App";
// import registerServiceWorker from "./registerServiceWorker";

import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

// import { reducer } from "./reducers/dog";
// import { watcherSaga } from "./sagas/dog";
import { store } from './helpers';

// // create the saga middleware
// const sagaMiddleware = createSagaMiddleware();

// // dev tools middleware
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // create a redux store with our reducer above and middleware
// let store = createStore(
//   reducer,
//   composeEnhancers(applyMiddleware(sagaMiddleware))
// );

// // run the saga
// sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
// registerServiceWorker();