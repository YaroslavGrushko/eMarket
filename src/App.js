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
PLACES["Европа"]=[
  {city:"Saint-Malo-Le Port", src:"https://www.youtube.com/embed/fQ8pFCrVGzE", zip: "Saint-Malo", time_zone:"Europe/Berlin"},
  {city:"Baden-Baden", src:"https://www.youtube.com/embed/KiKuzd-ioRw", zip: "Baden-Baden", time_zone:"Europe/Berlin"},
  //{city:"Venice", src:"https://www.youtube.com/embed/YiiNSrDuECw", zip: "Venezia", time_zone:"Europe/Madrid"}
  {city:"Venice", src:"https://www.youtube.com/embed/vPbQcM4k1Ys", zip: "Moscow", time_zone:"Europe/Madrid"},
  {city:"Oslo", src:"https://www.youtube.com/embed/DhPYnvZmFQA", zip: "Oslo", time_zone:"Europe/Madrid"}
];
PLACES["Азия"]=[
  {city:"Koh Samui", src:"https://www.youtube.com/embed/y5hjoAZGf_E", zip: "Ko Samui", time_zone:"Asia/Saigon" },
  {city:"Tokyo", src:"https://www.youtube.com/embed/JYBpu1OyP0c", zip: "Tokyo", time_zone:"Asia/Tokyo"},
  {city:"Tokyo", src:"https://www.youtube.com/embed/nKMuBisZsZI", zip: "Tokyo", time_zone:"Asia/Tokyo"},
  {city:"Earth", src:"https://www.youtube.com/embed/qyEzsAy4qeU", zip: "Kiev", time_zone:"Europe/Kiev"}
];
PLACES["Америка"]=[
  {city:"New York", src:"https://www.youtube.com/embed/la90mA4VLa4", zip: "New York", time_zone:"America/New_York"},
  {city:"Banff", src:"https://www.youtube.com/embed/2UX83tXoZoU", zip: "Banff", time_zone:"Canada/Central"},
  {city:"Tucson", src:"https://www.youtube.com/embed/nmoQp7gyzIk", zip: "Tucson", time_zone:"America/Fort_Nelson"},
  {city:"Mexico City", src:"https://www.youtube.com/embed/jHD8XrAYAyk", zip: "Mexico City", time_zone:"America/Mexico_City"}
];
PLACES["Африка"]=[
  {city:"Cape Town", src:"https://www.youtube.com/embed/Ki-d5f5_WwU", zip: "Cape Town", time_zone:"Africa/Cairo"},
  {city:"Melbourne", src:"https://www.youtube.com/embed/FZ72I6o6Z9k", zip: "Melbourne", time_zone:"Australia/Melbourne"},
  {city:"Animals", src:"https://www.youtube.com/embed/TW19E-C8nJ8", zip: "Cape Town", zip: "Cape Town"},
  {city:"Animals", src:"https://www.youtube.com/embed/Kay9czw22ew", zip: "Cape Town", zip: "Cape Town"}
];

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
class Section extends Component{
  render(){
  const section=this.props.section;
  const curSECTION=PLACES[section];
  const Placeslength=curSECTION.length;
    return(
      <Container>
      <Row md={6} sm={6}>
      {curSECTION.map((product, index) => (
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
          <span className="CenturyGothicCommon">go <b>back</b> to the countries</span>
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
      section:"Зошити",
      product:"none"
    };
  }
//Country button handler function:
handleClick(productName) {
    this.setState({
      product:productName,
      showProduct:true,
    });
  }
//"to back" button handler function:
handleBackClick(){
  this.setState({
    showProduct:!this.state.showProduct,
  });
}
//function that returns <Countries/> tag(component):
renderProducts(){
  return(
    <Section key={0} section={this.state.section} onClick={(i) => this.handleClick(i)} />
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
        
      {this.state.showProduct ? this.renderProduct() : this.renderProducts()}

      </div>
    );
  }
}

//module.exports = App;
 export default App;
