/*=========================================================================================
    File Name: wizard-steps.js
    Description: wizard steps page specific js
    ----------------------------------------------------------------------------------------
    Item Name: Apex - Responsive Admin Theme
    Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Wizard tabs with icons setup
$(document).ready( function(){
    $(".icons-tab-steps").steps({
        headerTag        : "h6",
        bodyTag          : "fieldset",
        transitionEffect : "fade",
        titleTemplate    : '<span class="step">#index#</span> #title#',
        labels: {
            finish: 'Save & launch campaign'
        },
        onFinishing: function (event, currentIndex)
        {
            $(".icons-tab-steps").validate().settings.ignore = ":disabled";
            return $(".icons-tab-steps").valid();
        },
        onStepChanging: function (event, currentIndex, newIndex)
        {
            console.log({'currentIndex':currentIndex,'newIndex':newIndex});
            // Allways allow previous action even if the current form is not valid!
            if (currentIndex > newIndex)
            {
                return true;
            }
            if(newIndex == 3){
                if($("#inputPlacement").val() == 0){
                    return false;
                }
            }
            // Forbid next action on "Warning" step if the user is to young

            // Needed in some cases if the user went back (clean up)
            if (currentIndex < newIndex)
            {
                // To remove error styles
                $(".icons-tab-steps").find(".body:eq(" + newIndex + ") label.error").remove();
                $(".icons-tab-steps").find(".body:eq(" + newIndex + ") .error").removeClass("error");
            }
            $(".icons-tab-steps").validate().settings.ignore = ":disabled,:hidden";
            return $(".icons-tab-steps").valid();
        },
    });

    // To select event date
    $('.pickadate').pickadate();
 });