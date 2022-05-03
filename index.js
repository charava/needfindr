import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { nanoid } from 'nanoid';
import { MdDeleteForever } from 'react-icons/md';
import * as Papa from 'papaparse';
import App from './App';
//import * as csvdata from .csv'




ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
