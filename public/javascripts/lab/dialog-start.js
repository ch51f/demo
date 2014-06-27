requirejs.config({
	baseUrl : "/javascripts/lib",
	paths : {
		jquery : "jquery",
		dialog : "/javascripts/lab/dialog"
	}
});
requirejs(["jquery","dialog"], function($) {
	$(function() {
		$('a').fDialog({
		});
	})
});