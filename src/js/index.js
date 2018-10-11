import React from 'react';
import ReactDOM from 'react-dom';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'ReduxReducers/rootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));