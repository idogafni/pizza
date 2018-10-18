$(".modal-add-funds .btn.yes").click(function() {
    window.location = 'transactions/add_funds';
});

$(".modal-add-funds .btn").click(() => {
    $('.modal').hide();
    $(".backdrop").addClass("hidden");
});

$(".create-campaign-btn").click((e) => {
    if(location.href.indexOf('transactions/add_funds') == -1 && $(".yourBalance").text().replace("$",'') == '0.00' ) {

        $(".backdrop").removeClass("hidden");
        $('.modal-add-funds').show();
        e.preventDefault();
    }
});