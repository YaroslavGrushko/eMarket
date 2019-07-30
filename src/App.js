// import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//less (newest analogue of css):
/*-->*/
import './Appless.css';
/*<--*/

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Navbar, NavItem, Nav, Container, Row, Col } from "react-bootstrap";

//webcames array with city name and src to youtube live
const PLACES={};

PLACES["Зошити"]=[
  {name:"Зошит1", src:"images/copybooks/cb1.jpg"},
  {name:"Зошит2", src:"images/copybooks/cb2.jpg"},
  {name:"Зошит3", src:"images/copybooks/cb3.jpg"},
  {name:"Зошит4", src:"images/copybooks/cb4.jpg"}
];

//component of single video:
class Product extends Component{
  render(){
    return(
      <div>
      {this.props.product}
      </div>
    );
  }
}

//component of single video:
class AProduct extends Component{
  render(){
    return(
      <div>
      <img className="WebCamVideo" src={this.props.src} frameBorder="0" onClick={this.props.onClick}></img>
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
      <Col key={index} md={6} sm={6}>
        <table>
          <tr>
            <td>
              <AProduct className="Wrapper" src={product.src} onClick={() => this.props.onClick(product.name)} />
              <span className="CenturyGothicCommon">{product.name}</span>
            </td>   
          </tr>
        </table>
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
        <button className="BackButton button_back" onClick={()=>this.props.onClick()}>
          <span className="CenturyGothicCommon">go <b>back</b> to the categories</span>
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
      category:"Зошити",
      product:"none"
    };
  }
//Product button handler function:
handleClick(productName) {
    this.setState({
      product:productName,
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
    <Category category={this.state.category} onClick={(productName) => this.handleClick(productName)} />
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
        
      {this.state.showProduct ? this.renderProduct() : this.renderCategory()}

      </div>
    );
  }
}

//module.exports = App;
 export default App;
