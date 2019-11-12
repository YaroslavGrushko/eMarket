
import $ from 'jquery';
import { addCategoryToServer } from './categories.js';
import { editCategoryOnServer } from './categories.js';

var start_img_src = startPicture(); //start image

function previewFile(){
  var preview = document.querySelector('#fmanagerPhoto'); //selects the query named img
  var file    = document.querySelector('#mimageFile').files[0]; //sames as here
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

// modal for add categories : >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export var categorymodalHtml = '<div class="addCategoryHtml">'+
'<div class="infoBlock">'+
'<h6><b>Додати Категорію</b></h6>'+

'<label for="fid">id категорії:</label>'+
'<input type="text" id="fid" name="fname" placeholder="введіть id категорії"/>'+

'<label for="fname">опис категорії:</label>'+
'<input type="text" id="fname" name="fname" placeholder="введіть опис категорії"/>'+

'<label for="tcode"> Unicode-шифр fa fa-icon_name-а:</label>'+
'<input type="text" id="tcode" name="tnumber" placeholder="вставте Unicode-шифр fa fa-icon-а"/>'+
'</div>'+

'<div class="infoBlock imageContainer">'+

'<label htmlFor="fproduct_in_price">фамілія та ініціали менеджера:</label>'+
'<input type="text" id="fmanagerName" name="fproduct_in_price" placeholder="введіть фамілію та ініціали менеджера..."/><br></br>'+

'<label class="mimageButton button button2" for="mimageFile">виберіть фото менеджера</label>'+
'<input type="file"  id="mimageFile" />'+
'<img src='+start_img_src+' id="fmanagerPhoto" height="200" alt="тут має бути фото..."/>'+
'</div>'+
'<div class="warningModal">'+
'</div>'+
'<button class="BackButton w3-teal button_dynamic button_back">'+
'<span><b>Додати</b></span>'+
  '</button>'+
'</div>';

var category_unfill_modal = 
  '<h4  class="category_warning"><b>Будь ласка, заповніть всі поля форми!</b></h4>';

function drawWarning(modalWorn){
  $('.warningModal').html( modalWorn);
  // show modal
    $(".warningModal").toggleClass("show-modal");
}

// draw modal in mainpage for categories
export function drawModal(modalHtml){
    $('.addCategoryModal .my-modal-content').html( modalHtml);
  // show modal
    $(".addCategoryModal").toggleClass("show-modal");
    $( "#mimageFile" ).change(function() {
      previewFile();
    });
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
    var managerName = $(infoBlock).find('#fmanagerName').val();
    var managerPhoto = document.querySelector('#fmanagerPhoto').getAttribute("src");
   
    if ((categId === '') || (categName === '') || (categCode === '') || (categId === undefined) || (categName === undefined) || (categCode === undefined) || (managerName === undefined) || (managerName === '') || (managerPhoto === undefined) || (managerPhoto === '')){
      drawWarning(category_unfill_modal);
    }else{
      addCategoryToServer(categId, categName, categCode, managerName, managerPhoto);
    }
     
  }
})

// modal for add categories <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// modal for edit of categories : >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export function categoryEditmodalHtml(categId, categName, categCode, name, photo){
  var EditmodalHtml = '<div class="addCategoryHtml">'+
'<div class="infoBlock">'+
'<h6><b>Редагувати Категорію</b></h6>'+

'<label for="fid">id категорії:</label>'+
'<input type="text" id="fid" name="fname" placeholder="'+categId+'"/>'+

'<label for="fname">опис категорії:</label>'+
'<input type="text" id="fname" name="fname" placeholder="'+categName+'"/>'+

'<label for="tcode"> Unicode-шифр fa fa-icon_name-а:</label>'+
'<input type="text" id="tcode" name="tnumber" placeholder="'+categCode+'"/>'+
'</div>'+

'<div class="infoBlock imageContainer">'+

'<label htmlFor="fproduct_in_price">фамілія та ініціали менеджера:</label>'+
'<input type="text" id="fmanagerName" name="fproduct_in_price" placeholder="'+name+'"/><br></br>'+

'<label class="mimageButton button button2" for="mimageFile">виберіть фото менеджера</label>'+
'<input type="file"  id="mimageFile" />'+
'<img src='+photo+' id="fmanagerPhoto" height="200" alt="тут має бути фото..."/>'+
'</div>'+
'<div class="warningModal">'+
'</div>'+
'<button class="BackButton w3-teal button_dynamic button_back">'+
'<span><b>Внести зміни</b></span>'+
  '</button>'+
'</div>';
  return EditmodalHtml;
}



// draw modal in mainpage for categories
export function drawEditModal(modalHtml){
    $('.editCategoryModal .my-modal-content').html( modalHtml);
  // show modal
    $(".editCategoryModal").toggleClass("show-modal");
    $( "#mimageFile" ).change(function() {
      previewFile();
    });
}

$('.editCategoryModal .close-button').click(function(){
    $(".editCategoryModal").toggleClass("show-modal");
    
})

// .editCategoryModal onClick
$('.editCategoryModal').click(function (event) {
  if ($(event.target).is('button') || $(event.target).is('button span') || $(event.target).is('button span b')) {

    var infoBlock = $(event.target).closest('div');

    var categId = $(infoBlock).find('#fid').val();
    if (categId == '') categId = $(infoBlock).find('#fid').attr('placeholder');
    var categName = $(infoBlock).find('#fname').val();
    if (categName == '') categName = $(infoBlock).find('#fname').attr('placeholder');
    var categCode = $(infoBlock).find('#tcode').val();
    if (categCode == '') categCode = $(infoBlock).find('#tcode').attr('placeholder');
    var managerName = $(infoBlock).find('#fmanagerName').val();
    if (managerName == '') managerName = $(infoBlock).find('#fmanagerName').attr('placeholder');
    var managerPhoto = document.querySelector('#fmanagerPhoto').getAttribute("src");
   
    editCategoryOnServer(categId, categName, categCode, managerName, managerPhoto);
    
     
  }
})

// modal for edit of categories <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


export function startPicture(){
  var img_src = 'data:image/png;base64,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';
  return(
    img_src
  )
}