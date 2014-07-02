requirejs.config({
	baseUrl : "/javascripts/lib",
	paths : {
		jquery : "jquery",
		bootstrap : "bootstrap",
		jqEx : "/javascripts/lab/jq-extend",
	},
	shim: {
		'bootstrap': {
			deps: ['jquery'],
		},
		'jquery': {
			exports: '$'
		}
	}
});
requirejs(["jquery","bootstrap"], function($) {
	$(function () {
		$("body").scrollspy({
			target: ".navbar-m"
		});
		$("#affix").affix({
			offset: {
				top: 460, 
				bottom: 0
			}
		});
	});
});
