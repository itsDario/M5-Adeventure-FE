import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer.js';
import App from './App';
import './index.css';

const store = createStore(userReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<Provider store={store}>
    {' '}
    <App />
</Provider>, document.getElementById('root'));