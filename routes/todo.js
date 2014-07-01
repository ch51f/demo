var db = require("../db");
var Todo = db.Todo;


exports.todos = function(req, res, next){
	res.render('todo/todos', {
		layout: false
	});
};
exports.getTodos = function(req, res, next){
	Todo.find().exec( function (err, todos) {
		if(err) {
			return next(err);
		}
		res.end(JSON.stringify(todos));
	});
};
exports.removeTodo = function(req, res, next){
	Todo.findById(req.param("id")).exec( function (err, todo) {
		if(err) {
			return next(err);
		}
		todo.remove(function (err, todo) {
			if( err ) {
					return next( err );
			}
		})
	});
};
exports.newTodo = function(req, res, next){
	new Todo({
		title : req.param("title"),
		time : req.param("time"),
		order : req.param("order"),
		done : req.param("done"),
	}).save(function (err, todo, count){
		if(err) {
			return next(err);
		}
	});
};
exports.updateTodo = function(req, res, next) {
	Todo.findById( req.param("_id"), function ( err, todo ){
		todo.title = req.param("title");
		todo.time = req.param("time");
		todo.order = req.param("order");
		todo.done = req.param("done");
		todo.save(function(err, todo) {
			if( err ) {
				return next( err );
			}
		});
	});
};

