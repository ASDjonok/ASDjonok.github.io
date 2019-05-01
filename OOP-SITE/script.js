$(document).ready(function () {

    window.addEventListener('WebComponentsReady', function () {
        showIntro();
    });

    // $('img[src*="fiot_ukr_blue.png"]').fadeIn(6000);


    function showIntro() {
        var link = $('link[href="pages/intro.html"]')[0];
        var content = link.import.querySelector('#intro');

        var div = $('.lr_div')[0];

        $(div).empty();
        div.appendChild(content.cloneNode(true));
    }

    $('.menu a').on('click', function (e) {
        e.preventDefault();

    });

    $('.dopmat a').on('click', function (e) {
        e.preventDefault();
        $('.menu .active').removeClass('active');


        var div = $('.lr_div')[0];
        $(div).empty();

        var objectPdf = document.createElement('embed');
        objectPdf.setAttribute("src", "files/JCC.pdf#page=1&zoom=96");
        $('#doc').prop('href', 'files/JCC.pdf');
        div.appendChild(objectPdf);
    });


    $('.menu li').click(function () {
        $('.menu li').removeClass('highlighted');
        $('.menu li a').addClass('usual');
        $(this).addClass('highlighted');
        var indLi = $('.menu li').index($(this));
        var link = $('link[rel="import"]')[indLi];
        var content = link.import.querySelector('.lr_text');

        var div = $('.lr_div')[0];
        $(div).empty();
        div.appendChild(content.cloneNode(true));

    });

    $('.header').click(function () {
        $('.menu li').removeClass('highlighted');
        $('.menu .active').removeClass('active');

        showIntro();
    });
});
