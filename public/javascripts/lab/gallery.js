define(["jquery"], function($) {
	$.fn.gallery = function(options) {
		var defaults = {
			model : 'slide'
		},
			$el = $(this),
			$children,
			$fGalleryWarp,fGallery,$fSlider,$fClose,
			$fSlide,
			$next,$prev,
			$counterCurr,
			fGalleryOn = false,
			html = "<div id='f-gallery-wrap'><div id='f-gallery'><div id='f-gallery-slider'></div><a id='f-gallery-close' class='close'></a></div></div>",
			curr,prev,next,
			slideCounter,
			settings = $.extend(true, {}, defaults, options);
		var gallery = {
			init : function() {
				$el.each(function () {
					var $this = $(this);
					$children = $this.children();
					$children.on("click", function (e) {
						curr = $children.index(this);
						// prev = (curr - 1 < 0) ? $children.length : curr -1;
						// next = (curr + 1 > $children.length) ? 0 : curr +1; 
						setUp.init();
					});
				});
			}
		};
		var setUp = {
			init : function() {
				this.start();
				this.build();
			},
			start : function() {
				this.structure();
				this.resize();
                this.closeSlide();
			},
			build : function() {
				this.loadContent();
                this.addCaption();
                this.addDesc(); //description
                this.counter();
                this.slideTo();
                this.slide(curr);
                // this.buildThumbnail();
                // this.keyPress();
                // if(settings.index) {
                //     this.slide(settings.index);
                // }
                // else {
                //     this.slide(index);
                // }
                // this.touch();
                // this.enableTouch();

                // setTimeout(function () {
                //     $gallery.addClass('opacity');
                // }, 50);	
			},
			structure : function() {
				$("body").append(html);
				$fGalleryWarp = $("#f-gallery-wrap");
				$fGallery = $("#f-gallery");
				$fSlider = $("#f-gallery-slider", $fGallery);
				$fClose = $("#f-gallery-close", $fGallery);
				var galleryList = "";
				$children.each(function() {
					galleryList += "<div class='f-gallery-slide'></div>";
				})
				$fSlider.append(galleryList);
				$fSlide = $(".f-gallery-slide", $fSlider);
			},
			resize : function() {
				var resizeGallery = function() {
					var gHeight = $(window).height();
					var gWidth = $(window).width();
					$fGalleryWarp.css({
						height : gHeight,
						width : gWidth
					});
				}
				$(window).on("resize", resizeGallery);
			},
			closeSlide : function() {
				$fSlide.on("click", function (e) {
					if($(e.target).is(".f-gallery-slide")) {
						$fGalleryWarp.remove();
					}
				})
			},
			loadContent : function() {
				$children.each(function (index) {
					var src = $children.eq(index).data("src");
					$fSlide.eq(index).prepend("<img src='" + src + "' >");
				});
				// $fSlide.eq(curr).addClass("curr");
				// $fSlide.eq(prev).addClass("prev");
				// $fSlide.eq(next).addClass("next");
			},
			addCaption : function() {
				$children.each(function (index) {
					var caption = $children.eq(index).data("cap");
					$fSlide.eq(index).prepend("<h4>" + caption + "</h4>");
				});
			},
			addDesc : function() {
				$children.each(function (index) {
					var description = $children.eq(index).data("des");
					$fSlide.eq(index).prepend("<p>" + description + "</p>");
				});
			},
			counter : function() {
				slideCounter = $fSlide.length;
				$fGallery.append("<div id='f-gallery-counter'><span id='f-gallery-counter-curr'></span>/<span id='f-gallery-counter-all'>" + slideCounter + "</span></div>");
				$counterCurr = $("#f-gallery-counter-curr", $fGallery);
			},
			slideTo : function() {
				$this = this;
				$fGallery.append("<div id='f-gallery-action'><a href='javascript:;' id='f-gallery-action-prev'>prev</a><a href='javascript:;' id='f-gallery-action-next'>next</a></div>");
				$prev = $("#f-gallery-action-prev", $fGallery);
				$next = $("#f-gallery-action-next", $fGallery);
				$prev.on("click", function () {
					$this.prevSlide();
				});
				$next.on("click", function () {
					$this.nextSlide();
				});
			},
			prevSlide : function () {
				$this = this;
				$this.slide(prev);
			},
			nextSlide : function () {
				$this = this;
				$this.slide(next);
			},
			slide : function (index) {
				if(fGalleryOn) {

				}
				if(settings.model === "slide") {
					if(!$fSlider.hasClass("slide")) {
						$fSlider.addClass("slide");
					}
				}
				if(!fGalleryOn) {
					$fSlide.css({
						"left" : "-100%"
					});
					$fSlide.eq(index).css({
						"left" : "0",
						"opacity" : 0
					});
					$fSlide.eq(index).animate({
						"opacity" : 1
					}, 1000);
					curr = index;
					prev = (index - 1 < 0) ? $children.length - 1 : index -1;
					next = (index + 1 >= $children.length) ? 0 : index +1; 
					$counterCurr.text(curr + 1);
				}

			}
		}
		gallery.init();
	}
})