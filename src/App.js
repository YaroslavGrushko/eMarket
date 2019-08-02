// import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//less (newest analogue of css):
/*-->*/
import './Appless.css';
/*<--*/
// product.css
import './css/product.css';
// info.css
import './css/info.css';

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Navbar, NavItem, Nav, Container, Row, Col } from "react-bootstrap";
// info js
import './additionalJs/info.js'

//webcames array with city name and src to youtube live
const PLACES={};

PLACES["Зошити"]=[
  {name:"Зошит 1", src:"images/copybooks/cb1.png", price:"₴30", about:"Елегантний зошит у лінійку (48 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок."},
  {name:"Зошит 2", src:"images/copybooks/cb2.png", price:"₴30", about:"Елегантний зошит у лінійку (96 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок."},
  {name:"Зошит 3", src:"images/copybooks/cb3.png", price:"₴30", about:"Практичний та приємний на дотик зошит у клітинку (48 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок."},
  {name:"Зошит 4", src:"images/copybooks/cb4.png", price:"₴40", about:"Практичний та приємний на дотик зошит у клітинку (96 аркушів) з якісного біосумісного паперу, виготовленого за сучасними еко-технологіями. Висока адгезійна здатність пареру для усіх видів пишучих приладів (олівці, ручки, фламастери). Висока стійкість до фламастерів та стирачок."},
];
PLACES["Калькулятори"]=[
  {name:"Калькулятор 1", src:"images/calculators/calc1.png", price:"₴30", about:"опис1"},
  {name:"Калькулятор 2", src:"images/calculators/calc2.png", price:"₴30", about:"опис2"},
  {name:"Калькулятор 3", src:"images/calculators/calc3.png", price:"₴30", about:"опис3"},
  {name:"Калькулятор 4", src:"images/calculators/calc4.png", price:"₴40", about:"опис4"},
  {name:"Калькулятор 5", src:"images/calculators/calc5.png", price:"₴40", about:"опис4"}
];
PLACES["Папір"]=[
  {name:"Папір 1", src:"images/paper/paper1.png", price:"₴60", about:"опис1"},
  {name:"Папір 2", src:"images/paper/paper2.png", price:"₴50", about:"опис2"},
  {name:"Папір 3", src:"images/paper/paper3.png", price:"₴50", about:"опис3"}
];
PLACES["Карандаші"]=[
  {name:"Карандаші 1", src:"images/pencils/penc1.png", price:"₴30", about:"опис1"},
  {name:"Карандаші 2", src:"images/pencils/penc2.png", price:"₴30", about:"опис2"},
  {name:"Карандаші 3", src:"images/pencils/penc3.png", price:"₴30", about:"опис3"},
  {name:"Ручки 1", src:"images/pencils/penc4.png", price:"₴20", about:"опис4"},
  {name:"Ручки 2", src:"images/pencils/penc5.png", price:"₴20", about:"опис5"},
  {name:"Ручки 3", src:"images/pencils/penc6.png", price:"₴20", about:"опис6"},
  {name:"Стержень 1", src:"images/pencils/penc7.png", price:"₴10", about:"опис7"},
  {name:"Стержень 2", src:"images/pencils/penc8.png", price:"₴5", about:"опис8"},
];
PLACES["Дрібниці"]=[
  {name:"Дрібниці 1", src:"images/nothingness/noth1.png", price:"₴30", about:"опис1"},
  {name:"Дрібниці 2", src:"images/nothingness/noth2.png", price:"₴20", about:"опис2"},
  {name:"Дрібниці 3", src:"images/nothingness/noth3.png", price:"₴50", about:"опис3"},
  {name:"Дрібниці 4", src:"images/nothingness/noth4.png", price:"₴30", about:"опис4"},
  {name:"Дрібниці 5", src:"images/nothingness/noth5.png", price:"₴30", about:"опис5"},
];
PLACES["ДляШколи"]=[
  {name:"ДляШколи 1", src:"images/school/sch1.png", price:"₴30", about:"опис1"},
  {name:"ДляШколи 2", src:"images/school/sch2.png", price:"₴20", about:"опис2"},
  {name:"ДляШколи 3", src:"images/school/sch3.png", price:"₴50", about:"опис3"},
  {name:"ДляШколи 4", src:"images/school/sch4.png", price:"₴30", about:"опис4"},
  {name:"ДляШколи 5", src:"images/school/sch5.png", price:"₴30", about:"опис5"},
];

