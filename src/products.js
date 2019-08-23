import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import $ from 'jquery';
import { drawModal } from './modal.js';
import { categorymodalHtml } from './modal.js';
import './index.js'


export function read_products(product_name) {
    $.ajax({
      url: 'http://127.0.0.1:5000/read_product',
      type: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(product_name),
      success: function (data) {
        
        // check if products table is not empty
        if (data.name_of_not_exist_table != null && window.admin_state != true) {
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
 

  
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<