import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import 'animate.css';
import './theme.css';
import App from './App';

ReactDOM.render(
    // eslint-disable-next-line react/jsx-filename-extension
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    // eslint-disable-next-line no-undef
    document.getElementById('root'),
);
