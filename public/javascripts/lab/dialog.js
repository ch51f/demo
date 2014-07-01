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
								wWidth = $(document).width(),
								wHeight = $(document).height();
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
				var dragParams = {
					initX : null,
					initY : null,
					moveX : null,
					moveY : null
				};
				$dialogHd.bind("mousedown", function (e) {
					drag = true;
					dragParams.initX = e.clientX - $dialog.position().left;
					dragParams.initY = e.clientY - $dialog.position().top;
					$(this).css({'cursor':'move'});
					if(this.setCapture) {  
						this.setCapture();  
					} 	
				}).bind("mousemove", function (e) {
					if(drag) {
						dragParams.moveX = e.clientX - dragParams.initX;
						dragParams.moveY = e.clientY - dragParams.initY;

						if(dragParams.moveX - parseFloat(settings.width) / 2 < 0) {
							dragParams.moveX = parseFloat(settings.width) / 2;
						}
						if(dragParams.moveX + parseFloat(settings.width) / 2 > $(document).width()) {
							dragParams.moveX = ($(document).width() - parseFloat(settings.width) / 2);
						}
						if(dragParams.moveY - parseFloat(settings.height) / 2 < 0) {
							dragParams.moveY = parseFloat(settings.height) / 2;
						}
						if(dragParams.moveY + parseFloat(settings.height) / 2 > $(document).height()) {
							dragParams.moveY = ($(document).height() - parseFloat(settings.height) / 2);
						}
						$dialog.css({
							left : dragParams.moveX,
							top : dragParams.moveY
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
