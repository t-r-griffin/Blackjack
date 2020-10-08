import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import './sass/main.scss';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((reg) => {
      console.log('service worker has been registered', reg);
    })
    .catch((err) => {
      console.log('service worker not registered', err);
    });
}

ReactDOM.render(<App />, document.querySelector('#root'));
