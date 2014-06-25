define(["jquery"], function($) {
	var imgList = new Array();
	var urlList = new Array();
	var active = 0;
	var $blinds = null;

	var defaultOptions = {
		numberOfBlinds : 20,
		sliderVisibleTime : 2000,
		color : "#000000",
		margin : 3,
		width : 1000,
		height : 600,
		gap : 100,
		animationSpeed : 800,
		delayBetweenSlides : 500,
		hasLinks : false,
		orientation : "vertical",
		startClosed : false,
		firstOpenDelay : 500
	};

	var options = {};

	$.blindify = function(element, userOptions) {
		var $el = $(element);
		options = $.extend({}, defaultOptions, userOptions);
		$("ul li", $el).each(function() {
			var $this = $(this);
			if(options.hasLinks) {
				urlList.push($this.children("a")[0].href);
			}
			$("a", $this).each(function() {
				$(this).remove();
			});
			imgList.push($this);
		});
		imgList[active].addClass("active");
		if(options.hasLinks) {
			var $activeA = $("<a></a>");
			$activeA.href = urlList[active];
			$el.prepend($activeA);
			var movingElements = $("ul", el).detach();
			$activeA.append(movingElements);
			$el = $activeA;
		}
		$el.addClass("blindify").find("img").andSelf()
			.width(options.width).height(options.height);
		var spanW = 0;
		var spanH = 0;
		if(options.orientation === 'vertical') {
			spanW = options.width / options.numberOfBlinds;
		} else {
			spanH = options.height / options.numberOfBlinds;
		}
		for(var i = 0; i < options.numberOfBlinds; i++) {
			var $addEl = $("<span></span>");
			var borders;
			if(options.startClosed) {
				if(options.orientation === 'vertical') {
					borders = {
						borderWidthTop : options.height / 2,
						borderWidthBottom : options.height / 2
					};
				} else {
					borders = {
						borderWidthTop : options.width / 2,
						borderWidthBottom : options.width / 2
					}
				}
			} else {
				borders = calculateBorders();
			}
			if(options.orientation === 'vertical') {
				$addEl.css({
					"left" : i * spanW,
					"border" : options.margin + "px solid " + options.color,
					"border-top" : borders.borderWidthTop + "px solid" + options.color,
					"border-bottom" : borders.borderWidthBottom + "px solid " + options.color,
					"height" : options.height,
					"width" : spanW
				});
			} else {
				$addEl.css({
					"top" : i * spanH,
					"border" : options.margin + "px solid " + options.color,
					"border-right" : borders.borderWidthTop + "px solid" + options.color,
					"border-left" : borders.borderWidthBottom + "px solid " + options.color,
					"height" : spanH,
					"width" : options.width
				});
			}
			$el.prepend($addEl);
		}
		$blinds = $('span', $el);
		if(options.startClosed) {
			$el.delay(options.firstOpenDelay).queue(function (next) {
				$.each($blinds, function (index, value) {
					var border = calculateBorders();
					var animationProperties = getAnimationProperties(borders);
					$(value).animate(animationProperties, options.animationSpeed);
				});
				next();
			});
		}
		$el.delay(options.sliderVisibleTime).queue(function (next) {
			animateBorders();
			next();
		});
	}
	var calculateBorders = function() {
		var random = Math.ceil((Math.random() * 9));
		var borderWidthTop = (random/10) * options.gap;
		var borderWidthBottom = options.gap - borderWidthTop;

		return {
			borderWidthTop: borderWidthTop,
			borderWidthBottom: borderWidthBottom
		};
	}

	var getAnimationProperties = function(borders) {
		var animationProperties;
		if(options.orientation === 'vertical') {
			if(borders === null) {
				animationProperties = {
					borderTopWidth : options.height / 2,
					borderBottomWidth : options.height /2
				};
			} else {
				animationProperties = {
					borderTopWidth : borders.borderWidthTop,
					borderBottomWidth : borders.borderWidthBottom
				};
			}
		} else {
			if(borders === null) {
				animationProperties = {
					borderTopWidth : option.width / 2,
					borderBottomWidth : options.width / 2
				};
			} else {
				animationProperties = {
					borderTopWidth : borders.borderWidthTop,
					borderBottomWidth : borders.borderWidthBottom
				};
			}
		}
		return animationProperties;
	}
	var animateBorders = function() {
		var changeOccuredOnce = false;
		var animationProperties = getAnimationProperties(null);
		$blinds.animate(animationProperties, options.animationSpeed, function() {
			if(!changeOccuredOnce) {
				imgList[active].removeClass("active");
				active = (active + 1) % imgList.length;
				imgList[active].addClass("active");
				if(options.hasLinks) {
					el.href = urlList[active];
				}
				setTimeout(animateBorders, options.sliderVisibleTime + options.animationSpeed);
				changeOccuredOnce = true;
			}
			var borders = calculateBorders();
			animationProperties = getAnimationProperties(borders);
			$(this).delay(options.delayBetweenSlides).animate(animationProperties, options.animationSpeed);
		});
	}
	$.fn.blindify = function(userOptions) {
		return this.each(function() {
			new $.blindify(this, userOptions);
		});
	};
});