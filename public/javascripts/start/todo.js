requirejs.config({

	baseUrl: '/javascripts/lib',

	paths: {
		jquery: "jquery",
		todoModel: "/javascripts/backbone/todo",
		todoTemplate: "/javascripts/template/todo"
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

requirejs(["todoModel"], function() {
});