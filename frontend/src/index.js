import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const docContainer = document.getElementById('root');
const root = ReactDOM.createRoot(docContainer);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
