import React, { Component } from 'react';

import './css/main_App.css';
// import './css/images.css';

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Container, Row, Col, Table, Dropdown } from "react-bootstrap";
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

class MyDropDown extends Component {
  render(){
    return(
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
         {this.props.mainText}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">{this.props.textItem}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    );
  }
}
class OrdersTable extends Component{
  constructor(props) {
    super(props)
    this.state = {
      content:null,
    }
  }
  static getDerivedStateFromProps(props, state){
    var content=[]
    var products=props.data;
    if(products!=undefined){
      //////////
      for(var i=0;i<products.length;i++){
        var product = products[i];
        // let's calculate total cost of order
        var total_cost = product.count * product.price;
        
        content.push(<tr>

         

        </tr>);
      }
    }
    ////////
   return{
     content:content,
   };
  }

  render() {
    return(
      <div>
      <h3>Все про замовлення</h3>
      <Table striped responsive className="text-center">
       <thead>
         <tr>
           <th>#</th>
           <th>назва товару</th>
           <th>артикул</th>
           <th>к-ть</th>
           <th>ціна</th>
           <th>з-на вартість</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>1</td>
           <td>ручка</td>
           <td>0307</td>
           <td>2</td>
           <td>20 грн</td>
           <td>40 грн</td>
         </tr>
         {this.state.content}
       </tbody>
      </Table>
     </div>
    )
  }
}

class ClientTable extends Component{
  render() {
    return(
      <div>
      <h3>Все про замовника</h3>
      <Table striped responsive className="text-center">
       <thead>
         <tr>
           <th>ім'я</th>
           <th>фамілія</th>
           <th>телефон</th>
           <th>e-mail</th>
           <th>№ відділу Нової Пошти</th>
           <th>Спосіб оплати</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>Ігор</td>
           <td>Грушко</td>
           <td>+38097...</td>
           <td>...@gmail.com</td>
           <td>135</td>
           <td>накладений платіж</td>
         </tr>       
       </tbody>
      </Table>
     </div>
    )
  }
}

// for switching color of selected button
function buttonsColorSwitcher(e){
 // get all buttons
 var buttons = document.getElementsByClassName('selectedButton');
    
 // add/remove .selectedButton to current Button
 if(e.currentTarget.classList.contains('selectedButton')){
   e.currentTarget.classList.remove('selectedButton');
 }else{
   // remove .selectedButton from all buttons
   if(buttons.length!=0){
     for(var i=0;i<buttons.length;i++)
       buttons[i].classList.remove('selectedButton');
   }
   e.currentTarget.classList.add('selectedButton');
 }
}
// openOrdersTable component-function aim of which dynamically save data
// from getDerivedStateFromProps (MainTable table component)
class OrdersButtonComp extends Component{
  handleClick = (e)=>{
    this.props.onHandleClick(e, this.props.order_table);
  }
render(){
  return(
    <button className="button button2 text-center small-paddings" onClick={(e)=>this.handleClick(e)}><i class="fa fa-times"></i>&nbsp;{this.props.order_length}</button>
  );
}
}
// mainTable content
class MainTableRow extends Component{
  openOrdersTable(e, data){

    buttonsColorSwitcher(e);
    
    this.props.onClick('orders', data);
  }
render(){
  return(<tr>

    <td>{this.props.i}</td>

    <td>
    <OrdersButtonComp order_table={this.props.order_table} order_length={this.props.order_length} onHandleClick={this.openOrdersTable}/>
    </td>

    <td>
      <button class="button button2 small-paddings" onClick={(e)=>this.openClientTable(e)}>&nbsp;{this.props.order_customer_name}</button>
    </td>

    <td>
    <MyDropDown mainText="нове" textItem="прийняти"/>
    </td>

    <td>
      {this.props.total_cost}
    </td>

  </tr>);
}
}
//main table component where are stored all orders:
class MainTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content:null,
      mounted:false,
    }
  }

  openClientTable(e){
    buttonsColorSwitcher(e);
    this.props.onClick('client');
  }
 componentDidMount(){
   this.setState({
      mounted:true,
   })
 }
  static getDerivedStateFromProps(props, state){
    var content=[]
    var orders=props.orders;
    if(orders!=undefined){
      for(var i=0;i<orders.length;i++){
        var order = orders[i];
        // let's calculate total cost of order
        var total_cost = 0;
        for(var c=0;c<order.order.length;c++){
          var product = order.order[c];
          total_cost+= product.count * product.price;
        }
        var order_table = order.order;
        content.push(<MainTableRow onClick={(tableToShow, data)=>{this.props.onClick(tableToShow, data)}} i={i} order_table={order_table} order_length={order.order.length} order_customer_name={order.customer.name} total_cost={total_cost}/>);
      }
    }
   return{
     content:content,
   };
  }
 
render() {
    return(<div>
           <h3>Список замовлень</h3>
           <Table striped responsive className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>замовлення</th>
                <th>замовник</th>
                <th>статус</th>
                <th>вартість</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <button className="button button2 text-center small-paddings"><i class="fa fa-times"></i>&nbsp;3</button>
                </td>
                <td>
                  <button class="button button2 small-paddings" onClick={(e)=>this.openClientTable(e)}>&nbsp;Петренко</button>
                </td>
                <td>
                <MyDropDown mainText="нове" textItem="прийняти"/>
                </td>
                <td>150 грн</td>
              </tr>
             {this.state.content}
            </tbody>
           </Table>
          </div>);
}
}

