import React, { Component } from 'react';

import './css/main_App.css';
import './css/addDeleteItem.css';
import './css/product.css';
import './css/editProduct.css'
import './css/cart.css'
import './css/info.css'

import "bootstrap/dist/css/bootstrap.css"; //подключаем только грид
import { Container, Row, Col } from "react-bootstrap";

import { updateProductToServer } from './products.js';
import { addProductToServer } from './products.js';
import { deleteProructFromServer } from './products.js';
import { addСheckoutCustumerToServer } from './cart.js';
import { addСheckoutProductsToServer } from './cart.js';
import { startPicture } from './modal.js';

import Select from 'react-select'; //выпадающий список

import DashBoard from './dashboard';

const PRODUCTS={};

// component for selected product's quantity in cart:
class Quantity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {quantity: this.props.quantity}
  }

  updateQuantity = ( ) => {
    window.total_quantity = 0.0;
    for (let i = 0; i < window.items.length; i++) { 
      window.total_quantity = window.total_quantity + window.items[i].quantity*1.0;
     };
    this.setState({
      total_quantity : window.total_quantity
    });
  };

  handleQuantityChange = async (e) => {
    const userInput = e.target.value;
    await this.setState({quantity: userInput});
    this.updateQuantity();
    this.props.quantityCallBack(this.state.quantity);
  }

  render(){
    return(
      <td>
        <input
          name="number"
          type="number"
          value={this.props.quantity}
          onChange={this.handleQuantityChange}
          max="10"
          min="1"/>
      </td>
    )
  }
}

//component that handles the display of each individual product in cart
class Display extends React.Component{
  //will update quantity in this component, then send values to parent (ProductDisplay) component
  
  //get changedQuantity from child (Quantity), then send it to parent (ProductDisplay) component
  quantityCallBack = (changedQuantity) => {
    this.props.item.quantity = changedQuantity;
    this.props.item.total = this.props.item.out_price*changedQuantity;
    this.props.productUpdate(this.props.item.quantity, this.props.item.total, this.props.index);//send changedQuantity to parent (ProductDisplay) component
  }
  //render individual item
  render() {
      return (
          <div key={this.props.index} className="CartItem">
              <figure>
                  <img className='img'src={this.props.item.src} alt={this.props.item.name} id={this.props.index} />
                  <figcaption onClick = {()=>this.props.removeItem(this.props.index)}><i class="fa fa-trash-o" ></i></figcaption>
              </figure>
              <form>
                  <table className="ContentInformation"><tbody>
                      <tr>
                          <td><b>Кількість:</b></td>
                          <Quantity quantityCallBack={this.quantityCallBack} quantity={this.props.item.quantity} />
                      </tr>
                      <tr>
                          <td><b>Ціна:</b></td>
                          <td>{this.props.item.out_price}&nbsp;грн.</td>
                      </tr>
                      <tr>
                          <td><b>Сума:</b></td>
                          <td>{this.props.item.total}&nbsp;грн.</td>
                      </tr>
                      </tbody></table>
              </form>
              <br></br>
          </div>
      )
  }
}

//A component to display all the cart items the user selected and allow them to change quantity
class ProductDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items:window.items
    };
  }

  //update products upon change quantity.
  productUpdate = (quantity, total, index) => {  
    window.total_quantity = 0.0;
    window.items[index].quantity = quantity;
    window.items[index].total = total;
    for (let i = 0; i < window.items.length; i++) { 
      window.total_quantity = window.total_quantity + window.items[i].quantity*1.0;
    };
    this.props.updateTotalQuantity(window.total_quantity);//send total_quantity to parent (Cart) component
  }

  // remove selectsd item (by index) from items)
  removeItem = (index) => {
    var array = this.state.items.slice();// make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1);
      window.items = [];
      window.items = array.slice();// copy array to window.items
    }
    this.setState({items: array});
    window.total_quantity = 0.0;
    for (let i = 0; i < window.items.length; i++) { 
      window.total_quantity = window.total_quantity + window.items[i].quantity*1.0;
    };
    this.props.updateTotalQuantity(window.total_quantity);//send canged total_quantity to parent (Cart) component
  }

  render() {
      return (
        <div className="cartList">
            {this.state.items.map((currItem, index)=> 
              <Display item={currItem} index={index} key={index} productUpdate={this.productUpdate} removeItem={this.removeItem}/>
            )}
        </div>
      )
  }
}

