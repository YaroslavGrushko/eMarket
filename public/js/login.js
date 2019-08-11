$('#login').click(function(){
    
})

$('.dws-submit').click(function() {

    var user = $("input#username").val();
    var pass = $("input#password").val();

    $.ajax({

        url: "login.php",
        headers: {
            'Authorization': 'Basic ' + btoa(user + ':' + pass)
        },
        success: function(data) {
            //Success block 
            alert(data);
        },
        error: function(xhr, ajaxOptions, throwError) {
            //Error block 
            alert('error of ajax GET/POST')
        },
    });


});