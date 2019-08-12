// import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//less (newest analogue of css):
/*-->*/
import './Appless.css';
/*<--*/
// addProductButton.css
import './css/addProductButton.css';
// product.css
import './css/product.css';
// info.css
import './css/info.css';
// editProduct.css
import './css/editProduct.css'

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Navbar, NavItem, Nav, Container, Row, Col } from "react-bootstrap";
import { Script } from 'vm';
import { returnStatement } from '@babel/types';

const PRODUCTS={};

var loadScript = function (src) {
  var tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(tag);
}

//component of single product:
class CustomerInfo extends Component{
  constructor(props) {
    super(props);
    this.state = {SelectOption: '1'};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({SelectOption: event.target.value});
  }

  componentDidMount() {
    loadScript('js/info.js');
    // loadScript('js/uploadImg.js');
  }
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
          <select value={this.state.SelectOption} onChange={this.handleChange}>
            <option value="0">Спосіб оплати</option>
            <option value="1">Накладений платіж</option>
            <option value="2">на картку ПриватБанку</option>
          </select>
        </div>
      </div>
      <div className="infoBlock">
      <h6><b>Доставка</b></h6>

      <label>Спосіб доставки:</label>

      <div className="custom-select">
      <select value={this.state.SelectOption} onChange={this.handleChange}>
        <option value="0">Спосіб доставки</option>
        <option value="1">Новою Поштою</option>
        <option value="2">Самовивіз</option>
      </select>
    </div>
    <label for="tnumber">Адреса доставки:</label>
    <input type="text" id="tnumber" name="tnumber" placeholder="наприклад: м. Київ, вул. Хрещатик, буд. 15"/>
    </div>

    <button className="BackButton w3-teal button_dynamic button_back">
    <span><b>ЗАМОВИТИ</b></span>
  </button>
      </div>     
    );
  }
}


//component of single product:
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

//component of single product:
class AProduct extends Component{
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     admin_state:false,
  //   };
  // }
clickHandler(params){
  if(params=="0"){
    var myModal = document.getElementsByClassName("editProductModal")[0];
    myModal.classList.toggle("show-modal");
  }
  
this.props.onClick(params);

  }
  renderAdminModeTrue(){ 
    return(
      <React.Fragment>
        <i className="fa fa-trash deleteItem" aria-hidden="true"></i>
        <i className="fa fa-cog editItem" aria-hidden="true" onClick={()=>this.clickHandler('0')}></i>
      </React.Fragment>
    )
    
  } 
  renderAdminModeFalse(){
    return(
      <React.Fragment>
        <i className="fa fa-trash deleteItem displayNone" aria-hidden="true"></i>
        <i className="fa fa-cog editItem displayNone" aria-hidden="true" onClick={()=>this.clickHandler('0')}></i>
      </React.Fragment>
    )
  } 
// componentDidMount(){
// this.setState({
//   admin_state : window.admin_state
// })
// }
  render(){
    return(
      <div className="aProduct">
      <img className="WebCamVideo" src={this.props.src} frameBorder="0" onClick={()=>this.clickHandler('1')}></img>
      {window.admin_state?this.renderAdminModeTrue():this.renderAdminModeFalse()}
      <span className="productName">{this.props.name}</span>
      <br/>
      <span>{this.props.price}</span>  
      </div>
    );
  }
}
class AddProduct extends Component {
  renderAdminModeTrue(){ 
    return(
      <div class="addButtonApp WebCamVideo" title="Додати новий товар"><i id="addProductButton" class="fa fa-plus "></i></div>
    )
    
  } 
  renderAdminModeFalse(){
    return(
      <div class="addButtonApp WebCamVideo displayNone" title="Додати новий товар"><i id="addProductButton" class="fa fa-plus "></i></div>
    )
  } 
  render(){
    return(
      <div>
      {window.admin_state?this.renderAdminModeTrue():this.renderAdminModeFalse()}
      </div>
    );
  }
}

