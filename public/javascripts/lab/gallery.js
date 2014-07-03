define(["jquery"], function($) {
	$.fn.gallery = function(options) {
		var defaults = {
			model : 'slide'
		},
			$el = $(this),
			$children,
			$fGalleryWarp,
			$fGallery,
			$fSlider,
			$fClose,
			html = "<div id='f-gallery-wrap'><div id='f-gallery'><div id='f-gallery-slider'></div><a id='f-gallery-close' class='close'></a></div></div>",
			index,
			settings = $.extend(true, {}, defaults, options);
		var gallery = {
			init : function() {
				$el.each(function () {
					var $this = $(this);
					$children = $this.children();
					$children.on("click", function (e) {
						index = $children.index(this);
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
				this.getWidth();
                this.closeSlide();
			},
			build : function() {
				this.loadContent(index);
                this.addCaption();
                this.addDesc(); //description
                this.counter();
                this.slideTo();
                this.buildThumbnail();
                this.keyPress();
                if(settings.index) {
                    this.slide(settings.index);
                }
                else {
                    this.slide(index);
                }
                this.touch();
                this.enableTouch();

                setTimeout(function () {
                    $gallery.addClass('opacity');
                }, 50);	
			}
			structure : function() {
				$("body").append(html).addClass("f-gallery-wrap");
				$fGalleryWarp = $("#f-gallery-wrap");
				$fGallery = $("#f-gallery");
				$fSlider = $("#f-gallery-slider", $fGallery);
				$fClose = $("#f-gallery-close", $fGallery);
				var galleryList = "";
				$children.each(function() {
					galleryList += "<div class='f-gallery-slide'></div>";
				})
				$fSlider.append(galleryList);
			}
		}
		gallery.init();
	}
})