requirejs.config({
	baseUrl : "/javascripts/lib",
	paths : {
		jquery : "jquery",
		carousel : "/javascripts/lab/carousel"
	}
});
requirejs(["jquery","carousel"], function($) {
	$(function() {
		$('#carousel').carousel();
	})
});