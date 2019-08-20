import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery';
import { switchLoginStatus } from './categories.js';


// load products from selected category outside of react:>>>>>>>>>>>>>>>>>>>>>>>

var main_photo_container = document.getElementsByClassName('main_photo_container')[0]

// set the category switcher outside of react
window.switch_caregory = true;
var prev_category = null;

main_photo_container.addEventListener('click', function (event) {
  if (event.target.id != 'addCategoryButton' && (!event.target.className.includes('deleteItem'))) {
    window.category = event.target.id;

    // check is category changed
    prev_category != window.category ? window.switch_caregory = true : window.switch_caregory = false;

    // let's change category title
    var elem = document.getElementById('products');
    var notes = null;
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (elem.childNodes[i].className == "productsCategoryTitle") {
        notes = elem.childNodes[i];
        break;
      }
    }
    notes.innerHTML = "<b>" + window.category + "</b>";
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


function read_products(product_name) {
  $.ajax({
    url: 'http://127.0.0.1:5000/read_product',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(product_name),
    success: function (data) {
      // alert(JSON.stringify(data));
      var PRODUCTS = [];
      for (var i = 0; i < data.length; i++) {
        var rData_row = {
          name: data[i][0],
          src: data[i][1],
          in_price: data[i][2],
          out_price: data[i][3],
          about: data[i][4]
        };
        PRODUCTS.push(rData_row);
      }
      window.products = PRODUCTS;
    
      // render main react app
      ReactDOM.render( <App/> , document.getElementById('root'));
    },
    error: function (error) {
      alert("error: " + JSON.stringify(error));
    }
  });
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


//function for login>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function LoginToServer() {
  // let jsonData = {
  //   'Admin_Name': $('#username').val(),
  //   'Admin_Password': $('#password').val()
  // };
  // let Data_order = JSON.stringify(jsonData);
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
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
