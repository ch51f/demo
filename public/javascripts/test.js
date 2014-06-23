requirejs.config({

	baseUrl: 'javascripts/lib',

	paths: {
		jquery: "jquery",
		myM: "../my/myModel",
		myTest: "../my/test",
		todoTemplate: "../template/todo"
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

requirejs(["myTest"], function(T) {
});