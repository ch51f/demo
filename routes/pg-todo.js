var pg = require("../pg");
var Client = pg.Client;


exports.todos = function(req, res, next){
	res.render('todo/todos', {
		layout: false
	});
};
exports.getTodos = function(req, res, next){
	var query = Client.query("select * from todo order by t_order", function (err,result) {
		console.log(result.rows);
		res.end(JSON.stringify(result.rows));
	});
};
exports.removeTodo = function(req, res, next){
	Client.query("DELETE FROM todo WHERE id=" + req.param("id") + ";");
};
exports.newTodo = function(req, res, next){
	console.log("ad");
	Client.query("INSERT INTO todo (title, t_order, done) VALUES ('" + req.param("title") + "', " + req.param("t_order") + ", " + req.param("done") + ");");
};
exports.updateTodo = function(req, res, next) {
	Client.query("UPDATE todo SET title='" + req.param("title") + "', t_order=" + req.param("t_order") + ", done=" + req.param("done") + " WHERE id=" + req.param("id") + ";");
};

