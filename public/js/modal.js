var categorymodalHtml = '<div class="addCategoryHtml">'+
'<div class="infoBlock">'+
'<h6><b>Додати Категорію</b></h6>'+

'<label for="fname">назва категорії:</label>'+
'<input type="text" id="fname" name="fname" placeholder="Введіть назву категорії"/>'+
'<label for="tnumber">Вставте Unicode-шифр fa-fa icon-а:</label>'+
'<input type="text" id="tnumber" name="tnumber" placeholder="Unicode-шифр fa-fa icon-а"/>'+
'</div>'+
'<button class="BackButton w3-teal button_dynamic button_back">'+
'<span><b>Створити</b></span>'+
  '</button>'+
'</div>';

function addCategory(){
    drawModal(categorymodalHtml)
}

function drawModal(modalHtml){
    $('.addCategoryModal .modal-content').html( modalHtml);
  // show modal
    $(".addCategoryModal").toggleClass("show-modal");
    // hide .showCartButtonContainer and filters divs
    // $(".showCartButtonContainer").addClass("hide");
}
$('.addCategoryModal .close-button').click(function(){
    $(".addCategoryModal").toggleClass("show-modal");
    // show .showCartButtonContainer and .filters divs
    // $(".showCartButtonContainer").removeClass("hide");
})
