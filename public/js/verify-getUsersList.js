var url = 'https://moshedev-platform2.bannerbit.com/api/';
var verifyUserImages = function(user){
    $.ajax({
        url     : url + 'api_verify',
        type    : 'GET',
        data    : user,
        success : function cb(data) {
           if(data && data !== ""){
               data = JSON.parse(data);
               previewImage(data);
           }
            if(!data || data == ""){
                promptMsg(false , 'User did not upload photos yet ');
            }
        },
        error:function(data){

        }
    });
}

var previewImage = function(array){
    var images_wrapper = document.getElementById('images_wrapper');
    array.forEach(function(el){
        var image_url = 'https://s3-us-west-1.amazonaws.com/click2sell-verify-images/'+el.Key;
        var image_element = "<img src='"+image_url+"'  class='modal-img'/>";
        images_wrapper.insertAdjacentHTML('beforeend',image_element);
        $('#verifyUser').attr('data-user-email' , el.Key.substring(0,el.Key.indexOf('/')));
    })
    $('#modal').modal();
}

var closeModal = function(){
    $('#images_wrapper').empty();
    $('#modal').modal('toggle');
}

var verifyUser = function(el){
    var email = el.dataset.userEmail;
    $.ajax({
        url : url + 'confirm_verify',
        type : 'POST',
        data:{email:email},
        success : function cb(data) {
          if(data == 1) deleteRow(email);
        }
    });
}

var deleteRow = function(email){
    $('#usersTable tbody tr').each(function cb(el){
        if(this.dataset.userEmail == email ){
            $('#usersTable tbody tr').eq(el).remove();
        }
    })
    $('#modal').modal('toggle');
}

var promptMsg = function(status , msg){
    $("#status_msg").text(msg);
    if(status){
        $("#status_msg").addClass('alert-success');
        $("#status_msg").removeClass('alert-danger');
    }
    else{
        $("#status_msg").addClass('alert-danger');
        $("#status_msg").removeClass('alert-success');
    }
    $("#status_msg").slideToggle();
    setTimeout(function(){
        $("#status_msg").slideToggle();
    } , 2000)
}