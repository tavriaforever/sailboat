/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

;(function($, window, document, undefined){

	// our plugin constructor
	var OnePageNav = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$win = $(window);
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.docHeight = this.$doc.height();
	};

	// the plugin prototype
	OnePageNav.prototype = {
		defaults: {
			navItems: 'a',
			currentClass: 'current',
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 750,
			scrollThreshold: 0.5,
			begin: false,
			end: false,
			scrollChange: false
		},

		init: function() {
			// Introduce defaults that can be extended either
			// globally or using an object literal.
			this.config = $.extend({}, this.defaults, this.options, this.metadata);

			this.$nav = this.$elem.find(this.config.navItems);

			//Filter any links out of the nav
			if(this.config.filter !== '') {
				this.$nav = this.$nav.filter(this.config.filter);
			}

			//Handle clicks on the nav
			this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

			//Get the section positions
			this.getPositions();

			//Handle scroll changes
			this.bindInterval();

			//Update the positions on resize too
			this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));

			return this;
		},

		adjustNav: function(self, $parent) {
			self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
			$parent.addClass(self.config.currentClass);
		},

		bindInterval: function() {
			var self = this;
			var docHeight;

			self.$win.on('scroll.onePageNav', function() {
				self.didScroll = true;
			});

			self.t = setInterval(function() {
				docHeight = self.$doc.height();

				//If it was scrolled
				if(self.didScroll) {
					self.didScroll = false;
					self.scrollChange();
				}

				//If the document height changes
				if(docHeight !== self.docHeight) {
					self.docHeight = docHeight;
					self.getPositions();
				}
			}, 250);
		},

		getHash: function($link) {
			return $link.attr('href').split('#')[1];
		},

		getPositions: function() {
			var self = this;
			var linkHref;
			var topPos;
			var $target;

			self.$nav.each(function() {
				linkHref = self.getHash($(this));
				$target = $('#' + linkHref);

				if($target.length) {
					topPos = $target.offset().top;
					self.sections[linkHref] = Math.round(topPos);
				}
			});
		},

		getSection: function(windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

			for(var section in this.sections) {
				if((this.sections[section] - windowHeight) < windowPos) {
					returnValue = section;
				}
			}

			return returnValue;
		},

		handleClick: function(e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $parent = $link.parent();
			var newLoc = '#' + self.getHash($link);

			if(!$parent.hasClass(self.config.currentClass)) {
				//Start callback
				if(self.config.begin) {
					self.config.begin();
				}

				//Change the highlighted nav item
				self.adjustNav(self, $parent);

				//Removing the auto-adjust on scroll
				self.unbindInterval();

				//Scroll to the correct position
				self.scrollTo(newLoc, function() {
					//Do we need to change the hash?
					if(self.config.changeHash) {
						window.location.hash = newLoc;
					}

					//Add the auto-adjust on scroll back in
					self.bindInterval();

					//End callback
					if(self.config.end) {
						self.config.end();
					}
				});
			}

			e.preventDefault();
		},

		scrollChange: function() {
			var windowTop = this.$win.scrollTop();
			var position = this.getSection(windowTop);
			var $parent;

			//If the position is set
			if(position !== null) {
				$parent = this.$elem.find('a[href$="#' + position + '"]').parent();

				//If it's not already the current section
				if(!$parent.hasClass(this.config.currentClass)) {
					//Change the highlighted nav item
					this.adjustNav(this, $parent);

					//If there is a scrollChange callback
					if(this.config.scrollChange) {
						this.config.scrollChange($parent);
					}
				}
			}
		},

		scrollTo: function(target, callback) {
			var offset = $(target).offset().top;

			$('html, body').animate({
				scrollTop: offset
			}, this.config.scrollSpeed, this.config.easing, callback);
		},

		unbindInterval: function() {
			clearInterval(this.t);
			this.$win.unbind('scroll.onePageNav');
		}
	};

	OnePageNav.defaults = OnePageNav.prototype.defaults;

	$.fn.onePageNav = function(options) {
		return this.each(function() {
			new OnePageNav(this, options).init();
		});
	};

})( jQuery, window , document );
/*!
 * Galereya v0.9.94
 * http://vodkabears.github.com/galereya
 *
 * Licensed under the MIT license
 * Copyright (c) 2013, VodkaBears
 */
