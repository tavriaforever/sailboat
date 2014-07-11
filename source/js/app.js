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
});
