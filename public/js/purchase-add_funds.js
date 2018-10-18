
$(document).ready(function() {

    $('#country').change(function () {
        $('#prefix').val($("#country").find(':selected').attr('dcode'));
    });

    $('#cardId').change(function () {

        let holderName = $("#cardId").find(':selected').attr('cc_holder').split(" ");
        $('#firstName').val(holderName[0]);
        $('#lastName').val(holderName[1]);

        $('#expireYY').val($("#cardId").find(':selected').attr('cc_exp_yy'));
        $('#expireMM').val($("#cardId").find(':selected').attr('cc_exp_mm'));
    });


    $('#btnAddCard').click(function (event) {
        event.preventDefault();

        var frmData = $("#frmAddFunds").serializeArray();
        $.ajax({
            type    : "POST",
            url     : "/transactions/add_funds",
            data    : frmData,
            headers : {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},


        })
        .done(function (data) {

            if(data[0] == 'errors') {
                $.each( data[1], function( key, value ) {
                    alert( value[0] );
                });
            }

            if (data['html']) {
                console.log(data);
                var html = data['html'] + '<script> document.returnform.submit();</script>';
                $('#addFundContainer').hide();
                $('#3dForm').html(html);
                $('#3dForm').show();
                document.write(html)
            }
            else {
                if(!data['success']) {
                    alert("Fail to Deposit with status " + data['status'] + " msg:" + data['error_message'] );
                }
                else if (data['status'] == 'approved') {
                    alert("Funds Added Successfully");
                    document.location.href = '/campaigns/create';
                }
            }
        })
    });
});