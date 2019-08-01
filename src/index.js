import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var main_photo_container= document.getElementsByClassName('main_photo_container')[0]

main_photo_container.addEventListener('click', function (event) {

window.category = event.target.id;
// render main react app
ReactDOM.render(<App/>, document.getElementById('root'));
}, false);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
