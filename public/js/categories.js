var domain =window.location.hostname
// selectedId = "Зошити"
$('.main_photo_container').click(function(event){
var target = event.target;
selectedId = $(target).attr('id');
if(selectedId=='addCategoryButton')uploadOrders()
})
// upload all orders from buyers

function uploadOrders(){
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

$.ajax({
  url: 'http://127.0.0.1:5000/read_categories',
  type: 'GET',
  data: { get_param: 'value' },
  headers: {'Content-Type' : 'application/json'},
  success: function(data) { 
    // var categories = $.parseJSON(data);
    alert(data.category_id); 
    alert(data.category_name);
  },
  error:function(error) {
          alert( "error: " +JSON.stringify(error));
        }
});

}

  

