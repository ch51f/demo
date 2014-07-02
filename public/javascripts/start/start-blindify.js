requirejs.config({
	baseUrl: '/javascripts/lib',

	paths: {
		jquery: "jquery",
		blindify: "/javascripts/lab/blindify"
	},

	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],

			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'jquery': {
			exports: '$'
		}
	}
});

requirejs(["jquery","blindify"], function($,B) {
	$(function() {
		$('#blindify').blindify();
	})
});