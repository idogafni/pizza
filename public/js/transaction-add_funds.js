$(document).ready(function() {

    if( modalCallBack != false ){
        $("#modalCallBack").modal();
    }

    $('#country').on('change', function() {
        let code = $(this).val();
        if (code == "AU") {
            $('#AUstate').removeClass('hide');
            $('#CAstate').addClass('hide');
            $('#USstate').addClass('hide');
            $('#state').val($('#AUstate').val());
        } else if (code == "US") {
            $('#USstate').removeClass('hide');
            $('#AUstate').addClass('hide');
            $('#CAstate').addClass('hide');
            $('#state').val($('#USstate').val());
        } else if (code == "CA") {
            $('#CAstate').removeClass('hide');
            $('#AUstate').addClass('hide');
            $('#USstate').addClass('hide');
            $('#state').val($('#CAstate').val());
        } else {
            $('#AUstate').addClass('hide');
            $('#USstate').addClass('hide');
            $('#CAstate').addClass('hide');
            $('#state').val("");
        }
    });

    // dwolla logic
    const dwollaEnvIsProd     = false;
    const $dwollaSectionStep1 = $('#dwollaSection-step1');
    const $dwollaSectionStep2 = $('#dwollaSection-step2');

    $dwollaSectionStep1.on('submit' , function (e) {
        e.preventDefault();

        let maxAmount = 10000;
        let amount    = $dwollaSectionStep1.find('input[name="amount"]').val();
        if(amount > maxAmount) {
            $dwollaSectionStep1.find('.error').text(`Maximum deposit is \$${maxAmount}`).css('color', 'red');
            return false;
        }

        log("Processing... Please wait.");

        $dwollaSectionStep1.slideUp();
        const $form = $dwollaSectionStep1.children('form');
        $.ajax({
            type: "POST",
            url: "/transactions/dwollaDepositPlatform",
            data: $form.serializeObject(),
            dataType: "json",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            success: (data) => {
                $dwollaSectionStep2.removeClass('hide');
                $dwollaSectionStep2.find('form #iavToken').val(data.iavToken);

                instantAccountVerification();
            },
            error: ({responseJSON}) => log(responseJSON?responseJSON.message:'error', 'red')
        });
    });

    function instantAccountVerification() {
        let iavToken = $("#iavToken").val();
        let iavInfo  = {
            container: 'iavContainer',
            stylesheets: [
                'https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext',
                'https://myapp.com/iav/customStylesheet.css'
            ],
            microDeposits: false,
            fallbackToMicroDeposits: true,
            subscriber: ({ currentPage, error }) => {
                if(currentPage === 'BankSearch') {
                    log("Please fill following steps. This may take several minutes...");
                }
            }
        };
        dwolla.configure(dwollaEnvIsProd ? 'prod' : 'sandbox');
        dwolla.iav.start(iavToken, iavInfo, instantAccountVerificationCallback);
    }

    function instantAccountVerificationCallback(err, res) {
        $dwollaSectionStep2.hide();
        if(err) {
            return log(err.message, 'red');
        }
        log("Processing... Please wait.");
        createTransfer(res._links || []);
    }

    function createTransfer(data) {
        $.ajax({
            type: "POST",
            url: "/transactions/dwollaCreateTransferPlatform",
            data: data,
            dataType: "json",
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            success: ({status}) => {
                log("");
                $dwollaSectionStep2.show();
            },
            error: ({responseJSON}, err) => {
                if(err === "error") {
                    $dwollaSectionStep2.hide();
                    return log(responseJSON?responseJSON.message:'error', 'red');
                }
            }
        });
    }

    function log(message, color) {
        color = color || 'black';
        $("#collapseDwolla #logs").text(message).css('color', color);
        return false;
    }
});

$('form').on('submit', function() {
    let amount = $(this).find('input[name="amount"]').val();
    if (amount < 200) {
        $(this).parent().find('.error').text('Minimum Deposit is $200').css('color', 'red');
        return false;
    }
});