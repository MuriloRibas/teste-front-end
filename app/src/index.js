import React from 'react';
import ReactDOM from 'react-dom';
import { Search } from './pages/search/index';
import 'normalize.css';
import './theme.css'

ReactDOM.render(
  <React.StrictMode>
    <Search />
  </React.StrictMode>,
  document.getElementById('root')
);
