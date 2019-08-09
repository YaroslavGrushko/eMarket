var categorymodalHtml = '<div class="addCategoryHtml">'+
'<div class="infoBlock">'+
'<h6><b>Додати Категорію</b></h6>'+

'<label for="fname">назва категорії:</label>'+
'<input type="text" id="fname" name="fname" placeholder="Введіть назву категорії"/>'+
'<label for="tcode">Вставте Unicode-шифр fa-fa icon-а:</label>'+
'<input type="text" id="tcode" name="tnumber" placeholder="Unicode-шифр fa-fa icon-а"/>'+
'</div>'+
'<button class="BackButton w3-teal button_dynamic button_back">'+
'<span><b>Створити</b></span>'+
  '</button>'+
'</div>';

// add category
function addCategory(){
    drawModal(categorymodalHtml)
}

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
$('.addCategoryModal').click(function(event){
  if($(event.target).is('button')){
   var parentForm =  $(event.target).parent();
   var categName = $(parentForm).find('#fname').val();
   var categCode = $(parentForm).find('#tcode').val();
   addCategoryToServer(categName,categCode)
  }
})

// upload all orders from buyers
function addCategoryToServer(categName,categCode) {
var categoryObj={};
categoryObj.categName = categName;
categoryObj.categCode = categCode;
categoryJSON = JSON.stringify(categoryObj);
  $.ajax({
    url: 'http://127.0.0.1:5000/tracks',
    data: categoryJSON,
    type: 'POST',
    success: function (categoriesJSON) {
      var categories = $.parseJSON(categoriesJSON);
      alert(categoriesJSON);
      showCategories(categories);
      $(".addCategoryModal").toggleClass("show-modal");
    },
    error: function (error) {
      alert("error: " + JSON.stringify(error));
    }
  });
}
function showCategories(categories){
  var main_photo_containerHTML = '';
  $(categories).each(function(elem){
    main_photo_containerHTML+=
    '<div><i id="'+elem.id+'" class="'+elem.code+'" toggle="tooltip" data-placement="bottom" title="'+elem.name+'"></i></div>'
  })
  $('.main_photo_container').html(main_photo_containerHTML);
}