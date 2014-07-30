$(document).ready(function() {
    /* (Start) Detect mobiles */
    if($.browser.mobile) {
        $('html').addClass('page_mobile');
    }
    /* (End) Detect mobiles */

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
            center: [44.618997, 33.491173],
            zoom: 12,
            controls: ['smallMapDefaultSet']
        }),

        myCollection = new ymaps.GeoObjectCollection();

        // 1 стрелецкая бухта
        myCollection.add(new ymaps.Placemark([44.602934, 33.468514], {
                hintContent: 'Начало маршрута',
                balloonContentHeader: 'Стрелецкая бухта',
                balloonContentBody: '<img src="i/maps/1-1.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 2 выход в море
        myCollection.add(new ymaps.Placemark([44.620836, 33.47023], {
                hintContent: 'Берем курс на Евпаторию',
                balloonContentHeader: 'Выход в открытое море',
                balloonContentBody: '<img src="i/maps/1-2.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 3 северная сторона
        myCollection.add(new ymaps.Placemark([44.652949, 33.521729], {
                hintContent: 'Северная сторона Севастополя',
                balloonContentHeader: 'Северная сторона Севастополя',
                balloonContentBody: '<p>Северная сторона привлекает жителей и гостей города, прежде всего, замечательными песчаными пляжами Севастополя - Учкуевки и Любимовки, чуть дальше которых находятся прекрасные пляжи Качи, Андреевки и Орловки.</p><img src="i/maps/1-3.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );


        // 4 кача
        myCollection.add(new ymaps.Placemark([44.801022, 33.520012], {
                hintContent: 'Кача',
                balloonContentHeader: 'Кача',
                balloonContentBody: '<p>Гостей полуострова на отдых в Каче привлекает красота окружающей природы, необыкновенные виды, сочетание гор и моря, мягкий климат и множество развлечений.</p><img src="i/maps/1-2.jpg">'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 5 николаевка
        myCollection.add(new ymaps.Placemark([44.970652, 33.555203], {
                hintContent: 'Николаевка',
                balloonContentHeader: 'Николаевка',
                balloonContentBody: '<p>Курортный поселок на юго-западном побережье Крыма, славится невысокими ценами на отдых, чистым морем, широкими песчано-галечными пляжами, развитой курортной инфраструктурой и разнообразием предложений отдыха.</p><img src="i/maps/1-5.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 6
        myCollection.add(new ymaps.Placemark([45.065376, 33.548508], {
                hintContent: 'Идем вдоль побережья Черного моря и песчаных пляжей'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 7
        myCollection.add(new ymaps.Placemark([45.1784, 33.36483], {
                hintContent: 'Евпатория',
                balloonContentHeader: 'Евпатория',
                balloonContentBody: '<p>Приморский курортный город в Крыму с населением в 120 000 человек. Евпатория расположена в степной северо-западной части Крыма. Город растянулся на 14 километров вдоль мелководного Каламитского залива. Cлаву евпаторийским пляжам создали золотистый, чистый и мягкий песок, пологое дно залива и прозрачная вода.</p><img src="i/maps/1-6.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 8
        myCollection.add(new ymaps.Placemark([45.112193, 33.25119], {
                hintContent: 'Берем курс на Казантип'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 9
        myCollection.add(new ymaps.Placemark([45.280898, 33.007088], {
                hintContent: 'Поповка',
                balloonContentHeader: 'Место проведения фестиваля Казантип',
                balloonContentBody: '<p>Шум моря, крики чаек, горячее солнце и заводная музыка – это Поповка, Евпатория. Благословенный уголок Крыма, место молодежного и семейного туризма. Вот уже который год принимает Поповка, Крым Казантип – крупнейший фестиваль электронной музыки, который недавно приобрел статус международного.</p><img src="i/maps/1-7.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 10
//        myCollection.add(new ymaps.Placemark([45.288047, 32.652092], {
//                hintContent: 'Берем курс на Евпаторию'
////                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
//            },{
//                preset: 'islands#blueDotIcon'
//            })
//        );

        // 11
        myCollection.add(new ymaps.Placemark([45.332622, 32.468071], {
                hintContent: 'Мыс Тарханкут',
                balloonContentHeader: 'Мыс Тарханкут',
                balloonContentBody: '<p>Популярное место для дайвинга, виндсерфинга, кайтинга. C апреля по октябрь ярко светит солнце, а вода в июле-августе прогревается до +28C. Вблизи нет рек, поэтому вода кристально чистая. Это позволяет проводить соревнования даже по подводному фотографированию.</p><img src="i/maps/1-8.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        myCollection.add(new ymaps.Polyline([
            [44.602934, 33.468514],
            [44.620836, 33.47023],
            [44.652949, 33.521729],
            [44.801022, 33.520012],
            [44.970652, 33.555203],
            [45.065376, 33.548508],
            [45.1784, 33.36483],
            [45.112193, 33.25119],
            [45.280898, 33.007088],
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
