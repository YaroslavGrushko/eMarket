import React, { Component } from 'react';
import DeveloperVladimir from './dev_Vladimir';
import DeveloperYaroslav from './dev_Yaroslav';

import InputGroup from 'react-bootstrap/InputGroup';
import {FormControl} from 'react-bootstrap';

//npm install --save rc-datepicker
import 'moment/locale/uk.js';
import './css/board_styles/css/rc-datepicker_style.css';

import { DatePicker} from 'rc-datepicker';

import "bootstrap/dist/css/bootstrap.css"; 
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

  constructor(props) {
    super(props)
    this.state = {
      from_day : '1',
      from_month : '1',
      from_year : 2019,
      to_day : '2',
      to_month : '1',
      to_year : 2019,
    }
  }
  
  updatePeriod = ( ) => {
    var from_period = this.state.from_year + ','+ this.state.from_month + ',' + this.state.from_day;
    var to_period = this.state.to_year + ','+ this.state.to_month + ',' + this.state.to_day;
    this.props.periodCallBack(from_period, to_period);
  };

  handleChangeFromDay = async (e) => {
    const userInput = e.target.value;
    await this.setState({from_day: userInput});
    this.updatePeriod();
  }

  handleChangeToDay = async (e) => {
    const userInput = e.target.value;
    await this.setState({to_day: userInput});
    this.updatePeriod();
  }

  handleChangeFromMonth = async (e) => {
    const userInput = e.target.value;
    await this.setState({from_month: userInput});
    this.updatePeriod();
  }

  handleChangeToMonth = async (e) => {
    const userInput = e.target.value;
    await this.setState({to_month: userInput});
    this.updatePeriod();
  }

  handleChangeFromYear = async (e) => {
    const userInput = e.target.value;
    await this.setState({from_year: userInput});
    this.updatePeriod();
  }

  handleChangeToYear = async (e) => {
    const userInput = e.target.value;
    await this.setState({to_year: userInput});
    this.updatePeriod();
  }

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
                    placeholder={this.state.from_day}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={this.state.from_day} onChange={this.handleChangeFromDay}
                  />
                  <FormControl
                    placeholder={this.state.from_month}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={this.state.from_month} onChange={this.handleChangeFromMonth}
                  />
                  <FormControl
                    placeholder={this.state.from_year}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={this.state.from_year} onChange={this.handleChangeFromYear}
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
                    placeholder={this.state.to_day}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={this.state.to_day} onChange={this.handleChangeToDay}
                  />
                  <FormControl
                    placeholder={this.state.to_month}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={this.state.to_month} onChange={this.handleChangeToMonth}
                  />
                  <FormControl
                    placeholder={this.state.to_year}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={this.state.to_year} onChange={this.handleChangeToYear}
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
              <div className="card text-center" style={{width:35+'%'}}>{this.props.total_income}</div>
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

