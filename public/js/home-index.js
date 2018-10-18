function showMyCampaigns(){
    $.get('/graph-campaigns/user' , function(data) {
        data = Main.setCampaignsData(JSON.parse(data));
        Main.generateChart(data , "chart");
    });
}

function showAllCampaigns(){
    $.get('/graph-campaigns/all' , function(data) {
        data = Main.setCampaignsData(JSON.parse(data));
        Main.generateChart(data , "chart");
    });
}


function animateTilesData(){
    Number.prototype.formatCurrency = function(thou = ',', dec = '.', sym = '$') { return this.toFixed(2).toString().split(/[-.]/).reverse().reduceRight(function (t, c, i) { return (i == 2) ? '-' + t : (i == 1) ? t + c.replace(/(\d)(?=(\d{3})+$)/g, '$1' + thou) : t + dec + c; }, sym); }
    var tiles_array = ['deposits-tile' ,'balance-tile','campaign-tile' , 'withdrawal-tile' ];

    tiles_array.forEach(function(el){
        let tile = document.getElementById(el);
        $(tile).prop('Counter',0).animate({
            Counter: tile.dataset.amount
        }, {
            duration : 3000,
            easing   : 'swing',
            step: function (now)
            {
                $(tile).text( (now.formatCurrency()));

            }
        });
    })
}

$(document).ready(function(){
    animateTilesData();
    showMyCampaigns();
});
