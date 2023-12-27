jQuery(document).ready(function($) {
    'use strict';

    // Preloader
    $("#preloader").delay(1000).fadeOut();
    $("body div").removeClass('preload');


    // Flexslider
    $("#header-slider, .post-slider").flexslider({
        animation: "slide",
        animationLoop: false,
        slideshow: true,
        controlNav: false
    });


    $('.gallery-slider-carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 180,
        itemMargin: 10,
        asNavFor: '.gallery-slider-slider'
    });

    $('.gallery-slider-slider').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        sync: ".gallery-slider-carousel"
    });

    // Strecth Header Background
    if (_warrior.bg_header !== '')
        if (_warrior.backstretch_status == 1) {
            $('.page-title').backstretch(_warrior.bg_header, {
                centeredY: false
            });
        }
    var height = $('#slider-section').height();

    // Swipebox
    $('.senate-gallery.file dl.gallery-item dt a').addClass('swipebox');
    if ($('.swipebox').length > 0) {
        $('.swipebox').swipebox({
            useCSS: true, // false will force the use of jQuery for animations
            useSVG: true, // false to force the use of png for buttons
            initialIndexOnArray: 0, // which image index to init when a array is passed
            hideCloseButtonOnMobile: false, // true will hide the close button on mobile devices
            hideBarsDelay: 3000, // delay before hiding bars on desktop
            videoMaxWidth: 1140, // videos max width
            beforeOpen: function() {}, // called before opening
            afterOpen: null, // called after opening
            afterClose: function() {}, // called after closing
            loopAtEnd: false // true will return to the first image after the last image is reached
        });
    }

    // Mobilemenu

    var jPM = $.jPanelMenu({
        menu: '#main-menu',
        trigger: '.menu-trigger',
        duration: 300,
        direction: "right",
        openPosition: '280px',
        closeOnContentClick: false
    });
    var jRes = jRespond([{
        label: 'small',
        enter: 0,
        exit: 1024
    }, {
        label: 'large',
        enter: 1024,
        exit: 10000
    }]);

    jRes.addFunc({
        breakpoint: 'small',
        enter: function() {
            $('body').append('<div id="mobile-menu" class="site-navigation"></div>');
            $("#menu-main-menu, #mega-menu-hospitalplus-main-menu").clone().appendTo("#mobile-menu");
            $("#mobile-menu.site-navigation ul li.menu-item-has-children, #mobile-menu.site-navigation .mega-menu-item-has-children").prepend('<div class="dropdown-trigger"><i class="fa fa-angle-down"></i></div>');
            $("#mobile-menu").prepend('<div class="close-menu"></div>')
            $('.dropdown-trigger').click(function() {
                $(this).siblings(".sub-menu, .mega-sub-menu").toggleClass("menu-active");
                $(this).parent().siblings("li.menu-item-has-children, .mega-menu-item-has-children").find(".sub-menu, .mega-sub-menu").removeClass("menu-active");
            });


            $(".close-menu").click(function(j) {
                $('body').removeClass("menu-opened");

            })
        },
        exit: function() {
            $("#mobile-menu").remove();
            $("body").removeClass("menu-opened");
        }
    });

    //Dropdown Menu
    $(".site-navigation ul li").hover(function() {
        $(this).children('.sub-menu').stop().slideToggle();
    });

    $(".menu-trigger").click(function(j) {
        $('body').toggleClass("menu-opened");
        $('.rev_slider_wrapper fullwidthbanner-container').css("left", 0);
        j.stopPropagation();
    })
    $('form br').remove();

    // Menu trigger

    $('a.filter').click(function(event) {
        event.preventDefault();
    });

    $('li.column').removeAttr('data-wow-delay', true);

    $('.input').hover(function() {
        $(this).find('span').css('pointer-events', 'none');
    });

    $('#search-form').prepend('<span>Hit enter to search</span>');
    $('#search-form').addClass('float-label');

    $('.comment-form').addClass('block-form');
    $('.comment-form #submit').addClass('green button small');

    if ($("input.input").filter(function() {
            return $(this).val();
        }).length > 0) {
        $('label span').hide();
    } else {
        $('label span').show();
    }

    $('#footer-widget ul li.column:nth-child(3n)').toggleClass('column-38 column-28');
    $('.footer-top-widgets ul li.column:nth-child(3n)').toggleClass('column-38 column-28');

    // Video Holder
    $('.video-post-holder').fitVids();

    $('iframe').each(function() {
        var parents = $(this).parent();

        parents.fitVids();
    })
    $('#leftcontent article .entry-content').removeClass('gallery-slider');

    // Get all the span's inside parent2
    var span = $("span.wpcf7-form-control-wrap");
    // Replace all the span's with a div
    span.replaceWith(function() {
        return $('<div/>', {
            class: 'fields',
            html: this.innerHTML
        });
    });

    // Go to Top Action
    $('a[href="#top"]').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow');
        return false;
    });

    var footerHeight = 50;

    $("#backtotop").css("bottom", footerHeight);
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - footerHeight / 2) {
            $("#backtotop").addClass("bottom");
        } else {
            $("#backtotop").removeClass("bottom");
        }
    });

    $("#backtotop").click(function(e) {
        $("html, body").animate({
            scrollTop: 0
        }, 600);

        e.preventDefault()
    })

    // Sticky Header
    var mainMarginTop = $('#masthead').outerHeight();
    $(window).scroll(function() {
        if ($(this).scrollTop() > 30) {
            $('#masthead, #mobile-menu').addClass('sticky');
        } else {
            $('#masthead, #mobile-menu').removeClass('sticky');
        }
    });

    // Add padding top
    function topPadding() {
        var menu = $('#masthead'),
            pos = menu.offset();
        var set_wpadminbar = $('#wpadminbar').outerHeight(); // define wpadminbar height
        var set_header_height = $('#masthead').innerHeight(); // define header height
        $('body .page').css('padding-top', set_header_height);
    }

    $(window).bind('load', topPadding);
    $(window).bind('resize', topPadding);

    $('#service-widget ul li.column, #latest-news-widget ul li.column, #doctor-widget ul li.column').matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false

    })

    $('.filter-grid ul').mixitup();

    $(".filter-trigger").click(function() {
        $(".filter-holder").toggleClass("active");
    });

    $(".filter-holder a.filter").click(function() {
        var theText = $(this).html();

        $(".filter-trigger .filter-label").html(theText);
        $(".filter-holder").removeClass("active");
    })

    $(window).load(function() {
        $('body.home #primary select, select#doctor-schedule, select#department-schedule, .fields select').select2({
            theme: "default"
        });

        setTimeout(function() {
            $('body.home #primary select, select#doctor-schedule, select#department-schedule').select2("open");
            $('body.home #primary select, select#doctor-schedule, select#department-schedule').select2("close");
            window.scrollTo(0, 0);
        }, 100);

        // Datepicker
        $('.input.datepicker-input').datepicker();

        // Carousel Widget
        $('.carousel-widget').flexslider({
            animation: "slide",
            animationLoop: false,
            itemWidth: 280,
            itemMargin: 20,
            minItems: 1,
            maxItems: 4,
            directionNav: false,
            controlNav: true
        });

        // Doctor Carousel
        $('.sidebar-doctor-widget').flexslider({
            animation: "slide",
            animationLoop: false,
            itemWidth: 310,
            itemMargin: 0,
            minItems: 1,
            maxItems: 4
        });

        // Revolutin Slider
        var body_width = $('body').width();
        $('.rev_slider_wrapper').css({
            "width": body_width
        });
    });

    $(window).resize(function() {
        // Write some code here
    });

    $('.filter-grid ul li.mix').responsiveEqualHeightGrid();

});