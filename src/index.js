import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from './serviceWorker';
import Store from './store';

ReactDOM.render( <Store><App /></Store>, document.getElementById('root'));

serviceWorker.unregister();
