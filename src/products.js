import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import $ from 'jquery';
import './index.js'


export function read_products(category_name) {
    $.ajax({
      url: 'http://127.0.0.1:5000/read_product',
      type: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(category_name),
      success: function (data) {
        
        // check if products table is not empty
        if (data.name_of_not_exist_table != null && window.admin_state !== true) {
          alert("Table: <<"+data.name_of_not_exist_table+">> dose not exist!");
        } 
        else{
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
        // reload window.products in App and render main react app
        ReactDOM.render( <App/> , document.getElementById('root'));
        }
      },
      error: function (error) {
        alert("error: " + JSON.stringify(error));
      }
    });
  }

// addProructToServer - is a function that is responsible
// for POST product to Db (add new product)
export function addProductToServer(CurrentCategory, ProductName, ProductInPrice, ProductOutPrice, ProductPhoto, ProductAbout) {
  let jsonData = {
    'Current_Category': CurrentCategory,
    'Product_Name': ProductName,
    'Product_In_Price': ProductInPrice, 
    'Product_Out_Price': ProductOutPrice,
    'Product_Photo': ProductPhoto,
    'Product_About': ProductAbout,
  };
  let Data_order = JSON.stringify(jsonData);

  $.ajax({
    url: 'http://127.0.0.1:5000/add_product',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('x-access-token')
    },
    data: Data_order,
    success: function (data) {
      // alert(data.status); 
      read_products(data.status);
      $(".addProductModal").toggleClass("show-modal");
    },
    error: function (error) {
      alert("error: " + JSON.stringify(error));
    }
  });
}

// updateProructToServer - is a function that is responsible
// for POST updated product to Db 
export function updateProductToServer(CurrentCategory, ProductName, ProductInPrice, ProductOutPrice, ProductPhoto, ProductAbout) {
  let jsonData = {
    'Current_Category': CurrentCategory,
    'Product_Name': ProductName,
    'Product_In_Price': ProductInPrice, 
    'Product_Out_Price': ProductOutPrice,
    'Product_Photo': ProductPhoto,
    'Product_About': ProductAbout,
  };
  let Data_order = JSON.stringify(jsonData);

  $.ajax({
    url: 'http://127.0.0.1:5000/update_product',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('x-access-token')
    },
    data: Data_order,
    success: function (data) {
      //alert(data.status); 
      //close modal window:
      var myModal = document.getElementsByClassName("editProductModal")[0];
      myModal.classList.toggle("show-modal");
      document.getElementsByClassName('.addCategoryModal .my-modal-content').innerHTML = "";
      read_products(data.status);
    },
    error: function (error) {
      alert("error: " + JSON.stringify(error));
    }
  });
}

// deleteProructFromServer - is a function that is responsible
// for POST delete product from Db 
export function deleteProructFromServer(CurrentCategory, ProductName) {
  let jsonData = {
    'Current_Category': CurrentCategory,
    'Product_Name': ProductName
  };
  let Data_order = JSON.stringify(jsonData);

  $.ajax({
    url: 'http://127.0.0.1:5000/delete_product',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('x-access-token')
    },
    data: Data_order,
    success: function (data) {
      //alert(data.status); 
      read_products(data.status);
    },
    error: function (error) {
      alert("error: " + JSON.stringify(error));
    }
  });
}