// component Total Graph for total sales and total expenses graphs:
class TotalGraph extends Component {
  componentDidMount() {
    this.initializeChart(this.props.config);
}
  componentDidUpdate(){
    this.initializeChart(this.props.config);
  }
initializeChart =()=> {
    let el = document.getElementById(this.props.chartId);
    let ctx = el.getContext("2d");
    let labels_and_dataArr = this.props.labels_and_data;//array of Objects
        let i = 0;
        var labelsArr = [];
        var dataArr = [];
        if (labels_and_dataArr === null || labels_and_dataArr === '' || labels_and_dataArr === undefined) {
          labelsArr = 0;
          dataArr = 0;
        } else{
          labels_and_dataArr.forEach(obj => {
            let label = Object.keys(obj); //  Object's keys array
            let value = obj[label[0]]; //  Object's value
            // alert('label= '+label+' value= '+value);
            labelsArr[i] = label;
            dataArr[i] = value;
            i++;
          });
        }
        
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labelsArr,
          datasets: [{
              data: dataArr,
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
                    <div className="card text-center font-weight-bold ml-2 p-1">{this.props.total_sales}</div>
                    <div className="ml-1">грн.</div>
                </div>
            </div>
            <div className="card-body p-0 d-flex justify-content-center">
                <div className="chart-container">
                    <canvas id={this.props.chartId} ref={this.initializeChart} aria-label="Hello ARIA World" role="img"  />
                </div>
            </div>
            <div className="card-footer">за вибраний проміжок часу</div>
        </div>
    </div>
    );
  }
}

// component Total Department Sales:
class TotalDepartmentSales extends Component {
  initializeChart =()=> {
      let el = document.getElementById(this.props.chartId);
      let ctx = el.getContext("2d");
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
    
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                data: this.props.receivedData,
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
          <div className="card mb-2">
              <div className="card-title text-center">                                   
                      <h4>Продажі відділу "{this.props.category_name}"</h4>                                         
              </div>
              <div className="card-body p-0 d-flex justify-content-center flex-column">
  
                    <div className="d-flex flex-row">
                      <img src={this.props.photo}  style={{height:80+'px'}} className="m-2"></img>
                        <div className="mt-4">
                          <span className="text-center">менеджер {this.props.name}</span>
                          <div className="d-flex flex-row text-center">
                            <span>всього:</span>
                            <div className="card text-center font-weight-bold ml-2 p-1">3500</div>
                            <div className="ml-1">грн.</div>
                          </div>
                        </div> 
                    </div>
                  <div className="p-0 d-flex justify-content-center">
                    <div className="chart-container">
                        <canvas id={this.props.chartId} ref={this.initializeChart} aria-label="Hello ARIA World" role="img"  />
                    </div>
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
  constructor(props){
    super(props);
    this.state={
      categories:[],
      total_sales : 0,
      total_expenses : 0,
      labels_and_data : null,
      from_period : '2019,1,1',
      to_period : '2019,1,2',
    }
  }
  
  componentDidMount()  {
    this.readManagersCards();
    this.readTotalGraph();
  }

  periodCallBack = (from, to) => {
    this.setState({
      from_period : from,
      to_period : to
    });
    this.readTotalGraph();
  }

  readManagersCards = () => {
    // draw the manager's cards:
    fetch("http://127.0.0.1:5000/read_categories",{
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        get_param: 'value'
      }
    })
    .then(res => res.json())
    .then((data)=>{
      // let data = getAllCategoriesData();
        // let's foreach every category
        let category_names = data.category_name;
        let names = data.name;
        let photos = data.photo;
  
        let chartData =[]
        chartData.push([500, 1000, 500, 500, 1000]);
        chartData.push([600, 8000, 400, 400, 600]);
        chartData.push([700, 2000, 500, 500, 5000]);
        chartData.push([100, 200, 300, 500, 700]);
        chartData.push([100, 200, 400, 500, 900]);
  
        var categories = []
        
        for(let i=0; i<category_names.length;i++){
          categories.push(<Col xs={12} md={6}><TotalDepartmentSales chartId={"chart"+i} receivedData={chartData[i]} category_name={category_names[i]} name={names[i]} photo={photos[i]}/></Col>);
        }
      
        this.setState({
          categories: categories,
        })
        });
  }

  readTotalGraph = () => {

    // draw the total sales and total expenses graphs:
    let jsonData = {
      'from_period': this.state.from_period,
      'to_period': this.state.to_period
    };
    let period = JSON.stringify(jsonData);
     fetch("http://127.0.0.1:5000/total_graph",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: period,
    })
    .then(res => 
      res.json())
    .then(
      (data)=>{
        this.setState({
          labels_and_data: data.sales_labels,
          exp_labels_and_data: data.expenses_labels,
          total_sales: data.total_sales,
          total_expenses: data.total_expenses,
        });
      },
      err => {
        console.log(err);
      }
    )

  }


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
              <div className="d-flex justify-content-center" style={{paddingTop: '10px'}}><Period periodCallBack={this.periodCallBack} /></div>
            </Col>
            <Col key={2} md={4} sm={1}>     
              <div className="d-flex justify-content-center" style={{paddingTop: '10px'}}><TotalIncome total_income={this.state.total_sales-this.state.total_expenses}/></div>
            </Col>
          </Row>
          <Row>
            <Col key={0} md={6} sm={1}>     
              <div className="d-flex justify-content-center" style={{paddingTop: '10px'}}>
                <Delayed waitBeforeShow={500}>
                  <div><TotalGraph chartId = 'ChartSales' total_sales={this.state.total_sales} labels_and_data={this.state.labels_and_data} /></div>
                </Delayed>
              </div>
            </Col>
            <Col key={1} md={6} sm={1}>     
              <div className="d-flex justify-content-center" style={{paddingTop: '10px'}}>
                <Delayed waitBeforeShow={500}>
                  <div><TotalGraph chartId = 'ChartExpenses' total_sales = {this.state.total_expenses} labels_and_data={this.state.exp_labels_and_data} /></div>
                </Delayed>
              </div>
            </Col>
          </Row>

          <br></br>
          <br></br>

          <Row>
            {this.state.categories}
          </Row>
          </Container>

        <DeveloperYaroslav/>
        
        <DeveloperVladimir/>
      </div>
    );
  }
}

export default DashBoard;
  