var mongoose = require("mongoose");

var _Bill = new mongoose.Schema({
	user_id : String,
	title : String,
	content : String,
	bill_flg : Number,
	money : Number,
	date : Date
});

var _User = new mongoose.Schema({
	username : String,
	password : String,
	date : Date
});

var _Todo = new mongoose.Schema({
	title : String,
	time : String,
	order : Number,
	done : Boolean
});

exports.Bill = mongoose.model("Bill", _Bill);
exports.User = mongoose.model("User", _User);
exports.Todo = mongoose.model("Todo", _Todo);
mongoose.connect("mongodb://localhost/mydb");