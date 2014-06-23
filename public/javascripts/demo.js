requirejs.config({

	baseUrl: 'javascripts/lib',

	paths: {
		jquery: "jquery",
		myM: "../my/myModel",
		myDemo: "../my/demo",
		date: "../my/date",
		bill: "../template/bill"
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

requirejs(["myDemo"], function(D) {
});