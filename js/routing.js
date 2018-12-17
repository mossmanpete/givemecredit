;
(function ($) {

    var app = $.sammy(function () {

        this.get('#/', function () {
            getPage("pages/home.html");
        });

        this.get('/index.html', function () {
            getPage("pages/home.html");
        });

        this.get('/', function () {
            getPage("pages/home.html");
        });

        this.get('#/profile', function () {
            getPage("pages/profile.html", function () {
                $.getScript("js/fns.gun.js", function () {
                    gunAPI.getProfile();
                });
            });
        });

        this.get('#/:page', function () {
            var page = this.params['page'];
            getPage('pages/' + this.params['page'] + '.html');
            $('.sidebar').find('a[href="#/' + page + '"]').addClass('active');
        });

        this.get('#/:folder/:page', function () {
            var folder = this.params['folder'];
            var page = this.params['page'];
            getPage('pages/' + this.params['folder'] + '/' + this.params['page'] + '.html');
            $('.sidebar').find('a[href="#/' + folder + '/' + page + '"]').addClass('active');
        });
    });

    $(function () {
        app.run()
    });

    function getPage(url, cb) {
        $('.sidebar ul li a.active').removeClass('active');
        $.ajax({
            url: url,
            success: function (result) {
                $(".content").hide().html(result).fadeIn();
                $.getScript("js/initializeplugins.js");
                $.getScript("js/main.js");
                gunAPI.displayUserData();
            }
        });
        $(window).scrollTop(0);
        if (cb) cb();
    }
})(jQuery);
