var ext_array      = ['jpeg', 'png', 'jpg', 'pdf'];
var tooltips_array = {
    identification: `ID: Clear color copy of a valid Government-issued photo ID
                         (e.g. Passport/ National ID card/ Driver\'s License) - front and back.
                         Accepted file extensions (png , jpg , jpeg ,pdf ) Max file size : 1M`,
    Residence: `POR (proof of resident): Clear color copy of a Bank Statement or Utility Bill
                         (e.g. Electricity/Gas/Water/Phone bill) showing: an issue date from within the last 3 months, your name,
                         current residential address, and the Bank/Company name and logo.
                         * Please note a P.O. Box is not considered an acceptable address.
                         Accepted file extensions (png , jpg , jpeg ,pdf ) Max file size : 1M`,
    frontCreditCard: `Credit card: Clear color copy of the Credit Card used to fund your account (front and back).
                         Please ensure that the following appears on the credit card: your full name, expiry date,
                         and the last 4 digits on the front, and signature (and the last 4 digits) on the back.
                         * For your reassurance, please cover first 12 digits and the CVV number.
                         Accepted file extensions (png , jpg , jpeg ,pdf ) Max file size : 1M`,
    addCard: `Add more than one credit card -  front and back clear images `
};

var checkS3Storage = function () {
    let url = `../api/api_verify?email=${$('#email').val()}&action=getBucket`;
    $.get(url, (res) => {
        if (res) {
            res = JSON.parse(res);
            setS3Images(res);
        }
    })
};

var setS3Images = function (res) {
    let baseUrl = "https://s3-us-west-1.amazonaws.com/click2sell-verify-images/";
    res.forEach(function (item) {
        var name = getFileName(item.Key);
        $('#' + name).attr('src', `${baseUrl + item.Key.replace("@", "%40")}`).attr('data-name', item.Key);
        $("input[name='" + name + "']").off('change').on('change', function () {
            validateFile(this, true);
        });
    });
};

var deleteImage = function (obj) {
    obj.previousElementSibling.click();
};

var updateSingleFunc = function (el) {
    let new_file = el.files[0];
    let old_file = $('#' + el.name)[0].dataset.name;
    let formData = new FormData();
    formData.append('old_file', old_file);
    formData.append('new_file', new_file);
    $('#' + el.name).parent().block({
                                        message: '<h6>Processing</h6>',
                                        css: {border: '2px solid #fbfbfb'}
                                    });
    $.ajax({
               url: `../api/api_verify?email=${$('#email').val()}&action=update-img`,
               type: 'POST',
               data: formData,
               processData: false,  // no process the data
               contentType: false,  // no contentType
               success: function (data) {
                   promptMsg(true, 'kyc image updated');
                   // checkS3Storage();
                   $('#' + el.name).parent().unblock();
               }
           });
};

var validateFile = function (el, updateSingle = false) {
    // showHideLoader();
    var ret               = false;
    var file              = el.files[0];
    var name_array        = file.name.split('.');
    var extension_counter = file.name.split('.').length - 1;
    var extension         = name_array[extension_counter];
    if (ext_array.indexOf(extension) != -1 && file.size < 1000000) {
        // showHideLoader();
        previewImage(el);
        if (updateSingle)
            updateSingleFunc(el);
    }
    else {
        // showHideLoader();
        promptMsg(false, 'file size or type are not compatible ');
        el.value = "";
    }
};

var uploadFiles = function (form) {
    $.blockUI();
    // var formData = new FormData(form);
    var formData = new FormData();
    var files    = {};
    $('#docsForm input.custom-file-input').each(function cb(index, el) {
        formData.append('data[' + $(el).attr('name') + ']', this.files[0]);
    });

    formData.append('email', $('#email').val());
    $.ajax({
               url: '../api/api_verify?action=upload',
               headers: {'Authorization': 'Bearer ' + $("input[name='_token']").val()},
               type: 'POST',
               data: formData,
               processData: false,  // no process the data
               contentType: false,  // no contentType
               success: function (data) {
                   $.unblockUI();
                   data = JSON.parse(data);
                   if (data.res == true) promptMsg(data.res, data.msg);
                   if (!data || data == "0" || data.res == false) promptMsg(data.res, data.msg);


               }
           });
};

var previewImage = function (el) {
    var reader    = new FileReader();
    reader.onload = function () {
        $('#' + el.name).attr('src', reader.result);
    }
    reader.readAsDataURL(el.files[0]);
    // updateSingle(el);
};

var showHideLoader = function () {
    $('#loader').toggle();
};

var promptMsg = function (status, msg) {
    $("#status_msg").text(msg);
    if (status) {
        $("#status_msg").addClass('alert-success');
        $("#status_msg").removeClass('alert-danger');
    }
    else {
        $("#status_msg").addClass('alert-danger');
        $("#status_msg").removeClass('alert-success');
    }
    $('#status_msg').slideDown();

    setTimeout(function () {
        $('#status_msg').slideUp();
    }, 2000);
};

var addFields = function () {
    let input_template = `
                           <div class="form-group">
                            <label class="form-label" for="frontCreditCard"> Credit Card ( Front of credit card )  </label>
                            <i class="fa fa-question-circle" aria-hidden="true" title=""></i>
                            <input type="file" class="form-control" name="frontCreditCard" onchange="validateFile(this)" />
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="backCreditCard"> Credit Card ( Back of credit card / cvv )  </label>
                            <input type="file" class="form-control" name="backCreditCard" onchange="validateFile(this)" />
                        </div>
     `;
    $('#docsForm').append(input_template);
};

var checkForm = function () {
    let empty_input_counter = 0;
    let form_elements       = document.getElementById("docsForm").elements;
    let length              = form_elements.length - 1;  // -1 because email hidden field is always with value
    for (let i = 0; i < length; i++) {
        if (form_elements[i].value == "") {
            empty_input_counter++
        }
    }

    if (empty_input_counter < length) {
        return true;
    }
    else {
        promptMsg(false, 'please upload images first');
        return false;
    }
};

var setTollTips = function () {
    $('#identification-tooltip').attr("title", tooltips_array.identification);
    $('#residence-tooltip').attr("title", tooltips_array.Residence);
    $('#frontCreditCard-tooltip').attr("title", tooltips_array.frontCreditCard);
    $('#addCard-tooltip').attr("title", tooltips_array.addCard);
};

function getFileName(path) {
    var name = path.match(/[-_\w]+[.][\w]+$/i)[0];
    name     = name.split('.');
    return name[0];
};

var init = (function () {
    setTollTips();
    checkS3Storage();
    $('[data-toggle="popover"]').popover();
    $("input[class='custom-file-input']").each(function (i, el) {
        console.log(el);
        var imageID     = $(this).attr('name');
        var imageSource = $('#' + imageID).attr('src');
        $('#' + imageID).mouseenter(function() {
            // var imageID = $(this).attr('name');
            var imageSource = $(this).attr('src');
            console.log(imageSource);
            $('#previewImage').attr('src',imageSource);
        });
        // .mouseleave(function() {
        //     $('#previewImage').attr('src','');
        // });
    });


    // .off('change').on('change',function () {
    //     validateFile(this,true);
    // });
})();