(function ($) {
    'use strict';

    function Galereya(options) {
        var self = this;

        /**
         * JQuery variables
         */
        var $top,
            $grid,
            $imgs,
            $cells = $([]),
            $categoriesList = $([]),
            $slider, $sliderContainer,
            $sliderNext, $sliderPrev, $sliderDesc, $sliderClose, $sliderPlay,
            $currentSlide = $([]), $currentImg = $([]);

        /**
         * Variables
         */
        var data = [],
            categories = [],
            visibleCells = [],
            slides = [],
            htmlOverflow, bodyOverflow,
            gridW,
            gridH,
            colCount = 0,
            cellW = 300,
            cellH = 300,
            scrollTop,
            loadTimeout,
            currentSlideIndex,
            currentCategory,
            isSliderOpened = false,
            slideShowInterval;

        /**
         * Default options
         * @type {Object}
         */
        var defaults = {
            spacing: 0,
            wave: true,
            waveTimeout: 300,
            modifier: '',
            slideShowSpeed: 10000,
            cellFadeInSpeed: 200,
            noCategoryName: 'all',
            disableSliderOnClick: false,
            load: function (next) {
                next();
            },
            onCellClick: function (e) {}
        };

        /**
         * Event handlers
         * @type {Object}
         */
        var Handlers = {
            windowResize: function () {
                resize();
            },
            bodyClick: function (e) {
                if ($(e.target).closest('.galereya-cats').length === 0) {
                    $categoriesList.removeClass('open');
                }
            },
            categoriesListClick: function (e) {
                var $target = $(e.target),
                    nodeName = e.target.nodeName;

                if (nodeName === 'SPAN') {
                    $target = $target.parent();
                }

                if (!$target.is(':first-child')) {
                    changeCategory($target.find('span').text());
                }

                $categoriesList.toggleClass('open');
            },
            cellClick: function (e) {
                if (!self.options.disableSliderOnClick) {
                    openSlider(parseInt(this.getAttribute('data-visibleIndex'), 10));
                }

                self.options.onCellClick(e);
            },
            sliderNextClick: function (e) {
                changeSlide('next');
            },
            sliderPrevClick: function (e) {
                changeSlide('prev');
            },
            sliderCloseClick: function () {
                closeSlider();
            },
            sliderPlayClick: function () {
                if (!slideShowInterval) {
                    startSlideShow();
                } else {
                    stopSlideShow();
                }
            },
            bodyKeyDown: function (e) {
                if (isSliderOpened) {
                    if (e.which === 37 || e.which === 39) {
                        e.preventDefault();
                    }
                }
            },
            bodyKeyUp: function (e) {
                if (isSliderOpened) {
                    switch (e.which) {
                        case 27:
                            closeSlider();
                            break;
                        case 37:
                            $sliderPrev.click();
                            break;
                        case 39:
                            $sliderNext.click();
                            break;
                        default:
                    }
                }
            }
        };

        /**
         * Local constructor
         */
        var constructor = function () {
            self.addClass('galereya').addClass(self.options.modifier);
            loadData(function () {
                buildDOM();
                resize();
                loadImages();
                if (self.options.wave && checkTransitionsSupport()) {
                    wave();
                }
                addEventListeners();
            });
        };

        /**
         * Checks css transitions support
         * @return {Boolean}
         */
        var checkTransitionsSupport = function () {
            var s = document.createElement('div').style,
                supportsTransitions = 'transition' in s ||
                    'WebkitTransition' in s ||
                    'MozTransition' in s ||
                    'msTransition' in s ||
                    'OTransition' in s;

            return supportsTransitions;
        };

        /**
         * Get transition duration in ms
         * @return {Boolean}
         */
        var getTransitionDuration = function ($elem) {
            var td = $elem.css('transitionDuration') ||
                $elem.css('webkitTransitionDuration') ||
                $elem.css('mozTransitionDuration') ||
                $elem.css('oTransitionDuration') ||
                $elem.css('msTransitionDuration') ||
                0;
            td = parseFloat(td) * 1000;

            return td;
        };

        /**
         * Calculate some starting params
         */
        var calcParams = function () {
            cellW = $cells.width();
            cellH = $cells.height();

            colCount = Math.floor((self.width() - 10) / (cellW + self.options.spacing));
            if (colCount < 1) {
                colCount = 1;
            }

            gridW = colCount * cellW + (colCount - 1) * self.options.spacing;
            gridH = Math.ceil($imgs.length / colCount) * cellH;
        };

        /**
         * Create a simple grid image DOM element and add it to the $imgs jquery object
         * @param src
         * @returns {jQuery} - image element
         */
        var createImage = function (src) {
            var $img = $(document.createElement('img')).attr('src', src);
            self.append($img);
            $imgs = $imgs.add($img);

            return $img;
        };

        /**
         * Create a galereya cell element and add it to the $cells jquery object
         * @param $img - an image element
         * @param item - an image info with a title and description
         * @returns {jQuery} - cell element
         */
        var createCell = function ($img, info) {
            var $cell = $img.addClass('galereya-cell-img')
                .wrap('<div class="galereya-cell" data-index="' + $cells.length + '"></div>')
                .parent()
                .append('<div class="galereya-cell-desc">\
                                <div class="galereya-cell-desc-title">' + info.title + '</div>\
                                <div class="galereya-cell-desc-text">' + info.description + '</div>\
                            </div>')
                .append('<div class="galereya-cell-overlay" />');
            $cell.click(Handlers.cellClick);
            $cells = $cells.add($cell);
            $grid.append($cell);

            return $cell;
        };

        /**
         * Add information about an image to the data array
         * @param info
         * @returns {} - Modified item
         */
        var addInfo = function (info) {
            var item = {
                "lowsrc": info.lowsrc || '',
                "fullsrc": info.fullsrc || '',
                "title": info.title || '',
                "description": info.description || '',
                "category": info.category || ''
            };

            if (item.category) {
                item.category = item.category.toLowerCase();
                if ($.inArray(item.category, categories) === -1) {
                    categories.push(item.category);
                }
            }

            data.push(item);
            return item;
        };

        /**
         * Loading data
         */
        var loadData = function (next) {
            var item;
            $imgs = self.find('img').each(function (i, img) {
                item = {
                    "lowsrc": img.getAttribute('src') || '',
                    "fullsrc": img.getAttribute('data-fullsrc') || '',
                    "title": img.getAttribute('title') || img.getAttribute('alt') || '',
                    "description": img.getAttribute('data-desc') || '',
                    "category": img.getAttribute('data-category') || ''
                };

                addInfo(item);
            });

            self.options.load(function (items) {
                if (items && items.length) {
                    for (var i = 0, len = items.length, item, $img; i < len; i++) {
                        item = addInfo(items[i]);
                        createImage(item.lowsrc);
                    }
                }

                next();
            });
        };

        /**
         * Building DOM
         */
        var buildDOM = function () {
            if (categories.length > 0) {
                $categoriesList = $('<ul class="galereya-cats" />');
                $top = $('<div class="galereya-top" />');
                self.prepend($top.html($categoriesList));
                $categoriesList.append('<li class="galereya-cats-item"><span>' + self.options.noCategoryName + '</span></li>');
                for (var i = 0; i < categories.length; i++) {
                    $categoriesList.append('<li class="galereya-cats-item"><span>' + categories[i] + '</span></li>');
                }
            }

            var $img, title, desc;
            $imgs.wrapAll('<div class="galereya-grid" />').each(function (i, img) {
                $img = $(img);
                title = data[i].title;
                desc = data[i].description;
                $img.addClass('galereya-cell-img')
                    .wrap('<div class="galereya-cell" data-index="' + i + '"></div>')
                    .parent()
                    .append('<div class="galereya-cell-desc">\
                                <div class="galereya-cell-desc-title">' + title + '</div>\
                                <div class="galereya-cell-desc-text">' + desc + '</div>\
                            </div>')
                    .append('<div class="galereya-cell-overlay" />');
            });

            $cells = self.find('.galereya-cell');
            $grid = self.find('.galereya-grid');

            $slider = $('<div class="galereya-slider" />');
            $sliderContainer = $('<div class="galereya-slider-container" />');
            $sliderNext = $('<div class="galereya-slider-nav right" />');
            $sliderPrev = $('<div class="galereya-slider-nav left" />');
            $sliderDesc = $('<div class="galereya-slider-desc" />');
            $sliderClose = $('<div class="galereya-slider-close" />');
            $sliderPlay = $('<div class="galereya-slider-play" />');
            $slider
                .addClass(self.options.modifier)
                .append($sliderContainer)
                .append($sliderNext)
                .append($sliderPrev)
                .append($sliderDesc)
                .append($sliderDesc)
                .append($sliderClose)
                .append($sliderPlay);
            $(document.body).append($slider);

            self.show();
        };

        /**
         * Loading images. If image is already loaded, just show it.
         * @param index - starting index of an image
         * @param category - category of images
         */
        var loadImages = function (index, category) {
            index = index || 0;

            if (index >= $imgs.length) {
                return;
            }

            clearTimeout(loadTimeout);

            if (category && data[index].category !== category) {
                setTimeout(function () {
                    loadImages(++index, category);
                }, 0);
                return;
            }

            var img = $imgs[index],
                onload = function () {
                    if (isSliderOpened) {
                        $(this).parent().show();
                    } else {
                        $(this).parent().fadeIn(self.options.cellFadeInSpeed, 'linear');
                    }
                    loadTimeout = setTimeout(function () {
                        loadImages(++index, category);
                    }, self.options.cellFadeInSpeed / 2);
                };

            if (!img.complete) {
                $(img).attr("src", img.src).load(onload);
            } else {
                onload.call(img);
            }
            showCell(index);
        };

        /**
         * Show cell of an image
         * @param index - index of an image.
         */
        var showCell = function (index) {
            var cell = $cells[index],
                currentIndex;

            placeCell(cell, visibleCells.length);
            currentIndex = visibleCells.push(cell) - 1;

            $(cell).addClass('visible').attr('data-visibleIndex', currentIndex);
        };

        /**
         * Place the cell into the grid of a visible cells
         * @param cell
         * @param number
         */
        var placeCell = function (cell, number) {
            var left, top, topCell, col;

            col = number % colCount;
            left = col * cellW + self.options.spacing * col;
            if (number >= colCount) {
                topCell = visibleCells[number - colCount];
                top = topCell.offsetTop + topCell.offsetHeight + self.options.spacing;
            } else {
                top = 0;
            }

            // Change height cell by cell
            var height = top + cell.offsetHeight;
            if (height > gridH) {
                gridH = height;
                $grid.height(gridH + $grid[0].offsetTop);
            }

            cell.style.top = top + 'px';
            cell.style.left = left + 'px';
        };

        /**
         * Clear the grid
         */
        var hideCells = function () {
            visibleCells = [];
            gridH = 0;
            $cells.stop(true, true).fadeOut(200).removeClass('visible');
        };

        /**
         * Wave pulsation
         * @param index - index of a cell
         */
        var wave = function (index) {
            index = index || 0;
            if (index >= $cells.length) {
                index = 0;
            }

            var $cell = $($cells[index]);
            $cell.addClass('wave');

            setTimeout(function () {
                $cell.removeClass('wave');
                wave(++index);
            }, self.options.waveTimeout);
        };

        /**
         * Change current category of images
         * @param category
         */
        var changeCategory = function (category) {
            currentCategory = category;
            $categoriesList.empty().prepend('<li class="galereya-cats-item"><span>' + category + '</span></li>');

            hideCells();
            if (category === self.options.noCategoryName) {
                loadImages(0);
            } else {
                $categoriesList.append('<li class="galereya-cats-item"><span>' + self.options.noCategoryName + '</span></li>');
                loadImages(0, category);
            }

            for (var i = 0, len = categories.length, cat; i < len; i++) {
                cat = categories[i];
                if (cat !== category) {
                    $categoriesList.append('<li class="galereya-cats-item"><span>' + cat + '</span></li>');
                }
            }
        };

        /**
         * Gallery resizing
         */
        var resize = function () {
            calcParams();

            if ($currentImg.length === 0) {
                $currentImg = $currentSlide.find('.galereya-slide-img');
            }
            $currentImg.css('margin-top', ($(window).height() - $currentImg.height()) / 2);
            $grid.width(gridW);
            gridH = 0;
            for (var i = 0, len = visibleCells.length; i < len; i++) {
                placeCell(visibleCells[i], i);
            }
        };

        /**
         * Show slider
         * @param visibleIndex
         */
        var openSlider = function (visibleIndex) {
            if (isSliderOpened) {
                setTimeout(function () {
                    openSlider(visibleIndex);
                }, 50);
                return;
            }

            stopSlideShow();
            $sliderContainer.empty();
            currentSlideIndex = visibleIndex;

            var td = getTransitionDuration($slider),
                next = function () {
                    htmlOverflow = $('html').css('overflow');
                    bodyOverflow = $('body').css('overflow');
                    scrollTop = $(window).scrollTop();
                    $('html, body').css('overflow', 'hidden');
                };

            $slider.show(0, function () {
                $slider.addClass('opened');
                if (checkTransitionsSupport()) {
                    setTimeout(next, td + 50);
                } else {
                    next();
                }
            });

            isSliderOpened = true;
            changeSlide();
            updateNavigation();
        };

        /**
         * Close slider
         */
        var closeSlider = function () {
            if (!isSliderOpened) {
                return;
            }

            $('html').css('overflow', htmlOverflow);
            $('body').css('overflow', bodyOverflow);
            $(window).scrollTop(scrollTop);

            var td = getTransitionDuration($slider),
                next = function () {
                    stopSlideShow();
                    slides = [];
                    $sliderContainer.empty();
                    $slider.hide();
                    isSliderOpened = false;
                };

            $slider.removeClass('opened');
            if (checkTransitionsSupport()) {
                setTimeout(next, td + 50);
            } else {
                next();
            }
        };

        /**
         * Create slide
         * @param visibleIndex
         */
        var createSlide = function (visibleIndex) {
            clearInterval(slideShowInterval); //freeze slide show

            var cell = visibleCells[visibleIndex],
                index = parseInt(cell.getAttribute('data-index'), 10),
                $slide,
                $img;

            $slide = $('<div class="galereya-slider-slide" />')
                .html('<div class="galereya-slide-loader"></div>');

            $img = $('<img class="galereya-slide-img" src="' + data[index].fullsrc + '" alt="' + data[index].title + '" />').load(function () {
                $slide.html($img);
                $img.css('margin-top', ($(window).height() - $img.height()) / 2);
                if (slideShowInterval) {
                    startSlideShow(); //resume slide show when an image is loaded
                }
            });

            return $slide;
        };

        /**
         * Go to slide
         * @param direction
         */
        var changeSlide = function (direction) {
            direction = direction || 'next';

            //restore slide show interval, if slide show currently works.
            //Make it works correctly, when someone clicked next or prev button.
            if (slideShowInterval) {
                stopSlideShow();
                startSlideShow();
            }

            var nextSlideIndex,
                dir = direction.toLowerCase(),
                $slide,
                index,
                slidesCount = visibleCells.length;

            if (dir === 'next') {

                if (slides.length === 0) {
                    nextSlideIndex = currentSlideIndex;
                    dir = '';
                } else {
                    nextSlideIndex = currentSlideIndex + 1;
                    if (nextSlideIndex >= slidesCount) {
                        return;
                    }
                }

                $slide = slides[nextSlideIndex];
                if (!$slide) {
                    $slide = createSlide(nextSlideIndex);
                    $slide.addClass(dir);
                    $sliderContainer.append($slide);
                    slides[nextSlideIndex] = $slide;
                }
                changeSlideState($slide, 'current');
                changeSlideState($currentSlide, 'prev');

            } else if (dir === 'prev') {

                if (slides.length !== 0) {
                    dir = '';
                }
                nextSlideIndex = currentSlideIndex - 1;
                if (nextSlideIndex < 0) {
                    return;
                }

                $slide = slides[nextSlideIndex];
                if (!$slide) {
                    $slide = createSlide(nextSlideIndex);
                    $slide.addClass(dir);
                    $sliderContainer.prepend($slide);
                    slides[nextSlideIndex] = $slide;
                }
                changeSlideState($slide, 'current');
                changeSlideState($currentSlide, 'next');

            }

            currentSlideIndex = nextSlideIndex;
            $currentSlide = $slide;
            index = visibleCells[currentSlideIndex].getAttribute('data-index');
            $sliderDesc.empty().html('<div class="galereya-slider-desc-title">' + data[index].title + ' </div>' + data[index].description);
            $currentImg = $slide.find('.galereya-slide-img');
            $currentImg.css('margin-top', ($(window).height() - $currentImg.height()) / 2);

            updateNavigation();
        };

        /**
         * Change state of a slide
         * @param $slide
         * @param direction
         */
        var changeSlideState = function ($slide, direction) {
            setTimeout(function () {
                $slide
                    .removeClass('prev')
                    .removeClass('next')
                    .removeClass('current')
                    .addClass(direction);
            }, 50);
        };

        /**
         * Update navigation
         */
        var updateNavigation = function () {
            var len = visibleCells.length;

            if (currentSlideIndex >= len - 1) {
                stopSlideShow();
                $sliderPlay.hide();
                $sliderNext.hide();
            } else {
                $sliderPlay.show();
                $sliderNext.show();
            }

            if (currentSlideIndex <= 0) {
                $sliderPrev.hide();
            } else {
                $sliderPrev.show();
            }
        };

        /**
         * Start slide show
         */
        var startSlideShow = function () {
            $sliderPlay.addClass('pause');
            slideShowInterval = setInterval(function () {
                $sliderNext.click();
            }, self.options.slideShowSpeed);
        };

        /**
         * Stop slide show
         */
        var stopSlideShow = function () {
            $sliderPlay.removeClass('pause');
            clearInterval(slideShowInterval);
            slideShowInterval = null;
        };

        /**
         * Add event listeners
         */
        var addEventListeners = function () {
            $(window).bind('resize', Handlers.windowResize);
            $(document.body).click(Handlers.bodyClick)
                .keydown(Handlers.bodyKeyDown)
                .keyup(Handlers.bodyKeyUp);
            $categoriesList.click(Handlers.categoriesListClick);
            $cells.click(Handlers.cellClick);
            $sliderNext.click(Handlers.sliderNextClick);
            $sliderPrev.click(Handlers.sliderPrevClick);
            $sliderClose.click(Handlers.sliderCloseClick);
            $sliderPlay.click(Handlers.sliderPlayClick);
        };

        /**
         * Public
         */
        this.options = $.extend({}, defaults, options);
        this.openSlider = openSlider;
        this.closeSlider = closeSlider;
        this.changeCategory = changeCategory;
        this.startSlideShow = startSlideShow;
        this.stopSlideShow = stopSlideShow;
        this.nextSlide = function () {
            $sliderNext.click();
        };
        this.prevSlide = function () {
            $sliderPrev.click();
        };
        /**
         * Load additional images to the galereya.
         * @param items - is an object like in the load function.
         */
        this.loadMore = function (items) {
            if (items && items.length) {
                var i = 0,
                    startIndex = $cells.length,
                    gridIndex = startIndex,
                    len = items.length,
                    item, $img;
                for (; i < len; i++, gridIndex++) {
                    item = addInfo(items[i]);
                    $img = createImage(item.lowsrc);
                    createCell($img, item);
                }

                loadImages(startIndex, currentCategory);
            }
        };

        constructor();
        if (this.length > 1) {
            this.each(function () {
                $(this).galereya(options);
            });
        }
        return this;
    }

    $.fn.galereya = Galereya;
}(jQuery));

