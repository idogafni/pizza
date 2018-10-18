Main.dynamicallyLoadScript(Main.base_url + "/js/campaign-create.js");

$( document ).ready(function() {

     $('body').scrollspy({ target: '#nav-create-campaign' });

     $('[data-spy="scroll"]').on('activate.bs.scrollspy', function () {

        $(".navbar-inverse .active").removeClass("active").parent().addClass("active");
        $('.nav-preview').removeClass('active');
        $('.nav-basic-info').addClass('active');
    });

});