define(["jquery", "jqEx"], function($) {
	$.fn.fDrag = function (options) {
		var defaults = {
			focuEl : null,
			callback : null,
			dragDirection : "all",
			fixarea : null
		};
		var settings = $.extend(true, {}, defaults, options);
		return this.each(function () {
			var drag_flg = false;
			var $dragEl = $(this);
			var $focuEl = settings.focuEl ? $(settings.focuEl, $dragEl) : $dragEl;
			if(!$focuEl || $focuEl.length <= 0) {
				alert("拖拽元素配置错误！拖拽元素应该为" + $dragEl.id + "的子元素");
				return false;
			}

			var dragParams = {
				initDiffX : 0,
				initDiffY : 0,
				moveX : 0,
				moveY : 0
			};

			$dragEl.css({
				"position" : "absolute",
				"top" : 0,
				"left" : 0
			});

			$focuEl.bind("mousedown", function (e) {
				drag_flg = true;
				$focuEl.css({
					"cursor" : "move"
				});
				if($dragEl.get(0).setCapture) {
					$dragEl.get(0).setCapture();
				}
				dragParams.initDiffX = $.mouseCoords(e).x - $dragEl.position().left;
				dragParams.initDiffY = $.mouseCoords(e).y - $dragEl.position().top;
			}).bind("mousemove", function (e) {
				if(drag_flg) {
					dragParams.moveX = $.mouseCoords(e).x - dragParams.initDiffX;
					dragParams.moveY = $.mouseCoords(e).y - dragParams.initDiffY;
					if(settings.fixarea) {
						if(dragParams.moveX < settings.fixarea[0]) {
							dragParams.moveX = settings.fixarea[0];
						}
						if(dragParams.moveX > settings.fixarea[1]) {
							dragParams.moveX = settings.fixarea[1];
						}
						if(dragParams.moveY < settings.fixarea[2]) {
							dragParams.moveY = settings.fixarea[2];
						}
						if(dragParams.moveY > settings.fixarea[3]) {
							dragParams.moveY = settings.fixarea[3];
						}
					}
					if(settings.dragDirection === "all") {
						$dragEl.css({
							"left" : dragParams.moveX,
							"top" : dragParams.moveY
						});
					} else if (settings.dragDirection === "vertical") {
						$dragEl.css({
							"top" : dragParams.moveY
						});
					} else if (settings.dragDirection === "horizontal") {
						$dragEl.css({
							"left" : dragParams.moveX
						});
					}
					if(settings.callback) {
						settings.callback.call(settings.callback, dragParams);
					}
				}
			}).bind("mouseup", function (e) {
				drag_flg = false;
				$focuEl.css({
					"cursor" : "default"
				});
				if($dragEl.get(0).releaseCapture) {
					$dragEl.get(0).releaseCapture();
				}
			}).bind("mouseleave", function (e) {
				drag_flg = false;
				$focuEl.css({
					"cursor" : "default"
				});
			});
		})
	}
});
