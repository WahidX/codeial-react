import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import { configureStore } from './store';

const store = configureStore();
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
