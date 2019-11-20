import React, { Component } from 'react';

import './css/main_App.css';
import './css/images.css';

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Container, Row, Col, Table, Dropdown } from "react-bootstrap";


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
         <tr>
          <td>2</td>
          <td>зошит</td>
          <td>0201</td>
          <td>1</td>
          <td>40 грн</td>
          <td>40 грн</td>
        </tr>
       </tbody>
      </Table>
     </div>
    )
  }
}
//main table component where are stored all orders:
class MainTable extends Component {
  ////////////////////////////////////////////
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
                  <button class="button button2"><i class="fa fa-times"></i>&nbsp;3</button>
                </td>
                <td>
                  <button class="button button2">&nbsp;Петренко</button>
                </td>
                <td>
                <MyDropDown mainText="нове" textItem="прийняти"/>
                </td>
                <td>150 грн</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <button class="button button2"><i class="fa fa-times"></i>&nbsp;1</button>
                </td>
                <td>
                  <button class="button button2">&nbsp;Іваненко</button>            
                </td>
                <td>
                  <MyDropDown mainText="нове" textItem="прийняти"/>
                </td>
                <td>30 грн</td>
              </tr>
            </tbody>
           </Table>
          </div>);
}
  ////////////////////////////////////////////
}

//main component of whole SmApp:
class SmApp extends Component {
    ////////////////////////////////////////////
  render() {
      return( 
              <div>
                <div className='d-flex flex-row'>
                    <img className='avatar_img mr-4' src='images/manager-flat.jpg' alt='менеджер' />
                    <div>
                      <h2>Ярослав Грушко</h2>
                      <h3>менеджер-продавець</h3>
                    </div>
                 </div>
                 <MainTable/>
               </div>
            );
  }
    ////////////////////////////////////////////
}

export default SmApp;