$(document).ready(function() {

    $('#btnAddCard').click(function(event) {

        event.preventDefault();

        var ccNmuber = $('#cardNumber').val();
        var ccExpire = $('#expireYY').val() + '-' + $('#expireMM').val();
        var ccCVV    = $('#cvvNumber').val();
        var ccHolder = $('#cardHolder').val();

        $.get('https://api.bincodes.com/cc/', {
            format  : 'json',
            api_key : '14e7204860da027ff262646210af6be8',
            cc      : ccNmuber
        }, function (data) {
            if(data.valid == 'true' || data.error == '1004' || data.error == ' 1014') {
                $('#creditType').html(data.card);
                $('#cardType').val(data.card);
                var frmData = $( "#frmAddCard" ).serializeArray();
                $.ajax({
                    type: "POST",
                    url: "/payment_methods/add_card",
                    data: frmData,
                    dataType: "json",
                    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                    success: function(data) {
                        alert("New card added successfully");
                        document.location.href='/payment_methods'
                    },
                    error: function(error) {
                        console.log(error)
                        if(error.status == 200) {
                            alert("New card added successfully");
                            document.location.href='/payment_methods'
                        }
                    }
                });

            }
            else {
                alert("Invalid Card Number");

            }
        });
    })
});