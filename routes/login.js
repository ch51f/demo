var db = require("../db");
var User = db.User;

//登录界面
exports.login = function(req, res, next){
	if(req.cookies.user_id){
		res.cookie('user_id', "");
		res.redirect("/bills/login");
	}
	res.render('bill/login', {
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
		if(user.length < 1) {
			res.redirect('/bills/login');
		} else {
			res.cookie('user_id', user[0].username + user[0].password);
			res.redirect('/bills');
		}
	});
}
