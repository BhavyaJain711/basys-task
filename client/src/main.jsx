import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';

import { Provider } from "react-redux";
import {store} from "./store";
import {persistStore} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import axios from 'axios';
import authAxios from './authAxios';

const persistedStore=persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));

const baseURL = __APP_ENV__.REACT_APP_API_BASE_URL;
axios.defaults.baseURL=baseURL;
authAxios.defaults.baseURL=baseURL;

root.render(
  <Provider store={store} >
  <PersistGate loading={null} persistor={persistedStore}>
  <App />
  </PersistGate>
  </Provider>
);
