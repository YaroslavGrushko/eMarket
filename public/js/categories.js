var domain =window.location.hostname
// selectedId = "Зошити"
$('.main_photo_container').click(function(event){
var target = event.target;
selectedId = $(target).attr('id');
if(selectedId=='addCategoryButton')uploadOrders()
})
// upload all orders from buyers

function uploadOrders(){
  let jsonData = {
    'manager_id' : 7,
    'manager_name' : "Ярослав",
    'category_name' : "Степлери",//$('#').val(),
    'category_code': "fa-fa-fa"
  };
  let Data_order = JSON.stringify(jsonData);

  $.ajax({
    url: 'http://127.0.0.1:5000/categories',
    type: 'POST',
    headers: {'Content-Type' : 'application/json'},
    data: Data_order,
    success: function(data) { 
      alert(data.status); 
    },
    error:function(error) {
            alert( "error: " +JSON.stringify(error));
          }
});

}

  