//component of single video:
class CustomerInfo extends Component{
  render(){
    return(
      <div className="customerInfo">
      <div className="infoBlock">
      <h6><b>Контактні дані</b></h6>
     
      <label for="fname">Ваше ім'я:</label>
      <input type="text" id="fname" name="fname" placeholder="Введіть Ваше ім'я..."/>
      <label for="tnumber">Контактний телефон:</label>
      <input type="text" id="tnumber" name="tnumber" placeholder="+380 ** *** ** **"/>
      </div>

      <div className="infoBlock">
      <h6><b>Спосіб оплати</b></h6>
        <div className="custom-select">
          <select>
            <option value="0">Спосіб оплати</option>
            <option value="1">Накладений платіж</option>
            <option value="2">на картку ПриватБанку</option>
          </select>
        </div>
      </div>
      <h6>Спосіб/адрес доставки</h6>
      
      </div>
    );
  }
}


//component of single video:
class Product extends Component{
  render(){
    return(
      <div className="product">
      <Container>
      <Row> 
      <Col key={0} md={8} sm={12}>     
      <img src={this.props.product.src} frameBorder="0" onClick={this.props.onClick}></img>
      </Col>
      <Col key={1} md={4} sm={12}> 
      <div className="productMain">   
      <span className="productName">{this.props.product.name}</span>
      <span>{this.props.product.price.replace("₴","")} грн</span>
      <button className="button button2" onClick={() => this.props.onClick(true)}>Замовити</button>
      </div> 
      </Col>
      </Row>

      <Row>
      <div className="aboutProduct">
      <span><b>Опис</b></span>
      <span>{this.props.product.about}</span>
      </div>
      </Row>
        </Container>
      </div>
    );
  }
}

//component of single video:
class AProduct extends Component{
  render(){
    return(
      <div className="aProduct">
      <img className="WebCamVideo" src={this.props.src} frameBorder="0" onClick={this.props.onClick}></img>
      <span className="productName">{this.props.name}</span>
      <br/>
      <span>{this.props.price}</span>  
      </div>
    );
  }
}


//component of several AwebCam components:
class Category extends Component{
  render(){
  const category=this.props.category;
  const curCATEGORY=PLACES[category];
  const Placeslength=curCATEGORY.length;
    return(
      <Container>
      <Row md={6} sm={6}>
      {curCATEGORY.map((product, index) => (
      <Col key={index} md={4} sm={6}>     
              <AProduct className="Wrapper" src={product.src} name={product.name} price={product.price} onClick={() => this.props.onClick(product)} />
      </Col>
  ))
}
        </Row>
        </Container>
);
  }
}

//components of back button on WebCams "page":
class BackButton extends Component{
  render(){
    return(
      <div>
        <button className="BackButton w3-teal button_back" onClick={()=>this.props.onClick()}>
          {this.props.fromProduct ? <span>перейти <b>назад</b> до каталогу</span> : <span>перейти <b>назад</b> до  товару</span>}
        </button>
      </div>
    );
  }
}

//main component of whole app:
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showParam:'0',
      product:"none",
    };
  }
//Product button handler function:
handleClick(product) {
    this.setState({
      product:product,
      showParam:'1',
    });
  }
//when user click in <Product/>
handleProductClick(isOrder){
  if(isOrder){
  this.setState({
    showParam:'2',
  });
}
} 
//"to back" button handler function:
handleBackClick(backParam){
  if(backParam=="fromProduct"){
  this.setState({
    showParam:'0',
  });
}else{
  this.setState({
    showParam:'1',
  });
}
}
//function that returns <Countries/> tag(component):
renderCategory(){
  return(
    <Category category={window.category} onClick={(product) => this.handleClick(product)} />
    );
}
//function that returns <BackButton/> and <WebCames/> tag(component):
renderProduct(){
let products=[];
  products.push(<BackButton key={1} fromProduct={true}  onClick={() => this.handleBackClick("fromProduct")} />);
  products.push(<Product key={2} product={this.state.product} onClick={(isOrder) => this.handleProductClick(isOrder)} />);
  return products;
}
// function that returns <CustomerInfo/> tag(component):
renderInfo(){
  let products=[];
  products.push(<BackButton key={1} fromProduct={false} onClick={() => this.handleBackClick("fromInfo")} />);
  products.push(<CustomerInfo product={this.state.product}/>);
  return products;
}
renderSwitch(param){
  switch(param) {
    case '0':
      return this.renderCategory();
    case '1':
      return this.renderProduct();
    case '2':
      return this.renderInfo();
    default:
      return this.renderCategory();
  }
}
  //////////
  render() {
    return (
      <div className="App">
      {this.renderSwitch(this.state.showParam)}
      </div>
    );
  }
}

//module.exports = App;
 export default App;
