import React, { Component } from 'react';
import DeveloperVladimir from './dev_Vladimir';
import DeveloperYaroslav from './dev_Yaroslav';
import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';

//npm install --save rc-datepicker
import 'moment/locale/uk.js';
import 'rc-datepicker/lib/style.css';
import { DatePicker} from 'rc-datepicker';

// component for calendar:
class Calendar extends Component {
  onChange = (jsDate, dateString) => {
   // alert(jsDate);
  }
  render(){
    const date = new Date();
    return(
      <div className="d-flex justify-content-center">
        <DatePicker onChange={this.onChange} value={date} />
      </div>
    );
  }
}

//component for setting period:
class Period extends Component {
  render(){
    return(
      <div>
        <br></br>
        <div className="d-flex justify-content-center">
          <div className="card" style={{width:400+'px'}}>
            <h4 className="card-title text-center">Заліковий період</h4>
            <div className="card-body d-flex justify-content-center">
              <div className="d-flex flex-column">
                <div>Початкова дата:</div>
                <div className="d-flex flex-row">
                  <InputGroup className="mb-3" style={{width:30+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Рік</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="2019"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ml-2" style={{width:32+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Місяць</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="01"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ml-2" style={{width:30+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">День</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="01"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>
                <br></br>
                <div>Кінцева дата:</div>
                <div className="d-flex flex-row">
                  <InputGroup className="mb-3" style={{width:30+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Рік</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="2019"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ml-2" style={{width:32+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">Місяць</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="01"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>

                  <InputGroup className="mb-3 ml-2" style={{width:30+'%'}}>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">День</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="01"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                </div>

              </div>
            </div>
          <div className="card-footer">виберіть проміжок часу</div>
        </div>
       </div>
      </div>
    );
  }
}

// Total Income component:
class TotalIncome extends Component {
  render(){
    return(
      <div>
        <br></br>
          <div className="d-flex justify-content-center">
          <div className="card" style={{width:400+'px'}}>
              <h4 className="card-title text-center">Загальний прибуток</h4>
              <div className="card-body d-flex justify-content-center">
                  <div className="card text-center" style={{width:50+'%'}}>1000</div>
                  <div className="ml-1">грн</div>
              </div>
              <div className="card-footer">за вибраний проміжок часу</div>
          </div>
       </div>
       
      </div>
    );
  }
}

// main component for DashBoard:
class DashBoard extends Component {
  render(){
    return(
      <div id = "dashboard_content">
        <h4 className="text-center">
          <b>ДОШКА АНАЛІТИКИ</b>
        </h4>
        <br></br>
        <DeveloperVladimir/>
        <Calendar/>
        <Period/>
        <DeveloperYaroslav/>
        <TotalIncome/>
      </div>
    );
  }
}

export default DashBoard;
  