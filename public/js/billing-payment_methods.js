
$(document).ready(function() {
    $('#btnManageCards').click(function(){
        document.location.href='/payment_methods/add_card';
    });

    let table = $('#payment_methods_tbl').DataTable({
        serverSide: true,
        ajax: {
            'url'     : '/payment_methods/getData',
            'type'    : 'GET',
            'headers' : {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            complete:function(res){
                $('#payment_methods_tbl_paginate').find("a.previous").html(`  <i class="ft-chevron-left"></i>  `);
                $('#payment_methods_tbl_paginate').find("a.next").html(`  <i class="ft-chevron-right"></i>  `);
                $('thead.thead-inverse th').addClass('bg-' + $('.app-sidebar')[0].dataset.backgroundColor);
                $('thead.thead-inverse th').addClass('gradient-' + $('.app-sidebar')[0].dataset.backgroundColor);
            }
        },
        aoColumns:[
            {
                "mData":"type",
                "sTitle": "Type"
            },
            {
                "mData": "number",
                "sTitle" : "Number"
            },
            {
                "mData": "expire_yy",
                "sTitle": "Year"
            },
            {
                "mData": "expire_mm",
                "sTitle": "Month"
            },
            {
                "mData":"actions",
                "sTitle": "Actions"
            }
        ],
        "columnDefs": [ {
                "targets" : 4,
                "render"  : function ( data, type, full, meta ) {
                    return `<a href="${data}">
                                <i class="fa fa-times red"></i>
                            </a>`;
                }
            } ],
        "sorting": [[ 0, "desc" ]]
    });
});


deleteCard = function (id) {
    if (confirm("Your card will be deleted from our system. Are you sure ?")) {
        $.ajax({
            type: "POST",
            url: "/payment_methods/delete_card",
            data: {id: id},
            dataType: "json",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            success: function (data) {
                if(data == 'success') {
                    alert("Card Deleted successfully");
                    document.location.href = '/payment_methods'
                }
            },
            error: function (error) {
                console.log(error)
                if (error.status == 200) {
                    alert("Card Deleted successfully");
                    document.location.href = '/payment_methods'
                }
            }
        });
    }
};

