var pg = require("../pg");
var Client = pg.Client;

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
	var query = Client.query("select * from f_user where username='" + req.body.username + "' and password='" + req.body.password + "'", function (err,result) {
		if(result.rows < 1) {
			res.redirect('/bills/login');
		} else {
			console.log(result.rows[0].username);
			res.cookie('user_id', result.rows[0].username + result.rows[0].password);
			res.redirect('/bills');
		}
	});
}
