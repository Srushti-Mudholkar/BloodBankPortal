import { StrictMode} from 'react';
import React from 'react';
import {createRoot} from 'react-client/dom'
import { Provider } from "react-redux";
import store from "./redux/store.js";
import './index.css'
import App from './App.jsx';

createRoot(document.getElementsById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </StrictMode>
)
