$(document).ready(function() {
    /* (Start) Detect mobiles */
    var mobile = $.browser.mobile;

    if(mobile) {
        var $html = $('html');

        $html.addClass('page_mobile');

        var operaOld = $.browser.opera && $.browser.versionNumber < 12;

        if(operaOld) {
            $html.addClass('page_mobile-opera-11');

            // $('.pictures img').each(function(idx, item) {
            //     $(item).wrap(function() {
            //         return '<a href="' + $(this).data('fullsrc')  + ' ">' + $(this) + '</a>';
            //     });
            // })
        }
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

    /* (Start) Galereya */
    var gallertOptions = {};

    if(mobile) {
        gallertOptions.wave = false;
    }

    if(!operaOld) {
        gallertOptions.slideShowSpeed = 4000;
    } else {
        gallertOptions.disableSliderOnClick = true;
        gallertOptions.onCellClick = function(e) {
            window.location.href = window.location.href + $(e.target).prev().prev().data('fullsrc');
        }
    }

    $('.pictures').galereya(gallertOptions);
    /* (End) Galereya */

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
        /* ========== WILD MAP ============ */
        var mapWild = new ymaps.Map('map-wild', {
                center: [44.618997, 33.491173],
                zoom: 12,
                controls: ['smallMapDefaultSet']
            }),

            wildCollection = new ymaps.GeoObjectCollection();

        // 1 стрелецкая бухта
        wildCollection.add(new ymaps.Placemark([44.602934, 33.468514], {
                hintContent: 'Начало маршрута',
                balloonContentHeader: 'Стрелецкая бухта',
                balloonContentBody: '<img src="i/maps/1-1.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 2 выход в море
        wildCollection.add(new ymaps.Placemark([44.620836, 33.47023], {
                hintContent: 'Берем курс на Евпаторию',
                balloonContentHeader: 'Выход в открытое море',
                balloonContentBody: '<img src="i/maps/1-2.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 3 северная сторона
        wildCollection.add(new ymaps.Placemark([44.652949, 33.521729], {
                hintContent: 'Северная сторона Севастополя',
                balloonContentHeader: 'Северная сторона Севастополя',
                balloonContentBody: '<p>Северная сторона привлекает жителей и гостей города, прежде всего, замечательными песчаными пляжами Севастополя - Учкуевки и Любимовки, чуть дальше которых находятся прекрасные пляжи Качи, Андреевки и Орловки.</p><img src="i/maps/1-3.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );


        // 4 кача
        wildCollection.add(new ymaps.Placemark([44.801022, 33.520012], {
                hintContent: 'Кача',
                balloonContentHeader: 'Кача',
                balloonContentBody: '<p>Гостей полуострова на отдых в Каче привлекает красота окружающей природы, необыкновенные виды, сочетание гор и моря, мягкий климат и множество развлечений.</p><img src="i/maps/1-2.jpg">'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 5 николаевка
        wildCollection.add(new ymaps.Placemark([44.970652, 33.555203], {
                hintContent: 'Николаевка',
                balloonContentHeader: 'Николаевка',
                balloonContentBody: '<p>Курортный поселок на юго-западном побережье Крыма, славится невысокими ценами на отдых, чистым морем, широкими песчано-галечными пляжами, развитой курортной инфраструктурой и разнообразием предложений отдыха.</p><img src="i/maps/1-5.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 6
        wildCollection.add(new ymaps.Placemark([45.065376, 33.548508], {
                hintContent: 'Идем вдоль побережья Черного моря и песчаных пляжей'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 7
        wildCollection.add(new ymaps.Placemark([45.1784, 33.36483], {
                hintContent: 'Евпатория',
                balloonContentHeader: 'Евпатория',
                balloonContentBody: '<p>Приморский курортный город в Крыму с населением в 120 000 человек. Евпатория расположена в степной северо-западной части Крыма. Город растянулся на 14 километров вдоль мелководного Каламитского залива. Cлаву евпаторийским пляжам создали золотистый, чистый и мягкий песок, пологое дно залива и прозрачная вода.</p><img src="i/maps/1-6.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 8
        wildCollection.add(new ymaps.Placemark([45.112193, 33.25119], {
                hintContent: 'Берем курс на Казантип'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 9
        wildCollection.add(new ymaps.Placemark([45.280898, 33.007088], {
                hintContent: 'Поповка',
                balloonContentHeader: 'Место проведения фестиваля Казантип',
                balloonContentBody: '<p>Шум моря, крики чаек, горячее солнце и заводная музыка – это Поповка, Евпатория. Благословенный уголок Крыма, место молодежного и семейного туризма. Вот уже который год принимает Поповка, Крым Казантип – крупнейший фестиваль электронной музыки, который недавно приобрел статус международного.</p><img src="i/maps/1-7.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 10
//        wildCollection.add(new ymaps.Placemark([45.288047, 32.652092], {
//                hintContent: 'Берем курс на Евпаторию'
////                balloonContent: '<img src="img/maps/by_walk/2.jpg" style="margin: 5px;" />',
//            },{
//                preset: 'islands#blueDotIcon'
//            })
//        );

        // 11
        wildCollection.add(new ymaps.Placemark([45.332622, 32.468071], {
                hintContent: 'Мыс Тарханкут',
                balloonContentHeader: 'Мыс Тарханкут',
                balloonContentBody: '<p>Популярное место для дайвинга, виндсерфинга, кайтинга. C апреля по октябрь ярко светит солнце, а вода в июле-августе прогревается до +28C. Вблизи нет рек, поэтому вода кристально чистая. Это позволяет проводить соревнования даже по подводному фотографированию.</p><img src="i/maps/1-8.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        wildCollection.add(new ymaps.Polyline([
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

        mapWild.geoObjects.add(wildCollection);
        /* ========== WILD MAP ============ */

        /* ========== PEARL MAP ============ */
        var mapPearl = new ymaps.Map('map-pearl', {
                center: [44.618997, 33.491173],
                zoom: 12,
                controls: ['smallMapDefaultSet']
            }),

            pearlCollection = new ymaps.GeoObjectCollection();

        // 1 стрелецкая бухта
        pearlCollection.add(new ymaps.Placemark([44.602934, 33.468514], {
                hintContent: 'Начало маршрута',
                balloonContentHeader: 'Стрелецкая бухта',
                balloonContentBody: '<img src="i/maps/1-1.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 2 выход в море
        pearlCollection.add(new ymaps.Placemark([44.620836, 33.47023], {
                hintContent: 'Берем курс на Ласточкино гнездо',
                balloonContentHeader: 'Выход в открытое море',
                balloonContentBody: '<img src="i/maps/1-2.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 3 Херсонес археологический заповедник
        pearlCollection.add(new ymaps.Placemark([44.617325, 33.453105], {
                hintContent: 'Херсонес',
                balloonContentHeader: 'Херсонес',
                balloonContentBody: '<p>Херсонес Таврический, в византийское время также назывался просто Херсон, — древний город, который был основан греками в 421 году до н.э. на юго-западном побережье Крыма. За 2 тысячелетия, город неоднократно менял архитектурный облик, но почти все время был крупным экономическим и культурным центром северного причерноморья. Во время монголо-татарского нашествия в XIV в., город был захвачен и разрушен.</p><img src="i/maps/2-3.jpg">'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 4 мыс фиолент
        pearlCollection.add(new ymaps.Placemark([44.48918, 33.480228], {
                hintContent: 'мыс Фиолент',
                balloonContentHeader: 'мыс Фиолент',
                balloonContentBody: '<p>Фиолентом иногда называют не только мыс, но и область побережья 10 км около него.Отвесные скалы, чистое, прозрачное море, потрясающие виды - этим славится Фиолент среди отдыхающих.</p><img src="i/maps/2-4.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 5 Балаклавская бухта
        pearlCollection.add(new ymaps.Placemark([44.476153, 33.600391], {
                hintContent: 'Балаклавская бухта',
                balloonContentHeader: 'Балаклавская бухта',
                balloonContentBody: '<p>Одна из уникальнейших бухт не только окрестностей Севастополя, но и всего Средиземноморья. Узкий (45 метров в самом узком месте) извилистый и скалистый вход гасит основную массу морских волн, поэтому внутри бухты никогда не наблюдается волнения. Бухта фиордового типа и практически со всех сторон окружена горами. Уникальность бухты также в том, что с 1957 по 1993 года в ней действовал один из самых секретных объектов советского союза - подземный завод ремонта подводных лодок и хранилище торпед с ядерными частями. В настоящий момент на базе завода действует музей.</p><img src="i/maps/2-5.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 6 Ласпи
        pearlCollection.add(new ymaps.Placemark([44.401623, 33.695491], {
                hintContent: 'Бухта Ласпи',
                balloonContentHeader: 'Бухта Ласпи',
                balloonContentBody: '<p>Бухта Ласпи расположена на южном берегу Крыма. Считается, что десь наиболее чистая вода на всем черноморском побережье Крыма. Когда-то в Ласпи располагался древний город, это было обнаружено в ходе археологических раскопок, которые обнаружили руины древних сооружений крупного поселения. Бухта была плотно заселена до мощного землятресения в 1790 году, во время которого были уничтожены почти все источнкии воды, которые использовались местными жителями. Помимо чистой воды, здесь потрясающе красивая южная природа.</p><img src="i/maps/2-6.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 7 гора Кошка (Чатал-Кая)
        pearlCollection.add(new ymaps.Placemark([44.3903, 34.015811], {
                hintContent: 'Гора Кошка (Чатал-Кая)',
                balloonContentHeader: 'Гора Кошка (Чатал-Кая)',
                balloonContentBody: '<p>Гора Кошка, на тюркском Кош-Кая, что переводится как "парная, двойная скала". Древнее название постепенно заменило новое, так как гора действительно сбоку напоминает затаившуюся кошку. Расположена гора Кошка недалеко поселка Симеиз. Высота 255 метров. На вершине имеется обзорная площадка, к ней ведут две тропы со стороны трассы, и левая - экстремальная по гребню. На вершине горы имеются руины древних жилищ и гробниц тавров. Флора представлена достаточно редкими растениями, занесенными в Красную книгу.</p><img src="i/maps/2-7.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 8 Ласточкино гнездо
        pearlCollection.add(new ymaps.Placemark([44.42131, 34.133914], {
                hintContent: 'Ласточкино гнездо',
                balloonContentHeader: 'Ласточкино гнездо',
                balloonContentBody: '<p>Уникальный замок, памятник архитектуры и истории, один из главных символов южного берега Крыма. Первая постройка на скале мыса Ай-Тодор появилась ориентировочно в 1877 - 1878 году. После нескольких смен владельца, Ласточкино гнездо приобрел промышленный барон Штейнгель. Благодаря ему, оно и обрело современный вид в 1912 году, перестроенное по проекту инженера и скульптора Леонида Шервуда. В 1927 году, во время сильного землятрясения, обвалилась часть скалы, но которой стоит замок, часть площадки повисла над морем, появилась глубокая трещина, угрожавшая обвалом всего здания. В таком состоянии Ласточкино гнездо простояло до 1968 года, когда были проведены ремонтные работы, под здание заведена монолитная плита, установлены антисейсмические пояса. В настоящий момент на территории Ласточкиного гнезда действует ресторан.</p><img src="i/maps/2-8.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 9 Ялта
        pearlCollection.add(new ymaps.Placemark([44.47984, 34.203266], {
                hintContent: 'Ялта',
                balloonContentHeader: 'Ялта',
                balloonContentBody: '<p>Ялтинская Набережная (имени Ленина) - главная прогулочная улица города, одна из старейших в Ялте. Здесь красивые южные пейзажи сочетаются со свежим бризом с моря, оставляя приятные ощущения у гуляющих по ней. Набережная прекрасна в любое время года и в любое время суток.</p><img src="i/maps/2-9.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 10 Партенит
        pearlCollection.add(new ymaps.Placemark([44.568751, 34.398273], {
                hintContent: 'Партенит',
                balloonContentHeader: 'Партенит',
                balloonContentBody: '<p>Находясь в пределах 20 км в обе стороны от Алушты и Ялты, Партенит чуть-ли не единственный посёлок на ЮБК, где Вам не потребуются альпинистские навыки при путешествии от моря до дома, потому что расположен в долине, у самого синего моря, а не в горах!</p><img src="i/maps/2-10.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        // 11 Алушта
        pearlCollection.add(new ymaps.Placemark([44.669287, 34.433292], {
                hintContent: 'Алушта',
                balloonContentHeader: 'Алушта',
                balloonContentBody: '<p>В 6 веке в Крыму, на побережье Чёрного моря выросла крепость Алустон. Летели годы, сплетались в века, сменялась власть на полуострове, но город вокруг крепостных стен продолжал расти и развиваться. Теперь Алушта — известный курорт, готовый потягаться в популярности с самой Ялтой. Здесь есть всё для хорошего отдыха как семейных пар с детьми или без, так и для активной молодёжи. Целебный воздух и тёплое море, в котором можно купаться с мая по октябрь, качественные пансионаты, а также интересные экскурсии и достопримечательности.</p><img src="i/maps/2-11.jpg" >'
            },{
                preset: 'islands#blueDotIcon'
            })
        );

        pearlCollection.add(new ymaps.Polyline([
            [44.602934, 33.468514], // 1
            [44.620836, 33.47023], // 2
            [44.617325, 33.453105], // 3
            [44.582081, 33.346977], // line
            [44.48918, 33.480228], // 4
            [44.476153, 33.600391], // 5
            [44.419666, 33.617859], // line
            [44.401623, 33.695491], // 6
            [44.364031, 33.775101], // line
            [44.3903, 34.015811], // 7
            [44.42131, 34.133914], // 8
            [44.47984, 34.203266], // 9
            [44.568751, 34.398273], // 10
            [44.669287, 34.433292] // 11
        ], {
            // Описываем свойства геообъекта.
            // Содержимое балуна.
            hintContent: '«Жемчужина Крыма»'
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

        mapPearl.geoObjects.add(pearlCollection);
        /* ========== PEARL MAP ============ */
    }
    /*(End) Maps*/
});