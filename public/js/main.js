Main = {
    scrolledOnce: {},
    menuToggler: "#menu-toggle",
    colors_array: {
        'pomegranate': 'background-image : linear-gradient(45deg, #9B3CB7, #FF396F)',
        'king-yna': 'background-image : linear-gradient(45deg, #1A2A6C, #B21F1F)',
        'ibiza-sunset': 'background-image : linear-gradient(45deg, #EE0979, #FF6A00)',
        'flickr': 'background-image : linear-gradient(45deg, #33001B, #FF0084)',

    },

    init: function () {
        Main.toggelSideBar();
        Main.bindScrollSpys();
        Main.bindDataTables();
        Main.handleMobile();
        Main.setStorage();
        Main.shoppingCart();
        Main.mobileTables();
    },

    shoppingCart: function () {

        $.get('/campaigns/get_cart_items', function (data) {
            $('#shopping-cart-items-count').html(data);
        });
    },

    toggelSideBar: function () {
        $(Main.menuToggler).click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    },

    bindScrollSpys: function () {
        const that = this;
        $('.nav-item').removeClass('active');//disable bootstrap onload activations
        $(".scrollspy-link").on('click', function (e) {
            e.preventDefault();
            $('.nav-item .nav-link').removeClass('active');
            let navRef = $(this).attr("nav-ref");
            $(".nav-item." + navRef + " .nav-link").addClass("active");
            let hash = this.hash; //required

            if (typeof that.scrolledOnce[hash] === 'undefined') {
                that.scrolledOnce[hash] = true;

                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 1000, function () {
                    window.location.hash = hash;
                });
            }
        });
    },

    bindDataTables: function () {
        // $('.table_data').DataTable();
    },


    handleMobile: function () {
        if (Main.isMobile()) {
            $(Main.menuToggler).click();
        }
    },

    isMobile: function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return true;
        }
        return false;
    },

    setStorage: function () {
        let config = {
            color: 'black',
            image: 'none',
            menu: 'large'
        };
        if (localStorage.getItem('click2sell') == null || localStorage.getItem('click2sell') == undefined) {
            localStorage.setItem('click2sell', JSON.stringify(config));
        }
        Main.setUserThemePrefrences();
    },

    configUserTheme: function (prefrence) {

        let config_array = JSON.parse(localStorage.getItem('click2sell'));

        switch (prefrence.dataset.type) {
            case "color":
                config_array.color = prefrence.dataset.colorName;
                break;
            case "menu":
                config_array.menu = prefrence.checked == true ? 'small' : 'large';
                break;
            case "image":
                config_array.image = prefrence.checked == true ? true : false;
                break;
            default :
                break;
        }

        localStorage.setItem('click2sell', JSON.stringify(config_array));
        Main.setUserThemePrefrences();

    },

    setUserThemePrefrences: function () {
        let config_array = JSON.parse(localStorage.getItem('click2sell'));
        Main.setUserColorPrefrences(config_array);
        Main.setUserMenuPrefrences(config_array);
        Main.setUserImgPrefrences(config_array);

    },

    setUserImgPrefrences: function (config_array) {
        let img_element = document.getElementById('cz-bg-image');
        if (!config_array.image) {
            img_element.click();
        }
    },
    setUserColorPrefrences: function (config_array) {
        let color_elements_array = document.getElementsByClassName('theme-color');
        for (let color_element of color_elements_array) {
            if (color_element.dataset.colorName == config_array.color) {
                color_element.click();
                break;
            }
        }
        $('.thead-inverse th').removeClass(() => {
            let classes = $('.thead-inverse th').attr('class');
            if (classes != undefined) {
                let el_class = classes.match(/(^|\s)bg-\S+/g) + " ";
                el_class += classes.match(/(^|\s)gradient-\S+/g) + " ";
                $('.thead-inverse th').removeClass(el_class);
            }
        });
        $('.thead-inverse th').addClass(config_array.color);
    },

    setUserMenuPrefrences: function (config_array) {
        let menu_element = document.getElementById('cz-compact-menu');
        if (config_array.menu == 'small') {
            menu_element.click();
        }
    },

    dynamicallyLoadScript: function (url) {
        let script = document.createElement("script");
        script.src = url;
        document.head.appendChild(script);
    },

    tableView() {
        Main.toggleGraphTableView();
    },

    graphView() {
        let graph_element = document.getElementById('campaigns-chart');
        let campaign_id = graph_element.dataset.campaign;
        $.get(`/graph-campaigns/single/${campaign_id}`, function (res) {
            let data = Main.setCampaignsData(JSON.parse(res));
            Main.toggleGraphTableView();
            Main.generateChart(data, "campaigns-chart");
        });
    },

    toggleGraphTableView() {
        $('.table-view').toggle();
        $('.graph-view').toggle();
    },

    setCampaignsData(data) {
        let dataObj = {
            cNames: [],
            cData: {
                sales: [],
                clicks: [],
                impressions: []
            }
        };
        for (let i in data) {
            dataObj.cNames.push([data[i].name]);
            dataObj.cData.sales.push(Number([data[i].sales]));
            dataObj.cData.clicks.push(Number([data[i].clicks]));
            dataObj.cData.impressions.push(Number([data[i].impressions]));
        }
        return dataObj;

    },
    generateChart(data, element_id) {
        let chart = new Chartist.Bar('#' + element_id, {
            // add  labels
            labels: data.cNames,
            // add data
            series: [
                data.cData.impressions, // impressions
                data.cData.clicks, // clicks
                data.cData.sales // sales
            ]
        }, {
            // distance between bars
            seriesBarDistance: 170,
            // chart padding
            chartPadding: {
                top: 30,
                right: 20,
                bottom: 20,
                left: 0
            },
            // X-Axis specific configuration
            axisX: {
                // Disable grid
                showGrid: true
            },
            // Y-Axis specific configuration
            axisY: {
                // Disable labels and grid
                showLabel: true,
                showGrid: true
            },
            plugins: [
                Chartist.plugins.ctBarLabels({ // position
                    position: {
                        x: function (data) {
                            return data.x1
                        },
                        y: function (data) {
                            return data.y1 + (data.element.height() * +10) + 30
                        }
                    },
                    labelOffset: {
                        y: 7
                    },
                    labelInterpolationFnc: function (text) { // label text
                        return text;
                    }
                })
            ]
        });
        chart.on('draw', function (data) { // animations
            if (data.type === 'bar') {
                data.element.animate({
                    y2: {
                        dur: 2000,
                        from: data.y1,
                        to: data.y2,
                        easing: Chartist.Svg.Easing.easeOutQuint
                    },
                    opacity: {
                        dur: 2000,
                        from: 0,
                        to: 1,
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            }
        });
    },

    mobileTables: function () {
        var tables = $('.mtable');
        initMobileTables();
        collapseAll();

        tables.on('page.dt', function () {
            initMobileTables();
        });
        $(window).resize(function () {
            collapseAll();
            setClickers();
        });

        function initMobileTables() {
            var table_headers = [];
            tables.each(function () {
                var th = [];
                $(this).find('thead th').each(function () {
                    th.push($(this).text());
                });
                table_headers.push(th);
            });
            tables.each(function (table) {
                var table_index = table;
                // Iterate through each row
                $(this).find('tbody tr').each(function () {
                    $(this).find('td').each(function (column) {
                        $(this).attr('data-label', table_headers[table_index][column]);
                    });
                });
            });
            setClickers();
        }
        function setClickers() {
            if(isMobileScreen()){
                $('td[data-label="Name"]').on('click', function () {
                    $(this).siblings().slideToggle(100, function () {
                    });
                });
                $('td[data-label="Date"]').on('click', function () {
                    $(this).siblings().slideToggle(100, function () {
                    });
                });
            }else{
                $('td[data-label="Name"]').off('click',()=>{});
                $('td[data-label="Date"]').off('click',()=>{});
            }
        }
        function collapseAll() {
            if (isMobileScreen()) {
                $('td[data-label="Name"]').each(function () {
                    $(this).siblings().css('display', 'none');
                });
                $('td[data-label="Date"]').each(function () {
                    $(this).siblings().css('display', 'none');
                });

            }
            else {
                $('td[data-label="Name"]').each(function () {
                    $(this).siblings().css('display', '');
                });
                $('td[data-label="Date"]').each(function () {
                    $(this).siblings().css('display', '');
                });
            }
        }
    }
};

$(function () {
    Main.init();
});


$(document).ready(function () {

    $('#campaign-select').on('change', function () {
        window.location = '/campaigns?selectedCampaignId=' + $(this).val();
    });

    $.get('/payment_methods/get_balance', function (data) {
        $('#userCurrentBalance, .totalAmount').html(Number(data).toLocaleString());
    });

    $('.theme-color').click((e) => {
        let element = e.target;
        Main.configUserTheme(element);
    });

});

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';path=/' + ';expires=' + expires.toUTCString();
};

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
};

function isMobileScreen() {
    if ($(window).width() <= 576) {
        return true;
    }
    return false;
}


