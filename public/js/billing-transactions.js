$(document).ready(function() {
    let table = $('#transactions_methods_tbl').DataTable({
        serverSide: true,
        "autoWidth": false,
        ajax: {
            'url'     : '/transactions_history/getData',
            'type'    : 'GET',
            'headers' : {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            complete:function(res){
                $('#transactions_methods_tbl_paginate').find("a.previous").html(`  <i class="ft-chevron-left"></i>  `);
                $('#transactions_methods_tbl_paginate').find("a.next").html(`  <i class="ft-chevron-right"></i>  `);
                $('thead.thead-inverse th').addClass('bg-' + $('.app-sidebar')[0].dataset.backgroundColor);
                $('thead.thead-inverse th').addClass('gradient-' + $('.app-sidebar')[0].dataset.backgroundColor);
                Main.mobileTables();
            }
        },
        aoColumns:[
            {
                "mData":"date.date",
                "sTitle": "Date"
            },
            {
                "mData": "type",
                "sTitle" : "Type"
            },
            {
                "mData": "status",
                "sTitle": "Status"
            },
            {
                "mData": "currency",
                "sTitle": "Currency"
            },
            {
                "mData":"value",
                "sTitle": "USD"
            }
        ],
        "columnDefs": [ {
            "targets" : 0,
            "render"  : function ( data, type, full, meta ) {
                return data.substring(0,10);
            }
        } ],
        "sorting": [[ 0, "desc" ]]
    });
    $('#transactions_methods_tbl thead tr th').eq(4).text('USD');
});