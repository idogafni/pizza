Campaign = {
    categorySwitch : ".category-check",
    budget:[],
    period:[],
    init : function(budgetSRC,periodSRC)
    {
        this.budget = budgetSRC;
        this.period = periodSRC;
        Campaign.categorySelection();
        Campaign.placementsSelection();
        Campaign.selectBanner();
        Campaign.previewSection();
        Campaign.previewCampaign();
        Campaign.initStepper();
        Campaign.submitCampaign();
        Campaign.setCaruoselIndicators();
        Campaign.headlineSelection();
    },

    headlineSelection: function () {

        var categorySelected = $( "#inputSelectCategory option:selected" ).text();

        $.get('/campaigns/getHeadline?categorySelected='+categorySelected,function(data) {
            const options =  Campaign.headLineBuildSelect( data );
            $('#inputCampaignHeadline').html(options);
        });

        $( "#inputSelectCategory").change(function () {
            var categorySelected = $("#inputSelectCategory option:selected").text();

            $.get('/campaigns/getHeadline?categorySelected=' + categorySelected, function(data) {
                const options =  Campaign.headLineBuildSelect( data );
                $('#inputCampaignHeadline').html(options);
            });
        });

        $( "#inputCampaignHeadline").change(function () {

            var v = decodeURIComponent( $(this).val() );
            $(".campaign-preview-headline").html( v );
        });

    },

    headLineBuildSelect: function ( data ) {

        var options = "<option value>Select Headline</option>";
        var isCampaignDesc =  decodeURIComponent ( $('#inputCampaignDesc').val() );
        if( isCampaignDesc != "" ){
            $(".campaign-preview-headline").html( isCampaignDesc );
        }

        for ( var i = 0, l = data.length; i < l; i++ ) {
            const value = data[i];

            if ( isCampaignDesc === data[i] ) {
                options += "<option selected value='" + value + "'>" + data[i] + "</option>";
            } else {
                options += "<option value='"+value+"'>" + data[i] + "</option>";
            }
        }

        return options;
    },

    previewCampaign: function() {
        $(".preview-campaign-btn").click(function(){
            var campaignData = $('form').serializeObject();
            var image = $("#campaignPreviewBanner").attr("src");
            $("#campaignPreviewBannerModal").attr("src" , image);

            var placement = $(".placement-preview-thumb.active").attr('src');
            $("#modal-placement").attr("src" , placement);

            $('.modal-title-name').text( campaignData.campaign_name);
            $('.modal-budget').text('$'+ parseInt(campaignData.campaign_budget).toLocaleString());
            $('.modal-impressions').text( Campaign.budget[campaignData.campaign_budget_level][campaignData.campaign_budget].toLocaleString());
            $('.modal-period').text( Campaign.period[parseInt(campaignData.campaign_period)]);
            $('.modal-category').text( $('#inputSelectCategory option:selected').text().trim());
            $('.modal-targeting').text( $('.placement-item:not(.hide)').text().trim());
            $('.modal-campaign-text').text( decodeURI(campaignData.campaign_description));
            $("#previewCampaignModal").modal('show');
        });
    },

    submitCampaign : function() {
        $(".save-campaign-btn").click(function(){
            $("#createCampaignForm").submit();
        });
    },

    previewSection : function()
    {
        $("#campaignPreviewBanner").click(function(){
            console.log("preview-bnr-click");
        });

        setTimeout(function(){
            $("#inputCampaignHeadline").keyup();
        } , 1000);
    },

    bannerSelection : function(categoryId) {
        $(".cat-bnrs-holder").addClass("hide");
        $("#cat-bnrs-holder-" + categoryId).removeClass("hide");
    },

    selectBanner : function() {
        $(".bnr-card").click(function(){
            $(".bnr-card").removeClass("border-success");
            $(this).addClass("border-success");
            var bannerId = $(this).find(".bnr-btn").attr("bannerid");
            $("#inputBanner").val(bannerId);

            var bannerImageSrc = $("#banner-" + bannerId).attr("src");
            $("#campaignPreviewBanner").attr("src" , bannerImageSrc);
            $('#targeting_btn').click();
        });
    },

    categorySelection : function() 
    {
        $("#inputSelectCategory").change(function(){
            $("#inputBanner").val(0);
            var categoryId = $(this).val();
            var categoryCardID = $("#category-option-" + categoryId).attr("parentid");
            if(categoryCardID == 0) {
                categoryCardID = categoryId;
            }
            $(".card-category").addClass("hide");
            $(".card-category-" + categoryCardID).removeClass("hide");
            Campaign.bannerSelection(categoryId);
        });

        $("#inputSelectCategory").change();// 1 time onload
    },

    placementsSelection : function()
    {
        $(".placement-preview-thumb").click(function(){
            var placementId = $(this).attr("placementid");
            $(".placement-preview-thumb").removeClass("active");
            $(this).addClass("active");
            $(".placement-item").addClass("hide");
            $("#placement-item-" + placementId).removeClass("hide");
            $("#inputPlacement").val(placementId);
            $('#preview_btn').click();
        });
    },


    categoriesControls : function()
    {
        $(".sub-category-collapse-trig").click(function(){
            if( $(this).hasClass("opened") ) {
                $(this).removeClass("opened");
                $(this).addClass("closed");
            } else {
                $(this).removeClass("closed");
                $(this).addClass("opened");
            }
        });
        $(".topics-controls .btn").click(function(){
            $(".topics-controls .btn").removeClass("active");
            $(this).addClass("active");
            if( $(this).hasClass("hideall") ) {
                $(".sub-category-collapse-trig.opened").click();
            } else {
                $(".sub-category-collapse-trig.closed").click();
            }
        });
    },
    
    bindCategoriesSwitches : function() 
    {
        $(Campaign.categorySwitch).bootstrapSwitch('state', false, false); // required to init plugin events        
        $(".bootstrap-switch-container > span").on('click', function() {
            $(Campaign.categorySwitch).bootstrapSwitch('state', false, false); 
            $(Campaign.categorySwitch).removeAttr("checked"); 
            var $selectedCatCheck = $(this).parent().find(Campaign.categorySwitch);
            $selectedCatCheck.attr("checked" , "checked").bootstrapSwitch('state', true, true);
        });
    },

    setCaruoselIndicators : function(){
        let placments_count = document.getElementsByClassName('carousel-item').length;
        let ol_element      = document.getElementById('carousel-indicators');

        for(let i = 0; i < placments_count ; i++){
            let li_class = i == 0 ? "active" : "" ;
            let li_element = '<li data-target="#carousel-example-generic" data-slide-to="0" class=""></li>';
            ol_element.innerHTML += li_element;
        }
    },

    initStepper :function(){
        var isCreateNewCampaign = $('#isCreateNewCampaign').val();


        if(isCreateNewCampaign == false){
            $('li[role=tab]').each(function (key,val) {
                val = $(val);
                if(val.hasClass('disabled')){
                    val.removeClass('disabled');
                    val.addClass('done');
                }
            });
            var bannerId =  $('.bnr-card.border-success').find(".bnr-btn").attr("bannerid");
            var bannerImageSrc = $("#banner-" + bannerId).attr("src");
            $("#campaignPreviewBanner").attr("src" , bannerImageSrc);
        }


        $('a[href="#next"]').css('background', 'transparent');
        $('a[href="#next"]').parent().addClass('d-flex btn btn-raised btn-round gradient-blackberry col-md-5 justify-content-center white');
        $('a[href="#next"]').parent().css('margin-top', '0px');
        $('a[href="#previous"]').css('background', 'transparent');
        $('a[href="#previous"]').parent().addClass('d-flex btn btn-raised btn-round gradient-blackberry col-md-5 justify-content-center white');
        $('a[href="#next"]').parent().parent().css('display','inline-flex');
        $('a[href="#next"]').on('click',function () {
            if($(this).parent().attr('aria-hidden') == "true"){
                $(this).parent().css('cssText',"display: none !important");
                $('a[href="#finish"]').css('background', 'transparent');
                $('a[href="#finish"]').parent().addClass('save-campaign-btn d-flex btn btn-raised btn-round gradient-blackberry col-md-7 justify-content-center white')
                $('a[href="#finish"]').parent().css('margin-top', '0px');
            }
        });
        $('a[href="#previous"]').on('click',function () {
            $('a[href="#finish"]').parent().removeClass('save-campaign-btn d-flex btn btn-raised btn-round gradient-blackberry col-md-7 justify-content-center white');

        });
        $('a#createCampaignForm-t-2, a#createCampaignForm-t-1, a#createCampaignForm-t-0').on('click',function () {
            $('a[href="#finish"]').parent().css('cssText',"display: none !important");
        });
        $('a[href="#finish"]').on('click',()=>{
            $("#createCampaignForm").submit();
        });
    }
};

var budget;
var periods;

$(function(){

    // this.budget = budgetSRC;
    // this.periods = periodsSRC;
    Campaign.init(budgetSRC,periodsSRC);


    $('body').scrollspy({ target: '#nav-create-campaign' });

    $('[data-spy="scroll"]').on('activate.bs.scrollspy', function () {

        $(".navbar-inverse .active").removeClass("active").parent().addClass("active");
        $('.nav-preview').removeClass('active');
        $('.nav-basic-info').addClass('active');
    });

});