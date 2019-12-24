import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import SmApp from './SmApp';
import UserApp from './UserApp';
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

function loginToServer() {

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
        if(username=="admin"){
          // reload main react app with new window.admin_state value
          ReactDOM.render( <App/> , document.getElementById('root'));
        }else{
          if (username == 'sm'){
            // for sypply manager
            window.limited_access_state = true;
            // reload main react app with new window.admin_state value
            ReactDOM.render( <SmApp/> , document.getElementById('root'));
          }else{
            // for common user
            window.limited_access_state = true;
            localStorage.setItem('username', username);
            // window.user_state = true;
            // reload main react app with new window.admin_state value
            ReactDOM.render( <UserApp/> , document.getElementById('root'));          
          
          }
        }
    },
    error: function (message) {
      // alert("error: " + JSON.stringify(error));
      alert(message);
    }
  });
}

// function to sign in:>>>>>>>>>>>>>>>>
function signinToServer() {

  var username = $('#username_signin').val();
  var password = $('#password_signin').val();
  var phone=$('#phone_signin').val();


  $.ajax({
    url: 'http://127.0.0.1:5000/signin',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(phone),
    beforeSend: function (xhr) {
        xhr.setRequestHeader ("authorization", "Basic " + btoa(username + ":" + password));
    },
    success: function (data) {
      //  window.isAppRender = is app.js will be render
        window.isAppRender = false;
              if(data=='success'){
                alert('реєстрація пройшла успішно.');
              }else{
                alert(data);
              } 
    },
    error: function (message) {
      // alert("error: " + JSON.stringify(error));
      alert(message);
    }
  });
}

// if admin mode is activated:
$("#login").click(function() {
  loginToServer();
  $('.login_container').hide();
});

$("#signIn").click(function() {
  signinToServer();
  $('.sign_in_container').hide();
});
// logout is in the showCategories of categories.js

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
