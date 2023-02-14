import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import * as serviceWorker from './serviceWorker';

import { App } from './App';
import React from 'react';
import ReactDOM from 'react-dom';
// Redux Setup
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // for persisting data
import { store, persistor as persister } from './new_frontend/redux/store';
store.subscribe(() => console.log(store.getState()));
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <App />
    </PersistGate>
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
