var domain =window.location.hostname
// get categories
getCategories();
// selectedId = "Зошити"
$('.main_photo_container').click(function(event){
var target = event.target;
selectedId = $(target).attr('id');
if(selectedId=='addCategoryButton')addCategory()
})
// upload all orders from buyers

// function uploadCategories(){
//   let jsonData = {
//     'category_id' : "Степлери",
//     'category_name' : "Степлери та скріпки",//$('#').val(),
//     'category_code': "fa fa-paperclip"
//   };
//   let Data_order = JSON.stringify(jsonData);

//   $.ajax({
//     url: 'http://127.0.0.1:5000/add_categories',
//     type: 'POST',
//     headers: {'Content-Type' : 'application/json'},
//     data: Data_order,
//     success: function(data) { 
//       alert(data.status); 
//     },
//     error:function(error) {
//             alert( "error: " +JSON.stringify(error));
//           }
// });
// }
function getCategories(){
$.ajax({
  url: 'http://127.0.0.1:5000/read_categories',
  type: 'GET',
  data: { get_param: 'value' },
  headers: {'Content-Type' : 'application/json'},
  success: function(data) { 
    // var categories = $.parseJSON(data);
    var ids = data.category_id; 
    var names = data.category_name;
    var codes = data.category_code;
    columnsToObjects(ids, names, codes);
  },
  error:function(error) {
          alert( "error: " +JSON.stringify(error));
        }
});
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
// ONLY FRONT-END:////////////////////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function showCategories(categories){
  var main_photo_containerHTML = '';
  $(categories).each(function(index,category){
    // var category = elem[0];
    main_photo_containerHTML+=
    '<div><i id="'+category.id+'" class="'+category.code+'" toggle="tooltip" data-placement="bottom" title="'+category.name+'"></i></div>'
  })
  main_photo_containerHTML+=
  '<div class="addButton"><i id="addCategoryButton" class="fa fa-plus " title="Додати нову категорію"></i></div>';
  $('.main_photo_container').html(main_photo_containerHTML);
}

  

