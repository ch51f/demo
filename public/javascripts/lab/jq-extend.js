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
	$.fn.setSelecttion = function (selectionStart, selectionEnd) {
		if(this.length == 0) return this;
		input = this[0];
		if(input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd("character", selectionEnd);
			range.moveStart("character", selectionStart);
			range.select();
		} else if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		}
		return this;
	}
	$.fn.setCursorPosition = function (position) {
		if(this.length == 0) return this;
		return $(this).setSelecttion(position, position);
	}
	$.fn.focusEnd = function() {
		this.setCursorPosition(this.val().length);
	}
});
