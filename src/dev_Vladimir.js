import React, { Component } from 'react';
import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
//npm install --save rc-datepicker
import 'moment/locale/uk.js';
import 'rc-datepicker/lib/style.css';
import { DatePicker} from 'rc-datepicker';



// component:
class DeveloperVladimir extends Component {
  // onChange = (jsDate, dateString) => {
  //   alert(jsDate);
  // }
  render(){
    const date = new Date();
    return(
      <div >
        <h4>Under construction</h4>
      </div>
    );
  }
}

export default DeveloperVladimir;
  