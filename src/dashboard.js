import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DeveloperVladimir from './dev_Vladimir';
import DeveloperYaroslav from './dev_Yaroslav';
import {InputGroup} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';

//npm install --save rc-datepicker
import 'moment/locale/uk.js';
import './css/board_styles/css/rc-datepicker_style.css';

import { DatePicker} from 'rc-datepicker';

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Container, Row, Col } from "react-bootstrap";

import Chart from 'chart.js';
import './css/my-charts.css';
import './css/board_styles/css/board_main.css';

import Delayed from './Delayed';//for delay rendering

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
        <div className="card" style={{width:100+'%', height:185+'px'}}>
          <h4 className="card-title text-center">Заліковий період</h4>
          <div className="card-body">
            
            <div>Початкова дата:</div>
            <div className="d-flex flex-column">
              <div className="d-flex flex-row">
                <InputGroup InputGroup size="sm" className="mb-3 ml-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">день/місяць/рік:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="01"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                  <FormControl
                    placeholder="01"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                  <FormControl
                    placeholder="2019"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
              </div>
            </div>
        
            <div>Кінцева дата:</div>
            <div className="d-flex flex-column">
              <div className="d-flex flex-row">
                <InputGroup InputGroup size="sm" className="mb-3 ml-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-sm">день/місяць/рік:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="01"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                  <FormControl
                    placeholder="01"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                  <FormControl
                    placeholder="2019"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </InputGroup>
              </div>
            </div>

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
        <div className="d-flex justify-content-center">
          <div className="card" style={{width:100+'%'}}>
            <h4 className="card-title text-center">Загальний прибуток</h4>
            <div className="card-body d-flex justify-content-center">
              <div className="card text-center" style={{width:35+'%'}}>1000</div>
              <div className="ml-1">грн</div>
            </div>
              {/* <div className="card-footer">за вибраний проміжок часу</div> */}
          </div>

          <div className="card" style={{width:100+'%'}}>
            <h4 className="card-title text-center">Прогноз на місяць</h4>
            <div className="card-body d-flex justify-content-center">
              <div className="card text-center" style={{width:35+'%'}}>1000</div>
              <div className="ml-1">грн</div>
            </div>
              {/* <div className="card-footer">за вибраний проміжок часу</div> */}
          </div>

        </div>
       
      </div>
    );
  }
}

// component Total Sales:
class TotalSales extends Component {
  componentDidMount() {
    this.initializeChart(this.props.config);
}

initializeChart =()=> {
    let el = document.getElementById('ChartSales');
    let ctx = el.getContext("2d");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
  
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [{
              data: [2000, 1000, 1000, 2000, 2000],
              cubicInterpolationMode: 'monotone'
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          responsive: true,
          maintainAspectRatio: false,
          legend:{
              display:false
          }
      }
  });
  return myChart;
}
  render(){
    return(
      <div className="d-flex justify-content-center">
        <div className="card" style={{width:100+'%'}}>
            <div className="card-title d-flex justify-content-center">
                <div className="d-flex flex-row">
                    <h4>Загальні продажі</h4>
                    <div className="card text-center font-weight-bold ml-2 p-1">8000</div>
                    <div className="ml-1">грн.</div>
                </div>
            </div>
            <div className="card-body p-0 d-flex justify-content-center">
                <div className="chart-container">
                    <canvas id="ChartSales" ref={this.initializeChart} aria-label="Hello ARIA World" role="img"  />
                </div>
            </div>
            <div className="card-footer">за вибраний проміжок часу</div>
        </div>
    </div>
    );
  }
}

// component Total Expenses:
class TotalExpenses extends Component {
  componentDidMount() {
    this.initializeChart(this.props.config);
}

initializeChart =()=> {
    let el = document.getElementById('ChartExpenses');
    let ctx = el.getContext("2d");
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
  
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [{
              data: [500, 1000, 500, 500, 1000],
              cubicInterpolationMode: 'monotone'
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
          responsive: true,
          maintainAspectRatio: false,
          legend:{
              display:false
          }
      }
  });
  return myChart;
}
  render(){
    return(
      <div className="d-flex justify-content-center">
        <div className="card" style={{width:100+'%'}}>
            <div className="card-title d-flex justify-content-center">
                <div className="d-flex flex-row">
                    <h4>Загальні витрати</h4>
                    <div className="card text-center font-weight-bold ml-2 p-1">3500</div>
                    <div className="ml-1">грн.</div>
                </div>
            </div>
            <div className="card-body p-0 d-flex justify-content-center">
                <div className="chart-container">
                    <canvas id="ChartExpenses" ref={this.initializeChart} aria-label="Hello ARIA World" role="img"  />
                </div>
            </div>
            <div className="card-footer">за вибраний проміжок часу</div>
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
        
        <Container>
          <Row>
            <Col key={0} md={3} sm={1}>     
              <div className="d-flex justify-content-center" style={{paddingTop: '10px'}}><Calendar/></div>
            </Col>
            <Col key={1} md={5} sm={1}>     
              <div className="d-flex justify-content-center" style={{paddingTop: '10px'}}><Period/></div>
            </Col>
            <Col key={2} md={4} sm={1}>     
              <div className="d-flex justify-content-center" style={{paddingTop: '10px'}}><TotalIncome/></div>
            </Col>
          </Row>
          <Row>
            <Col key={0} md={6} sm={1}>     
              <div className="d-flex justify-content-center" style={{paddingTop: '10px'}}>
                <Delayed waitBeforeShow={500}>
                  <div><TotalSales/></div>
                </Delayed>
              </div>
            </Col>
            <Col key={1} md={6} sm={1}>     
              <div className="d-flex justify-content-center" style={{paddingTop: '10px'}}>
                <Delayed waitBeforeShow={500}>
                  <div><TotalExpenses/></div>
                </Delayed>
              </div>
            </Col>
          </Row>
          </Container>
          <br></br>
          <br></br>

        <DeveloperYaroslav/>
        
        <DeveloperVladimir/>
      </div>
    );
  }
}

export default DashBoard;
  