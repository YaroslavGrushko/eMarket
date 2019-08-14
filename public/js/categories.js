var domain =window.location.hostname
// get categories
getCategories();

// categories section onclick
$('.main_photo_container').click(function(event){
var target = event.target;
selectedId = $(target).attr('id');
if(selectedId=='addCategoryButton')addCategory()
})


// add category
function addCategory(){
  drawModal(categorymodalHtml)
}
// addCategoryToServer - is a function that is responsible
// for POST category to Db (add new category)
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

// getCategories - function that
// is reponsable for loading all categories
// from Db 
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
// delete selected category
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
// columnsToObjects - it is additional function
// that is responsible for 
// reading response data from Db in a right way
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
// show categories - is a big function 
// that is appropriate for displaing
// categories in appropriate way >>>>>>>
// =====================================
function showCategories(categories) {
  var main_photo_containerHTML = '';
  // var categoriesRowHeight = 140;


  // number of categories
  var catCount = categories.length;
  //+1 because of addCategory button
  if (window.admin_state) {
    catCount += 1;
  }


  $(categories).each(function (index, category) {
    // var category = elem[0];
    main_photo_containerHTML +=
      '<div class="categoryItem"><i class="fa fa-trash deleteItem displayNone"></i><i id="' + category.id + '" class="' + category.code + ' categoryIcon" toggle="tooltip" data-placement="bottom" title="' + category.name + '"></i></div>'
  })
  main_photo_containerHTML +=
    '<div class="addButton displayNone"><i id="addCategoryButton" class="fa fa-plus" title="Додати нову категорію"></i></div>';
  // adding additional display:none categories row
  // this is for read categories row height from css file
  main_photo_containerHTML += '<div id="categoryRowHeight"></div>';
  $('.main_photo_container').html(main_photo_containerHTML);

  // delteItem click event:
  $('.categoryItem .deleteItem').click(function (event) {
    var selectedId = $(event.target).parent().find('.categoryIcon').attr('id');
    var result = confirm("do you want to delete '" + selectedId + " category?");
    if (result) deleteCategory(selectedId);
  });
  
  // let's call categoriesPhotoaAdjuster function
  // to adhast height of categories photo
  categoriesPhotoAdjuster(catCount);
  // to adjast height of categories photo
  function categoriesPhotoAdjuster(catCount) {
    var rowHeight = $('#categoryRowHeight').css('height');
    // removing px from string
    rowHeight = rowHeight.replace('px','');
    // count of rows in categories section
    var rowCount = Math.ceil(catCount / 5);
    var categotiesPhotoHeight = rowCount * rowHeight;
    var categotiesPhotoHeightStr = categotiesPhotoHeight + 'px';
    // let's adjust categories photo/section height
    $('.main_photo_container').css('height', categotiesPhotoHeightStr);
  }

  // login onclick
  $('#login').click(function () {
    window.switch_admin_mode = false;

    if ($("input#username").val() == "admin" && $("input#password").val() == "admin") {
      window.admin_state = true;
      window.switch_admin_mode = true;
      // let's load categories from Db
      getCategories();
    } else {
      window.admin_state = false;
      window.switch_admin_mode = true;
      // let's load categories from Db
      getCategories();
    }
  });


  // if it is admin mode:
  if (window.admin_state) {
    $('.fa.fa-trash.deleteItem').addClass('showItem');
    $('.addButton').addClass('showItem');
    $('.productsCategoryTitle').html('');

    var images =
      '<div class = "logo">' +
      '<img src="././images/log-out.png" alt="" title="вийти"> ' +
      '<img src="././images/dashboard.png" alt="" title="кабінет">' +
      '</div>';
    $('.moving-zone').find('.popup-content').html(images);
    // if it is not admin mode
  } else {
    $('.fa.fa-trash.deleteItem').removeClass('showItem');
    $('.addButton').removeClass('showItem');
    $('.productsCategoryTitle').html('');
  }
}
// =====================================
// <<<<<<<<<< show categories - is a big 
// function that is appropriate for
// displaing categories in appropriate way

$(".main_photo_container").click(function (){
  $('html, body').animate({
  scrollTop: $('#products').offset().top}, 'slow');})


// when window is resized, we must alter 
// the categories div/photo height >>>>>>>>>>>

// Closure last-height/width
var lastX = window.innerWidth
var lastY = window.innerHeight

function fooOnResize() {
   var x = window.innerWidth
    //  the threshold = 768px
    // if previous window.width <= 768px and current > 768px
    // then let's reload categories
   if (lastX <= 768 && 768 < x) {
      getCategories();
   }else{
      // if previous window.width > 768px and current <= 768px
      // then let's reload categories
     if(lastX > 768 && x <= 768){
      getCategories();
     };
   }
   lastX = x
}

// window resize event
window.onresize=function(event){
  fooOnResize();
};

// when window is resized, we must alter 
// the categories div height <<<<<<<<<<<