//component of Cart:
class Cart extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
      selected_delivery_options: {label:window.selected_delivery},
      selected_pay_options: {label:window.selected_pay},
      selected_name: window.selected_name,
      selected_phone: window.selected_phone,
      selected_address: window.selected_address
    };
    
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
  }

  clickHandlerCheckout(){
    window.checkout_customer = {};
    window.checkout_customer = {
      customer_name : window.selected_name,
      customer_phone : window.selected_phone,
      customer_address : window.selected_address,
      customer_delivery : window.selected_delivery,
      customer_pay : window.selected_pay
    };
    window.checkout_products = {};
    window.checkout_products = {
      customer_phone : window.selected_phone,
      customer_products : window.items
    };
    if (window.selected_name===undefined || window.selected_phone===undefined ||window.selected_address===undefined 
      || window.selected_delivery===undefined || window.selected_pay===undefined) {Warning();} 
      else{
        addСheckoutCustumerToServer(window.checkout_customer);
        addСheckoutProductsToServer(window.checkout_products);
      };
  }

  handleChangeDelivery = selected_delivery_options => {
    this.setState({ selected_delivery_options });
    window.selected_delivery = selected_delivery_options.label;
  };

  handleChangePay = selected_pay_options => {
    this.setState({ selected_pay_options });
    window.selected_pay = selected_pay_options.label;
    console.log(`selected_pay_options:`, window.selected_pay);
  };

  handleChangeName(event) {
    this.setState({selected_name: event.target.value});
    // console.log(`selected_name:`, event.target.value);
    window.selected_name = event.target.value;
  }

  handleChangePhone(event) {
    this.setState({selected_phone: event.target.value});
    // console.log(`selected_phone:`, event.target.value);
    window.selected_phone = event.target.value;
  }

  handleChangeAddress(event) {
    this.setState({selected_address: event.target.value});
    // console.log(`selected_address:`, event.target.value);
    window.selected_address = event.target.value;
  }

  updateTotalQuantity=(changed_total_quantity) => {
    this.props.updateTotalQuantity(changed_total_quantity);//send changed_total_quantity to parent (App) component
  }

  render(){
    // values for delivery select tag:
    const delivery_options = [
      { value: 'self', label: 'Самовивіз' },
      { value: 'delivery', label: 'Доставка Новою поштою' }
    ];
    const { selected_delivery_options } = this.state;

    // values for pay select tag:
    const pay_options = [
      { value: 'cash', label: 'Накладений платіж' },
      { value: 'cashless', label: 'На картку ПриватБанку' }
    ];
    const { selected_pay_options } = this.state;
    
    return(
    <div className="customerInfo">
      <div className="infoBlock">
        <div className="selectedProducts">
          <h6><b>Обрані товари</b></h6>
        </div>

        <br></br>
        {/* create a component to display the shopping cart items */}
        <ProductDisplay items={this.state.items} updateTotalQuantity={(changed_total_quantity) => this.updateTotalQuantity(changed_total_quantity)}/>
        <br></br>

        <h6><b>Контактні дані</b></h6>
     
        <label for="fname">Ваше ім'я:</label>
        <input type="text" id="fname" name="fname" placeholder="Введіть Ваше ім'я..." value={this.state.selected_name} onChange={this.handleChangeName}/>
        <label for="tnumber">Контактний телефон:</label>
        <input type="text" id="tnumber" name="tnumber" placeholder="0 ** *** ** **" value={this.state.selected_phone} onChange={this.handleChangePhone}/>
      </div>

      <div className="infoBlock">
        <h6><b>Спосіб оплати</b></h6>
        <div className="custom-select">
          <Select options = {pay_options} value={selected_pay_options} onChange={this.handleChangePay}/>
        </div>
      </div>

      <div className="infoBlock">
        <h6><b>Доставка</b></h6>
        <label>Спосіб доставки:</label>
        <div className="custom-select">
          <Select options = {delivery_options} value={selected_delivery_options} onChange={this.handleChangeDelivery}/> 
        </div>
        <label for="tnumber">Адреса доставки:</label>
        <input type="text" id="tnumber" name="tnumber" placeholder="наприклад: м. Київ, вул. Хрещатик, буд. 15" value={this.state.selected_address} onChange={this.handleChangeAddress}/>
      </div>

    <button className="BackButton w3-teal button_dynamic button_back" onClick={()=>this.clickHandlerCheckout()}>
      <span><b>ЗАМОВИТИ</b></span>
    </button>
  </div> 
    );
  }
}

