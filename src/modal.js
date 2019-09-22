/* this file is about modal window
it is used in many purposes */

import $ from 'jquery';
import { addCategoryToServer } from './categories.js';
import { addProductToServer } from './products.js';


// modal for categories : >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export var categorymodalHtml = '<div class="addCategoryHtml">'+
'<div class="infoBlock">'+
'<h6><b>Додати Категорію</b></h6>'+

'<label for="fid">id категорії:</label>'+
'<input type="text" id="fid" name="fname" placeholder="Введіть id категорії"/>'+
'<label for="fname">назва категорії:</label>'+
'<input type="text" id="fname" name="fname" placeholder="Введіть назву категорії"/>'+
'<label for="tcode">Вставте Unicode-шифр fa fa-icon_name-а:</label>'+
'<input type="text" id="tcode" name="tnumber" placeholder="Unicode-шифр fa fa-icon-а"/>'+
'</div>'+
'<button class="BackButton w3-teal button_dynamic button_back">'+
'<span><b>Створити</b></span>'+
  '</button>'+
'</div>';

// draw modal in mainpage for categories
export function drawModal(modalHtml){
    $('.addCategoryModal .my-modal-content').html( modalHtml);
  // show modal
    $(".addCategoryModal").toggleClass("show-modal");
}
$('.addCategoryModal .close-button').click(function(){
    $(".addCategoryModal").toggleClass("show-modal");
})

// .addCategoryModal onClick
$('.addCategoryModal').click(function (event) {
  if ($(event.target).is('button') || $(event.target).is('button span') || $(event.target).is('button span b')) {

    var infoBlock = $(event.target).closest('div');

    var categId = $(infoBlock).find('#fid').val();
    var categName = $(infoBlock).find('#fname').val();
    var categCode = $(infoBlock).find('#tcode').val();

    if ((categId != '') && (categName != '') && (categCode != '') && (categId != undefined) && (categName != undefined) && (categCode != undefined))
      addCategoryToServer(categName, categCode, categId)
  }
})
// modal for categories <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// draw modal in mainpage for products>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export function drawModalProduct() {
var button_access = true; //for depreciation of hidden .addCategoryModal onclick handlers!!!
var modalHtml = '<div class="addCategoryHtml">'+
'<div class="infoBlock">'+
'<h6><b>Додати товар</b></h6>'+

'<label for="fname">Назва товару:</label>'+
'<input type="text" id="fname" name="fname" placeholder="Введіть назву товару"/>'+
'<label for="fin_price">вхідна ціна:</label>'+
'<input type="text" id="fin_price" name="fin_price" placeholder="Введіть вхідну ціну товару"/>'+
'<label for="fout_price">вихідна ціна:</label>'+
'<input type="text" id="fout_price" name="fout_price" placeholder="Введіть вихідну ціну товару"/>'+
'<label for="faddress">Вставте посилання на малюнок:</label>'+
'<input type="text" id="faddress" name="faddress" placeholder="images/назва_категорії/назва_фото.png"/>'+
'<label for="fabout">Вставте опис товару:</label>'+
'<input type="text" id="fabout" name="fabout" placeholder="опис товару"/>'+
'</div>'+
'<button class="BackButton w3-teal button_dynamic button_back">'+
'<span><b>Додати</b></span>'+
  '</button>'+
'</div>';

// load modalHtml into modal div
$('.addCategoryModal .my-modal-content').html(modalHtml);

// show modal
$(".addCategoryModal").toggleClass("show-modal");

// .addCategoryModal onClick
$('.addCategoryModal').click(function (event) {
  if ($(event.target).is('button') || $(event.target).is('button span') || $(event.target).is('button span b')) {

    var infoBlock = $(event.target).closest('div');

    var CurrentCategory = window.category;
    var ProductName = $(infoBlock).find('#fname').val();
    var ProductInPrice = $(infoBlock).find('#fin_price').val();
    var ProductOutPrice = $(infoBlock).find('#fout_price').val();
    var ProductPhoto = $(infoBlock).find('#faddress').val();
    var ProductAbout = $(infoBlock).find('#fabout').val();

    if ((button_access != false) && (ProductName != '') && (ProductInPrice != '') && (ProductOutPrice != '') && (ProductPhoto != '') && (ProductName != undefined) && (ProductInPrice != undefined) && (ProductOutPrice != undefined) && (ProductPhoto != undefined)){
      addProductToServer(CurrentCategory, ProductName, ProductInPrice, ProductOutPrice, ProductPhoto, ProductAbout);
      button_access = false;
    }
    
  }
})
}
