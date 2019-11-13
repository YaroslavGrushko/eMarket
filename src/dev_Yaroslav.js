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

// component Total Expenses:
class TotalSales extends Component {
//   componentDidMount() {
//     this.initializeChart(this.props.config);
// }

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

// component:
class DeveloperYaroslav extends Component {
constructor(props){
  super(props);
  this.state={
    categories:[]
  }
}
componentDidMount()  {
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
        categories.push(<Col xs={12} md={6}><TotalSales chartId={"chart"+i} receivedData={chartData[i]} category_name={category_names[i]} name={names[i]} photo={photos[i]}/></Col>);
      }
    
      this.setState({
        categories: categories,
      })
      });
}
  render(){
    return(
    <div>
    <Container>
    <Row>
    {this.state.categories}
    </Row>
    </Container>
    </div>
    );
  }
}

export default DeveloperYaroslav;
  