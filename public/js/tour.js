var tourTransactions = {
    onEnd: function() {
        setCookie("touredTransactions", "touredTransactions");
    },
    onClose: function() {
        setCookie("touredTransactions", "touredTransactions");
    },
    id: "tourTransactions",
    showPrevButton: false,
    steps: [

        {
            title: "Open Trey!",
            content: "Tap on the 'Date' to view details about the Transaction",
            target: "transactions_methods_tbl",
            placement: "top"
        }
    ]
};

var tourMyCampaigns = {
    onEnd: function() {
        setCookie("touredMyCampaigns", "touredMyCampaigns");
    },
    onClose: function() {
        setCookie("touredMyCampaigns", "touredMyCampaigns");
    },
    id: "tourMyCampaigns",
    showPrevButton: false,
    steps: [

        {
            title: "Open Trey!",
            content: "Tap on the 'Name' to view details about the Campaign",
            target: "mycampaigns_methods_tbl",
            placement: "top"
        }
    ]
};
$(function () {
    var url = window.location.href;
    if (url.endsWith('transactions') && isMobileScreen() && !getCookie("touredTransactions")) {
        hopscotch.startTour(tourTransactions);
    }
    if (url.endsWith('campaigns') && isMobileScreen() && !getCookie("touredMyCampaigns")) {
        hopscotch.startTour(tourMyCampaigns);
    }
});


