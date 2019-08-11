var categorymodalHtml = '<div class="addCategoryHtml">'+
'<div class="infoBlock">'+
'<h6><b>Додати Категорію</b></h6>'+

'<label for="fid">id категорії:</label>'+
'<input type="text" id="fid" name="fname" placeholder="Введіть id категорії"/>'+
'<label for="fname">назва категорії:</label>'+
'<input type="text" id="fname" name="fname" placeholder="Введіть назву категорії"/>'+
'<label for="tcode">Вставте Unicode-шифр fa fa-icon_name-а:</label>'+
'<input type="text" id="tcode" name="tnumber" placeholder="Unicode-шифр fa-fa icon-а"/>'+
'</div>'+
'<button class="BackButton w3-teal button_dynamic button_back">'+
'<span><b>Створити</b></span>'+
  '</button>'+
'</div>';



// draw modal in mainpage
function drawModal(modalHtml){
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

    var parentForm = $(event.target).parents().find('.infoBlock');

    var categId = $(parentForm).find('#fid').val();
    var categName = $(parentForm).find('#fname').val();
    var categCode = $(parentForm).find('#tcode').val();

    if ((categId != '') && (categName != '') && (categCode != '') && (categId != undefined) && (categName != undefined) && (categCode != undefined))
      addCategoryToServer(categName, categCode, categId)
  }
})

// // upload all orders from buyers
// function addCategoryToServer(categName,categCode) {
// var categoryObj={};
// categoryObj.categName = categName;
// categoryObj.categCode = categCode;
// categoryJSON = JSON.stringify(categoryObj);
//   $.ajax({
//     url: 'http://127.0.0.1:5000/tracks',
//     data: categoryJSON,
//     type: 'POST',
//     success: function (categoriesJSON) {
//       var categories = $.parseJSON(categoriesJSON);
//       alert(categoriesJSON);
//       showCategories(categories);
//       $(".addCategoryModal").toggleClass("show-modal");
//     },
//     error: function (error) {
//       alert("error: " + JSON.stringify(error));
//     }
//   });
// }
