var domain =window.location.hostname
// selectedId = "Зошити"
$('.main_photo_container').click(function(event){
var target = event.target;
selectedId = $(target).attr('id');
if(selectedId=='addCategoryButton')addCategory()
})
// upload all orders from buyers
function uploadOrders() {

  $.ajax({
    url: 'http://127.0.0.1:5000/tracks',
    data: ' ',
    type: 'GET',
    success: function (jsonData) {
      var data = $.parseJSON(jsonData);
      alert(data)
    },
    error: function (error) {
      alert("error: " + JSON.stringify(error));
    }
  });
}