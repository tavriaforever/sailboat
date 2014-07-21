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

    /*(Start) Maps*/
    ymaps.ready(initMaps);

    function initMaps(){
        var map1 = new ymaps.Map('map-1', {
            center: [44.635301, 33.48156],
            zoom: 12,
            controls: ['smallMapDefaultSet']
        }),

        myCollection = new ymaps.GeoObjectCollection();

        // 1
        myCollection.add(new ymaps.Placemark([44.602934, 33.468514], {
                hintContent: 'Начало маршрута'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 2
        myCollection.add(new ymaps.Placemark([44.620836, 33.47023], {
                hintContent: 'Берем курс на Евпаторию'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 3
        myCollection.add(new ymaps.Placemark([44.652949, 33.521729], {
                hintContent: 'Берем курс на Евпаторию'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );


        // 4
        myCollection.add(new ymaps.Placemark([44.801022, 33.520012], {
                hintContent: 'Берем курс на Евпаторию'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 5
        myCollection.add(new ymaps.Placemark([44.854772, 33.541298], {
                hintContent: 'Берем курс на Евпаторию'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 6
        myCollection.add(new ymaps.Placemark([45.065376, 33.548508], {
                hintContent: 'Берем курс на Евпаторию'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 7
        myCollection.add(new ymaps.Placemark([45.1784, 33.36483], {
                hintContent: 'Берем курс на Евпаторию'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 8
        myCollection.add(new ymaps.Placemark([45.137348, 33.282089], {
                hintContent: 'Берем курс на Евпаторию'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 9
        myCollection.add(new ymaps.Placemark([45.258716, 32.984772], {
                hintContent: 'Берем курс на Евпаторию'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 10
        myCollection.add(new ymaps.Placemark([45.327536, 32.93705], {
                hintContent: 'Берем курс на Евпаторию'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 11
        myCollection.add(new ymaps.Placemark([45.288047, 32.652092], {
                hintContent: 'Берем курс на Евпаторию'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 12
        myCollection.add(new ymaps.Placemark([45.332622, 32.468071], {
                hintContent: 'Берем курс на Евпаторию'
//                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        myCollection.add(new ymaps.Polyline([
            [44.602934, 33.468514],
            [44.620836, 33.47023],
            [44.652949, 33.521729],
            [44.801022, 33.520012],
            [44.854772, 33.541298],
            [45.065376, 33.548508],
            [45.1784, 33.36483],
            [45.137348, 33.282089],
            [45.327536, 32.93705],
            [45.258716, 32.984772],
            [45.288047, 32.652092],
            [45.332622, 32.468071]
        ], {
            // Описываем свойства геообъекта.
            // Содержимое балуна.
            hintContent: '«Дикий Крым»'
        }, {
            // Отключаем кнопку закрытия балуна.
            balloonHasCloseButton:false,
            // Цвет линии.
            strokeColor: "#104594",
            // Ширина линии.
            strokeWidth: 6,
            // Коэффициент прозрачности.
            strokeOpacity: 0.5
        }));

        map1.geoObjects.add(myCollection);
    }
    /*(End) Maps*/
});