//component of product description (add to cart):
class Product extends Component{
  renderAdminModeTrue(inp,outp){ 
    return(
      <span>{inp.replace("₴","")} грн./{outp.replace("₴","")} грн.</span>
    )
  } 
  renderAdminModeFalse(inp){
    return(
      <span>{inp.replace("₴","")} грн</span>
    )
  } 
  render(){
    let in_pr=this.props.product.in_price || ''; //to avoid the bug with in_price is undefined 
    let out_pr=this.props.product.out_price || ''; //to avoid the bug with out_price is undefined
    window.selected_product = this.props.product; //selected product to add into cart
    return(
      <div className="product">
        <Container>
          <Row> 
            <Col key={0} md={8} sm={12}>     
              <img src={this.props.product.src} alt="тут має бути картинка..." frameBorder="0" onClick={this.props.onClick}></img>
            </Col>
            <Col key={1} md={4} sm={12}> 
              <div className="productMain">   
                <span className="productName">{this.props.product.name}</span>
                {window.admin_state?this.renderAdminModeTrue(in_pr,out_pr):this.renderAdminModeFalse(in_pr)}
                <button className="button button2" onClick={() => this.props.onClick(true)}><i class="fa fa-shopping-cart"></i>&nbsp;Додати в корзину</button>
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

//component of single product's container:
class SProduct extends Component{
  clickHandler(params){
    if(params==="0"){
      var myModal = document.getElementsByClassName("editProductModal")[0];
      myModal.classList.toggle("show-modal");
      window.selected_product_name = this.props.name;
      }
    this.props.onClick(params);
  }

  deleteHandler(params){
    if(params==="0"){
    window.selected_product_name = this.props.name;
    deleteProructFromServer(window.selected_product_name);
    }
    this.props.onClick(params);
  }

  renderAdminModeTrue(){ 
    return(
      <React.Fragment>
        <i className="fa fa-trash deleteItem" aria-hidden="true" onClick={()=>this.deleteHandler('0')}></i>
        <i className="fa fa-cog editItem" aria-hidden="true" onClick={()=>this.clickHandler('0')}></i>
        <span className="productName">{this.props.name}</span>
      <br/>
      <span>{this.props.in_price}&nbsp;грн./{this.props.out_price}&nbsp;грн.</span>  
      </React.Fragment>
    )
    
  } 
  renderAdminModeFalse(){
    return(
      <React.Fragment>
        <i className="fa fa-trash deleteItem displayNone" aria-hidden="true" onClick={()=>this.deleteHandler('0')}></i>
        <i className="fa fa-cog editItem displayNone" aria-hidden="true" onClick={()=>this.clickHandler('0')}></i>
        <span className="productName">{this.props.name}</span>
      <br/>
      <span>{this.props.out_price}&nbsp;грн.</span>  
      </React.Fragment>
    )
  } 
  render(){
    return(
      <div className="sProduct">
        <img className="productImage" src={this.props.src} alt="тут має бути картинка..." frameBorder="0" onClick={()=>this.clickHandler('1')}></img>
        {window.admin_state?this.renderAdminModeTrue():this.renderAdminModeFalse()}
      </div>
    );
  }
}



//component of product's container:
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
        <SProduct className="Wrapper" src={product.src} name={product.name} in_price={product.in_price} out_price={product.out_price} onClick={(isEnter)=>this.clickHandler(product, isEnter)} />
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
class BackButton extends Component {
  clickHandler() {
    this.props.onClick();
  }
  render(){
    return(
      <div className="backButtonContainer">
        <button className="BackButton w3-teal button_dynamic button_back" onClick={()=>this.clickHandler()}>
          {this.props.fromProduct ? <span><b>назад</b> до каталогу</span> : <span><b>назад</b> до  товару</span>}
        </button>
      </div>
    );
  }
}

//components of category title and cart symbol :
class CategoryTitleAndCart extends Component {
  // constructor(props) {
  //   super(props)
  // }
  renderAdminModeTrue(cat_tit){ 
    return(
      <b>  {cat_tit}  </b>
    )
  } 
  renderAdminModeFalse(cat_tit){
    return(
      <div>
        <b> {cat_tit} </b><div className="cd-cart" id="cart" onClick={()=>this.props.onClick(true)}><span class="cart_counter">{this.props.total_quantity}</span></div>
      </div>
    )
  } 
  render(){
    return(
      <div>
        <h4 className="productsCategoryTitle">
        {window.admin_state?this.renderAdminModeTrue(this.props.category_title):this.renderAdminModeFalse(this.props.category_title)}
        </h4>
      </div>
    );
  }
}
// function that do DialogWorning component visible
const Warning = () => {
  var myModal = document.getElementsByClassName("warningModal")[0];
    myModal.classList.toggle("show-modal");
}

// component for warning about unfilled checkout form 
const DialogWarning = () => {
  function onCloseModal(){
    var myModal = document.getElementsByClassName("warningModal")[0];
    myModal.classList.toggle("show-modal");
  }
    return (
      <div className="warningModal my-modal">
        <a href="#" className="w3-hide-large w3-right w3-jumbo w3-padding w3-hover" title="close menu">
          <i className="fa fa-remove close-button"  onClick={()=>onCloseModal()}></i>
        </a>
        <div className="modal-warning-content">
          <h4  className="modal-warning-text"><b>Будь ласка, заповніть всі поля форми!</b></h4>
        </div>
      </div>
    );
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

readValues(){
  var CurrentCategory = window.category;
  var ProductName = window.selected_product_name;
  var ProductInPrice =document.getElementById("fproduct_in_price").value;
  var ProductOutPrice =document.getElementById("fproduct_out_price").value;
  var ProductPhoto = document.querySelector('#timage').getAttribute("src");
  var ProductAbout =document.getElementById("tsummery").value;
  
  updateProductToServer(CurrentCategory, ProductName, ProductInPrice, ProductOutPrice, ProductPhoto, ProductAbout);
}

  render(){
    return(
      <div className="addCategoryHtml">
      <h6><b>Змінити товар</b></h6>
        <div className="infoBlock">
          <label htmlFor="fproduct_in_price">вхідна ціна товару:</label>
          <input type="text" id="fproduct_in_price" name="fproduct_in_price" placeholder="Введіть вхідну ціну товару..."/>
        
          <label htmlFor="fproduct_out_price">вихідна ціна товару:</label>
          <input type="text" id="fproduct_out_price" name="fproduct_out_price" placeholder="Введіть вихідну ціну товару..."/>
        </div>

        <div className="infoBlock imageContainer">
          <label className='timageButton button button2' htmlFor='timageFile'>вибрати зображення</label>
          <input type="file" id='timageFile' onChange={()=>this.previewFile()}/>
          <img src={this.props.product.src} id="timage" height="200" alt="тут має бути картинка..."/>
        </div>


        <div className="infoBlock">
          опис товару:
          <input type="text" id="tsummery" name="tnumber" placeholder='Введіть опис товару...'/>
        </div>
          <button className="BackButton w3-teal button_dynamic button_back" onClick={()=>this.readValues()}>
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
    document.getElementsByClassName('.addCategoryModal .my-modal-content').innerHTML = "";
  }
  render() {
    return (
      <div className="editProductModal my-modal">
        <a href="#" className="w3-hide-large w3-right w3-jumbo w3-padding w3-hover" title="close menu">
          <i className="fa fa-remove close-button"  onClick={()=>this.onCloseModal()}></i>
        </a>
        <div className="my-modal-content">
          <EditProductContent product={this.props.product}/>
        </div>
      </div>
    );
  }
}

// component for adding product button:
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_show: false,
    };
  }
  clickHandler(){
    this.setState({modal_show: true});
    if (document.getElementsByClassName("addProductModal")[0]!==undefined){
      var myModal = document.getElementsByClassName("addProductModal")[0];
      myModal.classList.toggle("show-modal");
    }
  }
  renderModal(){ 
    return(
      <div>
        <AddProductModal/>
      </div>
    )
  } 
  renderAdminModeTrue(){ 
    return(
      <div className="addButtonApp productImage" onClick={()=>this.clickHandler()} title="Додати новий товар"><i id="addProductButton" className="fa fa-plus "></i></div>
    )
  } 
  renderAdminModeFalse(){
    return(
      <div className="addButtonApp productImage displayNone" title="Додати новий товар"><i id="addProductButton" className="fa fa-plus "></i></div>
    )
  } 
  render(){
    return(
      <div>
      {window.admin_state?this.renderAdminModeTrue():this.renderAdminModeFalse()}
      {this.state.modal_show?this.renderModal():''}
      </div>
    );
  }
}

// add Product content component
class AddProductContent extends Component{
  
