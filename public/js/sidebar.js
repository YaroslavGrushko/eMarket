// sidebar
$('.serviceButton').click(function(){
    $('html, body').animate({
        scrollTop: $("#service").offset().top
    }, 2000);

    $('.serviceButton').addClass('w3-text-teal');
    $('.aboutButton').removeClass('w3-text-teal');
    $('.contactButton').removeClass('w3-text-teal');
    $('.portfolioButton').removeClass('w3-text-teal');
})

$('.productsButton').click(function(){
    $('html, body').animate({
        scrollTop: $("#products").offset().top
    }, 2000);

    $('.aboutButton').removeClass('w3-text-teal');
    $('.contactButton').removeClass('w3-text-teal');
    $('.serviceButton').removeClass('w3-text-teal');
    $('.productsButton').addClass('w3-text-teal');
})

$('.aboutButton').click(function(){
    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 2000);

    $('.aboutButton').addClass('w3-text-teal');
    $('.contactButton').removeClass('w3-text-teal');
    $('.portfolioButton').removeClass('w3-text-teal');
    $('.serviceButton').removeClass('w3-text-teal');

})

$('.contactButton').click(function(){
    $('html, body').animate({
        scrollTop: $("#contact").offset().top
    }, 2000);

    $('.aboutButton').removeClass('w3-text-teal');
    $('.contactButton').addClass('w3-text-teal');
    $('.portfolioButton').removeClass('w3-text-teal');
    $('.serviceButton').removeClass('w3-text-teal');
})


 // Script to open and close sidebar
 function Sidebar_open() {
    document.getElementById("mySidebar").style.display = "block";
    // document.getElementById("myOverlay").style.display = "block";
    document.getElementsByClassName("w3-main")[0].style.marginLeft = "300px";
    $('.open-hamburger').hide();
}

function Sidebar_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
    document.getElementsByClassName("w3-main")[0].style.marginLeft = "0px";
    // show hamburger button
    $('.open-hamburger').show();

}
