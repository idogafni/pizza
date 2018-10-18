$(document).ready(function() {
    let table = $('#withdrawals_tbl').DataTable({
        serverSide: true,
        ajax: {
            'url'     : '/withdrawals/getData',
            'type'    : 'GET',
            'headers' : {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            complete:function(res){
                $('#withdrawals_tbl_paginate').find("a.previous").html('  <i class="ft-chevron-left"></i>  ');
                $('#withdrawals_tbl_paginate').find("a.next").html('  <i class="ft-chevron-right"></i>  ');
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
                "mData": "amount",
                "sTitle" : "Amount"
            },
            {
                "mData": "currency",
                "sTitle": "Currency"
            },
            {
                "mData": "status",
                "sTitle": "Status"
            }
        ],
        "columnDefs": [
            {
                "targets" : 0,
                "render"  : function ( data, type, full, meta ) {
                    return data.substring(0,10);
                }
            }
        ],
        "sorting": [[ 0, "desc" ]]
    });
});