  previewFile(){
    var preview = document.querySelector('#aimage'); //selects the query named img
    var file    = document.querySelector('#aimageFile').files[0]; //sames as here
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

readValues(){
  var CurrentCategory = window.category;
  var ProductName = document.getElementById("aproduct_name").value;
  var ProductInPrice = document.getElementById("aproduct_in_price").value;
  var ProductOutPrice = document.getElementById("aproduct_out_price").value;
  var ProductPhoto = document.querySelector('#aimage').getAttribute("src");
  var ProductAbout = document.getElementById("asummery").value;
  
  addProductToServer(CurrentCategory, ProductName, ProductInPrice, ProductOutPrice, ProductPhoto, ProductAbout);
  
}
  render(){
    var start_img_src = startPicture(); //start image
    return(
      <div className="addCategoryHtml">
      <h6><b>Додати товар</b></h6>
        <div className="infoBlock">
          <label htmlFor="aproduct_name">назва товару:</label>
          <input type="text" id="aproduct_name" name="aproduct_name" placeholder="Введіть назву товару..."/>

          <label htmlFor="aproduct_in_price">вхідна ціна товару:</label>
          <input type="text" id="aproduct_in_price" name="aproduct_in_price" placeholder="Введіть вхідну ціну товару..."/>
        
          <label htmlFor="aproduct_out_price">вихідна ціна товару:</label>
          <input type="text" id="aproduct_out_price" name="aproduct_out_price" placeholder="Введіть вихідну ціну товару..."/>
        </div>
        <div className="infoBlock imageContainer">
          <label className='aimageButton button button2' htmlFor='aimageFile'>вибрати зображення</label>
          <input type="file" id='aimageFile' onChange={()=>this.previewFile()}/>
          <img src={start_img_src} id="aimage" height="200" alt="тут має бути картинка..."/>
        </div>
        <div className="infoBlock">
          опис товару:
          <input type="text" id="asummery" name="anumber" placeholder='Введіть опис товару...'/>
        </div>
          <button className="BackButton w3-teal button_dynamic button_back" onClick={()=>this.readValues()}>
            <span><b>Зберегти</b></span>
          </button>
      </div>
    );
  }
}

// add product modal
class AddProductModal extends Component {
  onCloseModal(){
    // window.add_product_show = false;
    var myModal = document.getElementsByClassName("addProductModal")[0];
    myModal.classList.toggle("show-modal");
    document.getElementsByClassName('.addCategoryModal .my-modal-content').innerHTML = "";
  }
  render() {
    return (
      <div className="addProductModal my-modal show-modal"> 
        <a href="#" className="w3-hide-large w3-right w3-jumbo w3-padding w3-hover" title="close menu">
          <i className="fa fa-remove close-button"  onClick={()=>this.onCloseModal()}></i>
        </a>
      <div className="my-modal-content">
        <AddProductContent/>
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
      total_quantity : 0,
      showParam:'0',
      product:"none",
    };

  }