// Calendar:
// component for calendar:
class Calendar extends Component {
  onChange = (jsDate, dateString) => {
   // alert(jsDate);
  }
  render(){
    const date = new Date();
    return(
      <div className="d-flex justify-content-center card-height-100">
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
      from_day : '01',
      from_month : '01',
      from_year : 2019,
      to_day : '01',
      to_month : '01',
      to_year : 2019,
    }
  }
  
  
  updatePeriod = ( ) => {
    var from_period = this.state.from_year + this.state.from_month + this.state.from_day;
    var to_period = this.state.to_year + this.state.to_month + this.state.to_day;
    
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
      <div className="card-height-100">
        <div className="card card-height-100" style={{width:100+'%'}}>
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
// total sales of some manager:
// component Total Expenses:
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
        <div className="d-flex justify-content-center card-height-100">
          <div className="card mb-2 card-height-100">
              <div className="card-title d-flex justify-content-center"> 
                <div className="d-flex flex-row">                                  
                      <h4>Продажі менеджера {this.props.name}</h4> 
                      <div className="card text-center font-weight-bold ml-2 p-1">3500</div>
                      <div className="ml-1">грн.</div>                                        
                </div>
                      </div>
              <div className="card-body p-0 d-flex justify-content-center flex-column">
  
                  <div className="p-0 d-flex justify-content-center">
                    <div className="chart-container">
                        <canvas id={this.props.chartId} ref={this.initializeChart} aria-label="Hello ARIA World" role="img"  />
                    </div>
                  </div>
              </div>
          </div>
      </div>
      );
    }
  }
//main component of whole SmApp:
class SmApp extends Component {
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
  MainTableClickHandler(tableToShow, data){
    switch(tableToShow){
      case 'orders':
        if(!this.state.showOrdersTable){
          this.setState({
            showOrdersTable:true,
            showClientTable:false,
            isAnyAnotherTable:true,
            OrdersTableData: data,
          });}else{
            this.setState({
            isAnyAnotherTable:false,
            showOrdersTable:false,
            });
          }
        return null;
      case 'client':
        if(!this.state.showClientTable){
          this.setState({
            showClientTable:true,
            showOrdersTable:false,
            isAnyAnotherTable:true,
          });
          }else{
            this.setState({
              isAnyAnotherTable:false,
              showClientTable:false,
              });
          }
         return null;
      default:
        return null;
    }
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
  
        var categories = []
        
        // for(let i=0; i<category_names.length;i++){
          categories.push(<TotalDepartmentSales chartId="chart0" receivedData={chartData[0]} category_name={category_names[0]} name={names[0]} photo={photos[0]}/>);
        // }
        var orders = [];
        var order1 ={'order':[
          {'product_name':'ручка_зелена', 'article':1235, 'count':3, 'price': 50},
          {'product_name':'ручка_синя', 'article':1236, 'count':2, 'price': 50},
          {'product_name':'ручка_жовта', 'article':1237, 'count':2, 'price': 50},
                ], 'customer':
          {'name':'Ігор', 'surname':'Столяр', 'phone':'+380*********', 'email':'***@gmail.com', 'nova_poshta_number':135, 'payment_method':'cash_on_delivery'}
        };
        var order2 ={'order':[
          {'product_name':'зошит_зелена', 'article':1225, 'count':3, 'price': 50},
          {'product_name':'зошит_синя', 'article':1226, 'count':2, 'price': 50},
          {'product_name':'зошит_жовта', 'article':1227, 'count':2, 'price': 50},
                ], 'customer':
          {'name':'Василь', 'surname':'Маляр', 'phone':'+380*********', 'email':'***@gmail.com', 'nova_poshta_number':135, 'payment_method':'cash_on_delivery'}
        };
        orders.push(order1);
        orders.push(order2);

        this.setState({
          managerSales: categories,
          orders: orders,
        })
        });
  }
componentDidMount(){
  this.readManagersCards();
}
  render() {
      return( 
              <div>
                <div className='d-flex flex-row pb-4'>
                    <img className='avatar_img mr-4' src='images/manager-flat.jpg' alt='менеджер' />
                    <div>
                      <h2>Ярослав Грушко</h2>
                      <h3>менеджер-продавець</h3>
                    </div>
                 </div>
                  <div className="pb-5">
                    <Row>
                      <Col sm={12}>
                      <div className={this.state.isAnyAnotherTable ? 'col-sm-12 col-md-6 pt-4 pull-left transition' : 'transition'}>
                        <MainTable orders={this.state.orders} onClick={(tableToShow, data)=>this.MainTableClickHandler(tableToShow, data)}/>
                      </div>

                      <div className={this.state.isAnyAnotherTable ? 'col-sm-12 col-md-6 pt-4 pull-right transition' : 'transition'}>                
                        {this.state.showOrdersTable ? <OrdersTable data={this.state.OrdersTableData}/> : null}
                        {this.state.showClientTable ? <ClientTable/> : null}
                      </div>
                      </Col>
                    </Row>
                  </div>
                  <hr/>
                  <div className='pt-5'>
                    <div>
                      <h3>Статистика</h3>
                    </div>
                    <Row>
                        <Col sm={2}>
                          <div className='pt-4 card-height-100'>
                            <Calendar/>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className='pt-4 card-height-100'>
                              <Period/>
                          </div>
                        </Col>
                      <Col sm={6} className='pt-4'>
                          {this.state.managerSales}
                      </Col>
                    </Row>
                  </div>
               </div>
            );
  }
    ////////////////////////////////////////////
}


export default SmApp;