import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import userReducer from './store/reducer/user';
import restaurantReducer from './store/reducer/searchedRestaurant';
import geolocationReducer from './store/reducer/geolocation';
import googlemapReducer from './store/reducer/googleMap';
import menuReducer from './store/reducer/menu';

const rootReducer = combineReducers({
  user: userReducer,
  restaurant: restaurantReducer,
  geolocation: geolocationReducer,
  google: googlemapReducer,
  menu: menuReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
