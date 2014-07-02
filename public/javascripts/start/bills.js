requirejs.config({

	baseUrl: '/javascripts/lib',

	paths: {
		jquery: "jquery",
		myM: "/javascripts/my/myModel",
		bill: "/javascripts/backbone/bill",
		date: "/javascripts/my/date",
		billTemplate: "/javascripts/template/bill"
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

requirejs(["bill"], function() {
});