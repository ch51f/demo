define(["jquery"], function($) {
	var imgList = new Array();
	var options = {
		active : 0,
		width : $(window).width(),
		height : $(window).height(),
		sliderVisibleTime : 1000,
		animateSpeed : 800
	}
	$.carousel = function(element, userOptions) {
		var $el = $(element);
		$el.addClass("carousel");
		$("ul li", $el).each(function() {
			var $this = $(this)
			$this.css({
				top: -options.height,
			})
			imgList.push($this);
		})
		imgList[options.active].addClass("active").css({
			top: 0
		});
		$el.delay(options.sliderVisibleTime).queue(function (next) {
			animateImg();
			next();
		});
	}
	animateImg = function() {
		imgList[options.active].animate({top: options.height}, options.animateSpeed);
		imgList[(options.active + 1) % imgList.length].animate({top: 0}, options.animateSpeed, function() {
			imgList[options.active].removeClass("active").css({
				top: -options.height
			});
			imgList[(options.active + 1) % imgList.length].addClass("active");
			options.active = (options.active + 1) % imgList.length;
			setTimeout(animateImg, options.animateSpeed + options.sliderVisibleTime);
		});
	};
	$.fn.carousel = function(userOptions) {
		return this.each(function() {
			new $.carousel(this, userOptions);
		});
	}
});