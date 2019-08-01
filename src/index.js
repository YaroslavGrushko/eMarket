import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var main_photo_container= document.getElementsByClassName('main_photo_container')[0]

main_photo_container.addEventListener('click', function (event) {


window.category = event.target.id;

// let's change category title
var elem = document.getElementById('products');
var notes = null;
for (var i = 0; i < elem.childNodes.length; i++) {
    if (elem.childNodes[i].className == "productsCategoryTitle") {
      notes = elem.childNodes[i];
      break;
    }        
}

notes.innerHTML = "<b>"+window.category+"</b>";


// render main react app
ReactDOM.render(<App/>, document.getElementById('root'));
}, false);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
