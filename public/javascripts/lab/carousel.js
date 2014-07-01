define(["jquery"], function($) {
	$.carousel = function(element, userOptions) {
		var imgList = new Array();
		var options = {
			active : 0,
			width : $(window).width(),
			height : $(window).height(),
			sliderVisibleTime : 1000,
			animateSpeed : 800,
			direction : "top"
		};
		var $el = $(element);
		options = $.extend(true, {}, options, userOptions);
		$el.addClass("carousel").show().find("li").andSelf().css({
			width : options.width,
			height : options.height
		});
		$("ul li", $el).each(function() {
			var $this = $(this)
			if(options.direction === "top") {
				$this.css({
					top: -options.height,
					left: 0
				});
			} else if(options.direction === "bottom") {
				$this.css({
					top: options.height,
					left: 0
				});
			} else if(options.direction === "left") {
				$this.css({
					top: 0,
					left: -options.width
				});
			} else if(options.direction === "right") {
				$this.css({
					top: 0,
					left: options.width
				});
			}
			imgList.push($this);
		})

		imgList[options.active].addClass("active").css({
			top: 0,
			left: 0
		});

		$el.delay(options.sliderVisibleTime).queue(function (next) {
			animateImg();
			next();
		});

		var getAnimateParams = function (dir) {
			var params = null;
			if(dir === "top") {
				params = {
					oldParams : {
						top : options.height
					},
					newParams : {
						top : -options.height
					},
					nextParams : {
						top : 0
					}
				}
			} else if(dir === "bottom") {
				params = {
					oldParams : {
						top : -options.height
					},
					newParams : {
						top : options.height
					},
					nextParams : {
						top : 0
					}
				}
			} else if(dir === "left") {
				params = {
					oldParams : {
						left : options.width
					},
					newParams : {
						left : -options.width
					},
					nextParams : {
						left : 0
					}
				}
			} else if(dir === "right") {
				params = {
					oldParams : {
						left : -options.width
					},
					newParams : {
						left : options.width
					},
					nextParams : {
						left : 0
					}
				}
			}
			return params;
		}

		var animateParams = getAnimateParams(options.direction);

		var animateImg = function() {
			imgList[options.active].animate(animateParams.oldParams, options.animateSpeed);
			imgList[(options.active + 1) % imgList.length].animate(animateParams.nextParams, options.animateSpeed, function() {
				imgList[options.active].removeClass("active").css(animateParams.newParams);
				imgList[(options.active + 1) % imgList.length].addClass("active");
				options.active = (options.active + 1) % imgList.length;
				setTimeout(animateImg, options.animateSpeed + options.sliderVisibleTime);
			});
		};
	}
	$.fn.carousel = function(userOptions) {
		return this.each(function() {
			new $.carousel(this, userOptions);
		});
	}
});