define(["backbone", "todoTemplate"], function (Backbone, T) {
	var Todo = Backbone.Model.extend({
		methodToURL: {
    		'read': '/todo/get',
    		'create': '/todo/create',
    		'update': '/todo/update',
			'delete': '/todo/remove'
		},
		sync: function(method, model, options) {
			options = options || {};
			if(method.toLowerCase() == 'delete') {
				options.url = model.methodToURL[method.toLowerCase()] + "?id=" + model.get("id");
			} else {
				options.url = model.methodToURL[method.toLowerCase()];
			}
			return Backbone.sync.apply(this, arguments);
		},
		defaults: function() {
			return {
				title: "empty todo...",
				time: "",
				t_order: Todos.nextOrder(),
				done: falsez
			}
		},
		toggle: function() {
			this.save({done: !this.get("done")});
		}
	});
	var TodoList = Backbone.Collection.extend({
		model: Todo,
		url: "/getTodos",
		done: function() {
			return this.where({done: true});
		},
		remaining: function() {
			return this.where({done: false});
		},
		nextOrder: function() {
			if(!this.length) return 1;
			return this.last().get("t_order") + 1;
		},
		comparator: "t_order"
	});
	var Todos = new TodoList;
	var TodoView = Backbone.View.extend({
		tagName: "li",
		template: _.template(T.item),
		events: {
			"click .toggle" : "toggleDone",
			"dblclick .view" : "edit",
			"click a.destroy" : "clear",
			"keypress .edit" : "updateOnEnter",
			"blur .edit" : "close"
		},
		initialize: function() {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass("done", this.model.get("done"));
			this.input = this.$(".edit");
			return this;
		},
		toggleDone: function() {
			this.model.toggle();
		},
		edit: function() {
			this.$el.addClass("editing");
			this.input.focus();
		},
		close: function() {
			var value = this.input.val();
			if(!value) {
				this.clear();
			} else {
				this.model.save({title: value});
				this.$el.removeClass("editing");
			}
		},
		updateOnEnter: function(e) {
			if(e.keyCode== 13) this.close();
		},
		clear: function() {
			this.model.destroy({"id" : this.model.id});
		}
	});
	var AppView = Backbone.View.extend({
		el: $("#todoapp"),
		statsTmplate: _.template(T.stats),
		events: {
			"keypress #new-todo": "createOnEnter",
			"click #clear-completed": "clearCompleted",
			"click #toggle-all": "toggleAllComplete"
		},
		initialize: function() {
			this.input = this.$("#new-todo");
			this.allCheckbox = this.$("#toggle-all")[0];
			this.listenTo(Todos, "add", this.addOne);
			this.listenTo(Todos, "reset", this.addAll);
			this.listenTo(Todos, "all", this.render);
			this.footer = this.$("footer");
			this.main = $("#main");
			Todos.fetch();
		},
		render: function() {
			var done = Todos.done().length;
			var remaining = Todos.remaining().length;
			if(Todos.length) {
				this.main.show();
				this.footer.show();
				this.footer.html(this.statsTmplate({done: done, remaining: remaining}));
			} else {
				this.main.hide();
				this.footer.hide();
			}
			this.allCheckbox.checked = !remaining;
			Todos.each(this.getId, this);
		},
		getId: function(todo) {
			todo.set("id", todo.get("id"));
		},
		addOne: function(todo) {
			if(todo.get("id")) {
				var view = new TodoView({model: todo});
				this.$("#todo-list").append(view.render().el);
			}
		},
		addAll: function() {
			Todos.each(this.addOne, this);
		},
		createOnEnter: function(e) {
			if(e.keyCode != 13) return;
			if(!this.input.val()) return;
			Todos.create({title: this.input.val(), time: ""});
			Todos.fetch();
			this.input.val("");
		},
		clearCompleted: function() {
			_.invoke(Todos.done(), "destroy");
			return false;
		},
		toggleAllComplete: function() {
			var done = this.allCheckbox.checked;
			Todos.each(function (todo) {
				todo.save({"done": done});
			});
		}
	});
	var App = new AppView;
});	