requirejs.config({
	baseUrl : "/javascripts/lib",
	paths : {
		jquery : "jquery",
		dialog : "/javascripts/lab/dialog"
	}
});
requirejs(["jquery","dialog","drag"], function($) {
	$(function() {
		$('a').fDialog({
		});
		$("#drag").fDrag();
	})
});
