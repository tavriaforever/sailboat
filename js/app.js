$(document).ready(function() {
    $('.nav').onePageNav({
        currentClass: 'nav__item_active',
        changeHash: true,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing'
    });

    $('.pictures').galereya({
        slideShowSpeed: 4000
    });

    var allPanels = $('.faq__accordion > dd').hide();

    $('.faq__accordion > dt > a').click(function() {
        allPanels.slideUp();
        $(this).parent().next().slideDown();
        return false;
    });
});
