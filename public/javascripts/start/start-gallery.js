requirejs.config({
	baseUrl : "/javascripts/lib",
	paths : {
		jquery : "jquery",
		gallery : "/javascripts/lab/gallery"
	}
});
requirejs(["jquery","gallery"], function($) {
	$(function() {
		$("#gallery").gallery();
	})
});
