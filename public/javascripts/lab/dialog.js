define(["jquery"], function($) {
	$.fn.fDialog = function(options) {
		var defaults = {
			mask : true,
			maskClose : true,
			maskColor : "#000",
			height : "300px",
			width : "500px",
			content : "this is dialog content",
			title : "dialog"
		};

		var $el = $(this);

		var settings = $.extend(true, {}, defaults, options)
		var dialog = {
			init : function() {
				$el.each(function() {
					var $this = $(this);
					$this.click(function (e) {
						e.stopPropagation();
						e.preventDefault();
						if(settings.mask) {
							var maskHtml = "<div id='mask'></div>",
								wWidth = $(window).width(),
								wHeight = $(window).height();
							$("body").prepend(maskHtml);
							var $mask = $("#mask");
							$mask.css({
								"background" : settings.maskColor,
								"width" : wWidth,
								"height" : wHeight,
								"position" : "absolute",
								"top" : 0,
								"left" : 0,
								"z-index" : 10,
								"opacity" : 0.3,
								"display" : "block"
							});
							if(settings.maskClose) {
								$mask.click(function () {
									dialog.close();
								});
							}
						}
						var dialogHtml = "<div id='dialog' class='dialog'></div>";
						$("body").append(dialogHtml);
						var $dialog = $("#dialog");
						$dialog.css({
							"height" : settings.height,
							"width" : settings.width,
							"margin-top" : -parseFloat(settings.height) / 2 + "px",
							"margin-left" :  -parseFloat(settings.width) / 2 + "px" 
						})
						var dialogHdHtml = "<div class='hd'></div>";
						var dialogBdHtml = "<div class='bd'></div>";
						var dialogFtHtml = "<div class='ft'></div>";
						$dialog.append(dialogHdHtml).append(dialogBdHtml).append(dialogFtHtml).append("<a class='close' href='javascript:;'>x</a>");
						var $close = $(".close", $dialog);
						var $hd = $(".hd", $dialog);
						var $bd = $(".bd", $dialog);
						$hd.append("<h4>" + settings.title + "</h4>");
						$bd.append(settings.content);
						$close.click(function () {
							dialog.close();
						});
						dialog.drag();
					});
				});
			},
			drag : function() {
				var $dialog = $("#dialog");
				var $dialogHd = $("#dialog .hd");
				var drag = false;
				var dragParams, move;
				$dialogHd.bind("mousedown", function (e) {
					drag = true;
					dragParams = {
						dragX : e.clientX - $dialog.position().left,
						dragY : e.clientY - $dialog.position().top
					}
					$(this).css({'cursor':'move'});
					if(this.setCapture) {  
						this.setCapture();  
					} 	
				}).bind("mousemove", function (e) {
					if(drag) {
						move = {
							moveX : e.clientX - dragParams.dragX,
							moveY : e.clientY - dragParams.dragY
						}
						if(move.moveX - parseFloat(settings.width) / 2 < 0) {
							move.moveX = parseFloat(settings.width) / 2;
						}
						if(move.moveX + parseFloat(settings.width) / 2 > $(window).	width()) {
							move.moveX = ($(window).width() - parseFloat(settings.width) / 2);
						}
						if(move.moveY - parseFloat(settings.height) / 2 < 0) {
							move.moveY = parseFloat(settings.height) / 2;
						}
						if(move.moveY + parseFloat(settings.height) / 2 > $(window)	.height()) {
							move.moveY = ($(window).height() - parseFloat(settings.height) / 2);
						}
						$dialog.css({
							left : move.moveX,
							top : move.moveY
						});
					}
				}).bind("mouseup", function() {
					drag = false;
					$(this).css({'cursor': "default"});
					if(this.releaseCapture) {
						this.releaseCapture();
					}
				}).bind("mouseleave", function() {
					drag = false;
					$(this).css({'cursor': "default"});
				});
			},
			close : function() {
				if(settings.mask) {
					var $mask = $("#mask");
					$mask.remove();
				}
				var $dialog = $("#dialog");
				$dialog.remove();
			}
		}
		dialog.init();
	}
});
