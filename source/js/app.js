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

    var allPanels = $('dd').hide(),
        links = $('.faq__accordion a');

    links.click(function(e) {
        if($(e.target).hasClass('active')) return false;

        allPanels.slideUp();
        links.removeClass('active');
        $(this).addClass('active').parent().next().slideDown();

        return false;
    });
});
