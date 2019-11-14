import React, { Component } from 'react';
import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Container, Row, Col } from "react-bootstrap";

import Chart from 'chart.js';
import './css/my-charts.css';

// import getCategories from './categories.js';
// import returnCategories from './categories.js';

// // getCategories - function that
// // is reponsable for loading all categories
// // from Db 
// function getAllCategoriesData() {
//   $.ajax({
//     url: 'http://127.0.0.1:5000/read_categories',
//     type: 'GET',
//     data: {
//       get_param: 'value'
//     },
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     success: function (data) {
//      return data;
//     },
//     error: function (error) {
//       alert("error: " + JSON.stringify(error));
//     }
//   });
// }



// component:
class DeveloperYaroslav extends Component {
  render(){
    return(
    <div>
    Under constraction by Yaroslav
    </div>
    );
  }
}

export default DeveloperYaroslav;
  