/*!
 * jQuery Browser Plugin v0.0.6
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2013 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 2013-07-29T17:23:27-07:00
 */

(function( jQuery, window, undefined ) {
  "use strict";

  var matched, browser;

  jQuery.uaMatch = function( ua ) {
    ua = ua.toLowerCase();

  	var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
  		/(chrome)[ \/]([\w.]+)/.exec( ua ) ||
  		/(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
  		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
  		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
  		/(msie) ([\w.]+)/.exec( ua ) ||
  		ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
  		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
  		[];

  	var platform_match = /(ipad)/.exec( ua ) ||
  		/(iphone)/.exec( ua ) ||
  		/(android)/.exec( ua ) ||
  		/(windows phone)/.exec( ua ) ||
  		/(win)/.exec( ua ) ||
  		/(mac)/.exec( ua ) ||
  		/(linux)/.exec( ua ) ||
  		/(cros)/i.exec( ua ) ||
  		[];

  	return {
  		browser: match[ 3 ] || match[ 1 ] || "",
  		version: match[ 2 ] || "0",
  		platform: platform_match[ 0 ] || ""
  	};
  };

  matched = jQuery.uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
  	browser[ matched.browser ] = true;
  	browser.version = matched.version;
  	browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
  	browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
  	browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
  	browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
  	browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
  	var ie = "msie";

  	matched.browser = ie;
  	browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
  	var opera = "opera";

  	matched.browser = opera;
  	browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
  	var android = "android";

  	matched.browser = android;
  	browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  jQuery.browser = browser;
})( jQuery, window );