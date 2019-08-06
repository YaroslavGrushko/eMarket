var domain =window.location.hostname
// selectedId = "Зошити"
$('.main_photo_container').click(function(event){
var target = event.target;
selectedId = $(target).attr('id');
if(selectedId=='addButton')uploadOrders()
})
// upload all orders from buyers
function uploadOrders(){
    $.ajax({
      url:domain+':5000/tracks',
      data:' ',
      type:'GET',
      success:function(data){
        // var ordersArray = $.parseJSON(data);
        alert(data)
      }
    });
  }