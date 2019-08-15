function LoginToServer() {
    let jsonData = {
      'Admin_Name': $('#username').val(),
      'Admin_Password': $('#password').val()
    };
    let Data_order = JSON.stringify(jsonData);
  
    $.ajax({
      url: 'http://127.0.0.1:5000/login',
      type: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: Data_order,
      success: function (data) {
        switchLoginStatus(data.loginStatus);
        alert('Hi, dear '+ data.loginStatus+'!'); 
      },
      error: function (error) {
        alert("error: " + JSON.stringify(error));
      }
    });
  }
  
  $("#login").click(function (){
    //   alert('login click');
    LoginToServer();
    })