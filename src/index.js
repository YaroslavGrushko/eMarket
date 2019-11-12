import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery';
import { switchLoginStatus } from './categories.js';
import { read_products } from './products.js';


// load products from selected category outside of react:>>>>>>>>>>>>>>>>>>>>>>>

var main_photo_container = document.getElementsByClassName('main_photo_container')[0]

// set the category switcher outside of react
window.switch_caregory = true;
window.isAppRender = false;
var prev_category = null;
window.order=[]; // value with product's order

main_photo_container.addEventListener('click', function (event) {
  if (event.target.id !== 'addCategoryButton' && (!event.target.className.includes('deleteItem')) && (!event.target.className.includes('editItem'))) {
    window.category = event.target.id;

    // check is category changed
    prev_category !== window.category ? window.switch_caregory = true : window.switch_caregory = false;

    //  window.isAppRender = is app.js will be render
    window.isAppRender = true;
    
    //read category's products and load main react component App with products
    read_products(window.category);

  }
}, false);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//function for login>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function LoginToServer() {
  
  var username = $('#username').val();
  var password = $('#password').val();

  $.ajax({
    url: 'http://127.0.0.1:5000/login',
    type: 'POST',
    
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("authorization", "Basic " + btoa(username + ":" + password));
    },
  
    success: function (data) {
      // set new window.admin_state and window.switch_admin_mode values:
       switchLoginStatus(true);
       localStorage.setItem('x-access-token', data.token);
      //  window.isAppRender = is app.js will be render
        window.isAppRender = false;
      // reload main react app with new window.admin_state value
        ReactDOM.render( <App/> , document.getElementById('root'));
    },
    error: function (error) {
      // alert("error: " + JSON.stringify(error));
      alert("АУТЕНТИФІКАЦІЮ НЕ ПРОЙДЕНО");
    }
  });
}

// if admin mode is activated:
$( "#login" ).click(function() {
  LoginToServer();
  $('.login_container').hide();
});

// logout is in the showCategories of categories.js

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
