import React, { Component } from 'react';

import './css/main_App.css';


import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Container, Row, Col } from "react-bootstrap";

//main component of whole SmApp:
class SmApp extends Component {
    ////////////////////////////////////////////
  render() {
      return("Hello from SmApp");
  }
    ////////////////////////////////////////////
}

export default SmApp;