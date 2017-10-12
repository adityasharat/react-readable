import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

import './index.css';
import reducer from '../src/reducers/index';
import Index from './components';

const logger = store => next => action => {
  //console.group(action.type);
  //console.info('dispatching', action);
  let result = next(action);
  //console.log('next state', store.getState());
  //console.groupEnd(action.type);
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxDevTools = composeEnhancers(applyMiddleware(logger, thunk));

const store = createStore(reducer, reduxDevTools)

const template = (
<BrowserRouter>
  <Provider store={store}>
    <h1>Hello World</h1>
  </Provider>
</BrowserRouter>
);

ReactDOM.render(template, document.getElementById('root'));
registerServiceWorker();
