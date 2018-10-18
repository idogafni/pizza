$(document).ready(function() {
    $('#supportReason').on('change', function(event) {
        var txt = $( "#supportReason option:selected" ).text();
        $('#supportReasonTxt').val( txt );
    });
    $('#supportReasonRefund').on('change', function(event) {
        var txt = $( "#supportReasonRefund option:selected" ).text();
        $('#refundReasonTxt').val( txt );
    });

    if (location.hash) {
        console.log( location.hash );
        $('a[href="' + location.hash + '"]').tab('show');
    }
});