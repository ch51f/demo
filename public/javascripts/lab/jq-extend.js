define(["jquery"], function($) {
	$.extend({
		mouseCoords : function (event) {
			if(event.pageX || event.pageY) {
				return {
					x : event.pageX,
					y : event.pageY
				};
			}
			return {
				x : event.clientX + document.body.scrollLeft - document.body.clientLeft,
				y : event.clientY + document.body.scrollTop - document.body.clientTop
			};
		},
		getStyle : function (obj, styleName) {
			return obj.currentStyle ? obj.currentStyle[styleName] : document.defaultView.getComputedStyle(obj, null)[styleName];
		}
	});
});
