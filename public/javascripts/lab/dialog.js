define(["jquery"], function($) {
	$.fn.fDialog = function(options) {
		var defaults = {
			mask : true,
			maskClose : false,
			maskColor : "#000",
			height : "150px",
			width : "200px"
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
						$dialog.append(dialogHdHtml).append(dialogBdHtml).append(dialogFtHtml);
						dialog.drag();
					})
				});
			},
			drag : function() {
				var $dialog = $("#dialog");
				var $dialogHd = $("#dialog .hd");
				var drag = false;
				var client, offset, moveClient;
				$dialogHd.bind("mousedown", function (e) {
					drag = true;
					dragParams = {
						dragX : e.clientX - $dialog.position().left,
						dragY : e.clientY - $dialog.position().top
					}
					$(this).css({'cursor':'move'});
				}).bind("mousemove", function (e) {
					var move = {
						moveX : e.clientX - dragParams.dragX,
						moveY : e.clientY - dragParams.dragY
					}
					alert(move.moveX)
					if(move.moveX < 0) {
						move.moveX = 0;
					}
					if(move.moveX > ($(window).width() - settings.width)) {
						move.moveX = ($(window).width() - settings.width);
					}
					if(move.moveY < 0) {
						move.moveY = 0;
					}
					if(move.moveY > ($(window).height() - settings.height)) {
						move.moveY = ($(window).height() - settings.height);
					}
					if(drag) {
						$dialog.css({
							left : move.moveX,
							top : move.moveY
						});
					}
				}).bind("mouseup", function() {
					drag = false;
					$(this).css({'cursor': "default"})
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

//拖拽方法
var DragAndDrop = function() {
	var _clientWidth;
	var _clientHeight;
	var _controlObj;
	var _dragObj;
	var _flag = false; 
	var _dragObjCurrentLocation;
	var _mouseLastLocation;
	var getElementDocument = function(element) {
		return element.ownerDocument || element.document;
	};
	var dragMouseDownHandler = function(evt) {
		if (_dragObj) {
			evt = evt || window.event;
			_clientWidth = document.body.clientWidth;
			_clientHeight = document.documentElement.scrollHeight;
			$("#jd_dialog_m_b_1").css("display", "");
			_flag = true;
			_dragObjCurrentLocation = {
				x : $(_dragObj).offset().left,
				y : $(_dragObj).offset().top
			};
			_mouseLastLocation = {
				x : evt.screenX,
				y : evt.screenY
			};
			$(document).bind("mousemove", dragMouseMoveHandler);
			$(document).bind("mouseup", dragMouseUpHandler);
			if (evt.preventDefault) {
				evt.preventDefault();
			} else {
				evt.returnValue = false;
			}
		}
	};
	var dragMouseMoveHandler = function(evt) {
		if (_flag) {
			evt = evt || window.event;
			var _mouseCurrentLocation = {
				x : evt.screenX,
				y : evt.screenY
			};
			_dragObjCurrentLocation.x = _dragObjCurrentLocation.x
					+ (_mouseCurrentLocation.x - _mouseLastLocation.x);
			_dragObjCurrentLocation.y = _dragObjCurrentLocation.y
					+ (_mouseCurrentLocation.y - _mouseLastLocation.y);
			_mouseLastLocation = _mouseCurrentLocation;
			$(_dragObj).css("left", _dragObjCurrentLocation.x + "px");
			$(_dragObj).css("top", _dragObjCurrentLocation.y + "px");
			if (evt.preventDefault) {
				evt.preventDefault();
			} else {
				evt.returnValue = false;
			}
		}
	};
	var dragMouseUpHandler = function(evt) {
		if (_flag) {
			evt = evt || window.event;
			$("#jd_dialog_m_b_1").css("display", "none");
			cleanMouseHandlers();
			_flag = false;
		}
	};
	var cleanMouseHandlers = function() {
		if (_controlObj) {
			$(_controlObj.document).unbind("mousemove");
			$(_controlObj.document).unbind("mouseup");
		}
	};
	return {
		Register : function(dragObj, controlObj) {
			_dragObj = dragObj;
			_controlObj = controlObj;
			$(_controlObj).bind("mousedown", dragMouseDownHandler);
		}
	}        ;
}();
