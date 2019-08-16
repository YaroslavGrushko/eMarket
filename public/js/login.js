function LoginToServer() {
    // let jsonData = {
    //   'Admin_Name': $('#username').val(),
    //   'Admin_Password': $('#password').val()
    // };
    // let Data_order = JSON.stringify(jsonData);
    username = $('#username').val();
    password = $('#password').val();

    $.ajax({
      url: 'http://127.0.0.1:5000/login',
      type: 'POST',

      beforeSend: function (xhr) {
          xhr.setRequestHeader ("authorization", "Basic " + btoa(username + ":" + password));
      },
    
      success: function (data) {
        // switchLoginStatus(data.loginStatus);
         alert('API key: '+ data.token+'!'); 
      },
      error: function (error) {
        alert("error: " + JSON.stringify(error));
      }
    });
  }
  function LogoutToServer() {
    // let jsonData = {
    //   'Admin_Name': $('#username').val(),
    //   'Admin_Password': $('#password').val()
    // };
    // let Data_order = JSON.stringify(jsonData);
  
    $.ajax({
      url: 'http://127.0.0.1:5000/logout',
      type: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      xhrFields: {withCredentials: true},
      // data: Data_order,
      success: function (data) {
        switchLoginStatus(data.loginStatus);
      },
      error: function (error) {
        alert("error: " + JSON.stringify(error));
      }
    });
  }
  $("#login").click(function (){
    LoginToServer();
    })
 