var domain =window.location.hostname
// get categories
getCategories();
// selectedId = "Зошити"
$('.main_photo_container').click(function(event){
var target = event.target;
selectedId = $(target).attr('id');
if(selectedId=='addCategoryButton')addCategory()
})


// add category
function addCategory(){
  drawModal(categorymodalHtml)
}

function addCategoryToServer(categName, categCode, categId) {
  let jsonData = {
    'category_id': categId,
    'category_name': categName, //$('#').val(),
    'category_code': categCode
  };
  let Data_order = JSON.stringify(jsonData);

  $.ajax({
    url: 'http://127.0.0.1:5000/add_categories',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: Data_order,
    success: function (data) {
      // alert(data.status); 
      getCategories();
      $(".addCategoryModal").toggleClass("show-modal");
    },
    error: function (error) {
      alert("error: " + JSON.stringify(error));
    }
  });
}
function getCategories() {
  $.ajax({
    url: 'http://127.0.0.1:5000/read_categories',
    type: 'GET',
    data: {
      get_param: 'value'
    },
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (data) {
      // var categories = $.parseJSON(data);
      var ids = data.category_id;
      var names = data.category_name;
      var codes = data.category_code;
      columnsToObjects(ids, names, codes);
    },
    error: function (error) {
      alert("error: " + JSON.stringify(error));
    }
  });
}
function deleteCategory(id){
  $.ajax({
    url: 'http://127.0.0.1:5000/delete_category',
    type: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(id),
    success: function (data) {
      // alert(data.status); 
      getCategories();
    },
    error: function (error) {
      alert("error: " + JSON.stringify(error));
    }
  })
}
function columnsToObjects(ids, names, codes){
  var categories = []
  for(var i=0; i<ids.length;i++){
    var category = {};
    category.id = ids[i];
    category.name = names[i];
    category.code = codes[i];
    categories.push(category);
  }
  showCategories(categories);
}
// show categories
function showCategories(categories) {
  var main_photo_containerHTML = '';
  $(categories).each(function (index, category) {
    // var category = elem[0];
    main_photo_containerHTML +=
      '<div class="categoryItem"><i class="fa fa-trash deleteItem displayNone"></i><i id="' + category.id + '" class="' + category.code + ' categoryIcon" toggle="tooltip" data-placement="bottom" title="' + category.name + '"></i></div>'
  })
  main_photo_containerHTML +=
    '<div class="addButton displayNone"><i id="addCategoryButton" class="fa fa-plus" title="Додати нову категорію"></i></div>';
  $('.main_photo_container').html(main_photo_containerHTML);


  // delteItem click event:
  $('.categoryItem .deleteItem').click(function (event) {
    var selectedId = $(event.target).parent().find('.categoryIcon').attr('id');
    var result = confirm("do you want to delete '" + selectedId + " category?");
    if(result)deleteCategory(selectedId);
  });
// login onclick



  $('#login').click(function () {
    window.switch_admin_mode = false;
    
    if ($("input#username").val() == "admin" && $("input#password").val() == "admin") {
      window.admin_state = true;
      window.switch_admin_mode = true;
      $('.fa.fa-trash.deleteItem').addClass('showItem');
      $('.addButton').addClass('showItem');  
      $('.productsCategoryTitle').html('');
    } else {
      window.admin_state = false;
      window.switch_admin_mode = true;
      $('.fa.fa-trash.deleteItem').removeClass('showItem');
      $('.addButton').removeClass('showItem');
      $('.productsCategoryTitle').html('');
    }
  });


}



  

