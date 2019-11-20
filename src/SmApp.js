import React, { Component } from 'react';

import './css/main_App.css';
import './css/images.css';

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Container, Row, Col } from "react-bootstrap";

//main component of whole SmApp:
class SmApp extends Component {
    ////////////////////////////////////////////
  render() {
      return(<div className='d-flex flex-row'>
              <img className='avatar_img mr-4' src='images/manager-flat.jpg' alt='менеджер' />
              <div>
                <h2>Ярослав Грушко</h2>
                <h3>менеджер-продавець</h3>
              </div>
            </div>);
  }
    ////////////////////////////////////////////
}

export default SmApp;