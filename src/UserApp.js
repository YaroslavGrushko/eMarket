import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './css/main_App.css';
// import './css/images.css';

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Container, Row, Col, Table, Dropdown } from "react-bootstrap";

// Import React Table
import ReactTable from "react-table";
// for react width sizing
import { MDBContainer } from 'mdbreact'
// for calendar
import { DatePicker} from 'rc-datepicker';
// for Period Component
import InputGroup from 'react-bootstrap/InputGroup';
import {FormControl} from 'react-bootstrap';
// for chart.js:
import Chart from 'chart.js';
import './css/my-charts.css';
import './css/board_styles/css/board_main.css';
import './css/board_styles/css/card_styles.css';
import './css/board_styles/css/images.css';
import './css/board_styles/css/tables.css';

//main table component where are stored all orders:
class MyOrderTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content:null,
      mounted:false,
    }
  }

  static getDerivedStateFromProps(props, state){
    var content=[]
    var orders=props.orders;
    if(orders!=undefined){
    
      for(var i=0;i<orders.length;i++){
        var order = orders[i];
        // let's calculate total cost of order
        var total_cost = 0;
        // for(var c=0;c<order.order.length;c++){
          // var product = order.order[c];
          // total_cost+= product.count * product.price;
        // }
        // total cost (total column)
        total_cost = order[7];
        var status = '';
        var myMainText=''
        var myTextItem=''
        var myClass=''
        switch(order[10]){
          case 'new':
            {status='нове';
             myClass='badge badge-primary';
             break;}
          case 'in_the_processing':
            {status="в обробці";
            myTextItem="відправлено";
            myClass='badge badge-warning';
            break;}
          case 'sent':
            {status="відправлено";
            myClass='badge badge-warning';
            break;}
        }
        
        content.push(
          <tr>
          <td>{i}</td>
          <td>
              &nbsp;{order[0]}
          </td>
          <td>{order[1]}</td>
          <td>{order[6]}</td>
          <td>{order[11]}</td>
          <td>{order[9]}</td>
          <td>
          <span className={myClass}>{status}</span>
          </td>

          <td>
            {total_cost}
          </td>

        </tr>
          );
      }
    }
   return{
     content:content,
   };
  }
 
render() {
    return(
          <div>
              <h3>Список замовлень</h3>
              <div className='overflow-y-scroll'>
              <Table striped className="text-center">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>телефон замовника</th>
                    <th>товар</th>
                    <th>кількість</th>
                    <th>дата замовлення</th>
                    <th>спосіб оплати</th>
                    <th>статус</th>
                    <th>вартість</th>
                  </tr>
                </thead>
                  <tbody>    
                      {this.state.content}    
                  </tbody>
                  
              </Table>
              </div>
            </div>
           );
}
}
//main component of whole SmApp:
class UserApp extends Component {
    ////////////////////////////////////////////
  constructor(props){
    super(props);
    this.state={
      showOrdersTable:false,
      showClientTable:false,
      isAnyAnotherTable:false,
      managerSales:[],
    };
  }

  getMyOrders = () => {
    // draw the manager's cards:
    fetch("http://127.0.0.1:5000/userorders",{
      method: 'post',
      headers: {
        'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('x-access-token')
      },
      body:JSON.stringify({'data':'002'}),
    })
    .then(res => res.json())
    .then((orders)=>{
  
        let categories ="categories";
        this.setState({
          managerSales: categories,
          orders: orders,
        })
        });
  }
componentDidMount(){
  this.getMyOrders();
}
  render() {
      return( 
              <div>
                <div className='d-flex flex-row pb-4'>
                    <img className='avatar_img mr-4' src='images/manager-flat.jpg' alt='менеджер' />
                    <div>
                      <h2>{localStorage.getItem('username')}</h2>
                      <h3>покупець</h3>
                    </div>
                 </div>
                  
                  <hr/>
                  <MyOrderTable orders={this.state.orders}/>
               </div>
            );
  }
    ////////////////////////////////////////////
}



export default UserApp;