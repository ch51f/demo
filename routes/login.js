var db = require("../db");
var User = db.User;
var utils = require('connect').utils;

//登录界面
exports.login = function(req, res, next){
	if(req.cookies.user_id){
		res.cookie('user_id', "");
		res.redirect("/login");
	}
	User.find(function(err, users) {
		for(var i in users) {
			console.log(users[i].username);
		}
	})
	res.render('login', {
		title : "小小记账单登录",
		layout : ""
	});
};

//登录
exports.loginin = function(req, res, next){
	User.find({"username": req.body.username, "password": req.body.password}, function (err, user) {
		if(err) {
			return next(err);
		}
		console.log(user.length);
		if(user.length < 1) {
			res.redirect('/login');
		} else {
			res.cookie('user_id', user[0].username + user[0].password);
			res.redirect('/');
		}
	});
}