//component of several Aproduct components:
class Category extends Component{
  clickHandler(product, params){
    this.props.onClick(product, params)
  }
  render(){
  const category=this.props.category;
  PRODUCTS[category] = window.products;
  const curCATEGORY=PRODUCTS[category];
  
    return(
      <Container>
      <Row md={6} sm={6}>
      {curCATEGORY.map((product, index) => (
      <Col key={index} md={4} sm={6}>     
          <AProduct className="Wrapper" src={product.src} name={product.name} price={product.price} onClick={(isEdit)=>this.clickHandler(product, isEdit)} />
      </Col>
  ))
}
      <Col>
        <AddProduct/>
      </Col>
      </Row>
      </Container>
);
  }
}

//components of back button :
class BackButton extends Component{
  render(){
    return(
      <div>
        <button className="BackButton w3-teal button_dynamic button_back" onClick={()=>this.props.onClick()}>
          {this.props.fromProduct ? <span><b>назад</b> до каталогу</span> : <span><b>назад</b> до  товару</span>}
        </button>
      </div>
    );
  }
}
// edit Product content component
class EditProductContent extends Component{
previewFile(){
    var preview = document.querySelector('#timage'); //selects the query named img
    var file    = document.querySelector('#timageFile').files[0]; //sames as here
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}
  render(){
    return(
      <div className="addCategoryHtml">
      <h6><b>Змінити товар</b></h6>
        <div className="infoBlock">
      
        <label htmlFor="fname">назва товару:</label>
        <input type="text" id="fname" name="fname" placeholder="Введіть назву товару..."/>

        <label htmlFor="tprice">ціна товару:</label>
        <input type="text" id="tprice" name="tprice" placeholder="Введіть ціну товару..."/>
        </div>

        <div className="infoBlock imageContainer">

        <label class='timageButton button button2' htmlFor='timageFile'>вибрати зображення</label>
        <input type="file" id='timageFile' onChange={()=>this.previewFile()}/>
        <img src={this.props.product.src} id="timage" height="200" alt="тут має бути картинка..."/>
        
        </div>


        <div class="infoBlock">
          опис товару:
          <input type="text" id="tsummery" name="tnumber" placeholder='Введіть опис товару...'/>
        </div>
          <button className="BackButton w3-teal button_dynamic button_back">
            <span><b>Зберегти</b></span>
          </button>
      </div>
    );
  }
}
// edit product modal
class EditProductModal extends Component {

  onCloseModal(){
    var myModal = document.getElementsByClassName("editProductModal")[0];
    myModal.classList.toggle("show-modal");
  }
  render() {
    return (
      <div className={"editProductModal my-modal"}>
        <span className="close-button" onClick={()=>this.onCloseModal()}>&times;</span>
        <div className="my-modal-content">
        <EditProductContent product={this.props.product}/>
        </div>
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
handleClick(product, params) {
    if (params == '0'|| params=='1') {
      this.setState({
        product: product,
        showParam: params,
      });
      window.switch_caregory = false;
    }
}
//when user click in <Product/>
handleProductClick(isOrder){
  if(isOrder){
  this.setState({
    showParam:'2',
  });
}
window.switch_caregory=false;
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

//function that returns <Category/> tag(component):
renderCategory(){
  return(
    <Category category={window.category} onClick={(product, isEdit) => this.handleClick(product, isEdit)} />
    );
}
//function that returns <BackButton/> and <Product/> tag(component):
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
// function that switch rendering
renderSwitch(param){
  switch(param) {
    case '0':
      return this.renderCategory();
    case '1':
       return window.switch_caregory? this.renderCategory() : this.renderProduct();
    case '2':
      return window.switch_caregory? this.renderCategory() : this.renderInfo();
    default:
      return this.renderCategory();
  }
}
  //////////
  render() {
    return (
      <div className="App">
      {this.renderSwitch(this.state.showParam)}
      <EditProductModal product={this.state.product}/>
      </div>
    );
  }
}



 export default App;
