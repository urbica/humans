import React from 'react';
import ReactDOM from 'react-dom';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import App from './components/App.jsx';
import Saga from './sagas/sagas.js';
import reducer from './reducers/reducer.js';

const logger = createLogger({ collapsed: true });

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(Saga);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>
, document.querySelector('#root'));
