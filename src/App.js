// import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//less (newest analogue of css):
/*-->*/
import './Appless.css';
/*<--*/
import './product.css';

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Navbar, NavItem, Nav, Container, Row, Col } from "react-bootstrap";


//webcames array with city name and src to youtube live
const PLACES={};

PLACES["Зошити"]=[
  {name:"Зошит1", src:"images/copybooks/cb1.png", price:"₴30", about:"опис1"},
  {name:"Зошит2", src:"images/copybooks/cb2.png", price:"₴30", about:"опис2"},
  {name:"Зошит3", src:"images/copybooks/cb3.png", price:"₴30", about:"опис3"},
  {name:"Зошит4", src:"images/copybooks/cb4.png", price:"₴40", about:"опис4"}
];
PLACES["Калькулятори"]=[
  {name:"Калькулятор1", src:"images/copybooks/cb1.png", price:"₴30", about:"опис1"},
  {name:"Калькулятор2", src:"images/copybooks/cb2.png", price:"₴30", about:"опис2"},
  {name:"Калькулятор3", src:"images/copybooks/cb3.png", price:"₴30", about:"опис3"},
  {name:"Калькулятор4", src:"images/copybooks/cb4.png", price:"₴40", about:"опис4"}
];

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
      <button className="button button2">Замовити</button>
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
          <span>перейти <b>назад</b> до каталогу</span>
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
      showProduct:false,
      product:"none",
    };
  }
//Product button handler function:
handleClick(product) {
    this.setState({
      product:product,
      showProduct:true,
    });
  }
//"to back" button handler function:
handleBackClick(){
  this.setState({
    showProduct:false,
  });
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
  products.push(<BackButton key={1} onClick={() => this.handleBackClick()} />);
  products.push(<Product key={2} product={this.state.product} />);
  return products;
}

  //////////
  render() {
    return (
      <div className="App">
      {window.test}
      {this.state.showProduct ? this.renderProduct() : this.renderCategory()}
      </div>
    );
  }
}

//module.exports = App;
 export default App;
