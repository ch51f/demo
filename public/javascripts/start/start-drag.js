requirejs.config({
	baseUrl : "/javascripts/lib",
	paths : {
		jquery : "jquery",
		jqEx : "/javascripts/lab/jq-extend",
		drag : "/javascripts/lab/drag"
	}
});
requirejs(["jquery","drag"], function($) {
	$(function() {
		$("#drag").fDrag({
			callback : function(params) {
				$("#txt").text(params.moveX + " " + params.moveY);
			},
			fixarea : [0, $(window).width() - 100, 0, $(window).height() - 100]
		});
	})
});