  updateQuantity = ( ) => {
    window.total_quantity = 0.0;
    for (let i = 0; i < window.items.length; i++) { 
      window.total_quantity = window.total_quantity + window.items[i].quantity*1.0;
     };
    this.setState({
      total_quantity : window.total_quantity
    });
  };
  
  updateTotalQuantity = (changed_total_quantity) => {
    this.setState({
      total_quantity : changed_total_quantity
    });
  };
  
//Product button handler function:
handleClick(product, params) {
  if (params === '0'|| params==='1') {
    this.setState({
      product: product,
      showParam: params,
    });
    window.switch_caregory = false;
  }
}
//when user click add to cart button in <Product/>
handleProductClick(isOrder){
  //function for adding selected product into cart items array:
  function item_for_cart_items(product) {
    if (product===undefined){ //when cart is empty this value is undefined
      var item = { name : "", in_price : "", out_price : "", src : "", quantity : 0, total : 0 };
    }else{
      var item = { name : product.name, in_price : product.in_price, out_price : product.out_price,
         src : product.src, quantity : 1, total : product.out_price };
    } 
    return item;
  }

  if(isOrder){
    var item = item_for_cart_items(this.state.product);
    if (window.items===undefined) window.items=[];
    window.items.push(item);

  this.updateQuantity();
    
  this.setState({
    showParam:'2',
  });
}
window.switch_caregory=false;
} 

handleCartClick(isCart){
  if(isCart){
  this.setState({
    showParam:'2',
  });
}
window.switch_caregory=false;
} 

//"to back" button handler function:
handleBackClick(backParam){
 
  if(backParam==="fromProduct"){
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
    <Category category={window.category} onClick={(product, isEnter) => this.handleClick(product, isEnter)} />
    );
}
//function that returns <BackButton/> and <Product/> tag (component):
renderProduct(){
let products=[];
  products.push(<BackButton key={2} fromProduct={true}  onClick={() => this.handleBackClick("fromProduct")} />);
  products.push(<Product key={3} product={this.state.product} onClick={(isOrder) => this.handleProductClick(isOrder)} />);
  return products;
}
// function that returns <Cart/> tag ( cart component):
renderCart(){
  let products=[];
  products.push(<BackButton key={1} fromProduct={false} onClick={() => this.handleBackClick("fromInfo")} />);
  products.push(<Cart product={this.state.product}  updateTotalQuantity={(changed_total_quantity) => this.updateTotalQuantity(changed_total_quantity)}/>);
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
      return window.switch_caregory? this.renderCategory() : this.renderCart();
    default:
      return this.renderCategory();
  }
}

renderDashBoard(){
  return(
    <DashBoard dashboard_show = {window.dashboard_show}/>
  );
}
  ////////////////////////////////////////////
  render() {
    if(window.isAppRender===true && window.dashboard_show===true){
      return (
        <div className="App">      
          <CategoryTitleAndCart total_quantity={this.state.total_quantity} category_title={this.state.showParam==='2' && window.switch_caregory === false ? 'Ваш кошик' : window.category} onClick={(isCart) => this.handleCartClick(isCart)}/>
          {this.renderSwitch(this.state.showParam)}
          <EditProductModal product={this.state.product}/>
          <DialogWarning/>
          <DashBoard dashboard_show = {window.dashboard_show}/>
        </div>
      );
    }else if(window.isAppRender===true && (window.dashboard_show === false || window.dashboard_show === undefined) ){
      return(
        <div className="App">      
          <CategoryTitleAndCart total_quantity={this.state.total_quantity} category_title={this.state.showParam==='2' && window.switch_caregory === false ? 'Ваш кошик' : window.category} onClick={(isCart) => this.handleCartClick(isCart)}/>
          {this.renderSwitch(this.state.showParam)}
          <EditProductModal product={this.state.product}/>
          <DialogWarning/>
        </div>
      );
    }else if(window.isAppRender===false && window.dashboard_show === true){
      return(
        <div className="App"> 
        <DashBoard dashboard_show = {window.dashboard_show}/>
      </div>
      );
    }else{
      return(null);
    }
  }
}

 export default App;
 