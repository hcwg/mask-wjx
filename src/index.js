import React from 'react';
import ReactDOM from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
});

ReactDOM.render((
  <JssProvider jss={jss} generateClassName={createGenerateClassName()}>
    <App />
  </JssProvider>
), document.getElementById('root'));

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
