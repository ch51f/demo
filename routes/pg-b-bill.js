var pg = require("../pg");
var Client = pg.Client;


exports.index = function(req, res, next){
	res.cookie('user_id', "test1");
	res.render('bill/b-bills', {
		title : '小小记账单-实验室',
		layout : "bill/layout"
	});
};
exports.bills = function(req, res, next) {
	var query = Client.query("select * from bill where user_id='" + req.cookies.user_id + "' order by date;", function (err,result) {
		console.log(result.rows);
		res.end(JSON.stringify(result.rows));
	});
};
exports.billCreate = function(req, res, next){
	Client.query("INSERT INTO bill (user_id, title, content, bill_flg, money, date) VALUES ('" + req.cookies.user_id + "', '" + req.param("title") + "', '" + req.param("content") + "', " + formatBillFlg(req.param("bill_flg")) + ", " + req.param("money") + ", '" + formatBillDate(req.param("dateStr")) + "');");
};
exports.billUpdate = function(req, res, next) {
	Client.query("UPDATE bill SET title='" + req.param("title") + "', content='" + req.param("content") + "', bill_flg=" + formatBillFlg(req.param("bill_flg")) + ", money=" + req.param("money") + ", date='" + formatBillDate(req.param("dateStr")) + "' WHERE id=" + req.param("id") + ";");
};
exports.billRemove = function(req, res, next) {
	Client.query("DELETE FROM bill WHERE id=" + req.param("id") + ";");
}
var formatBillFlg = function(flg) {
	if(flg == "支出") {
		return 0;
	} else {
		return 1;
	}
}
var formatBillDate = function(date) {
	date = date.replace(/-/g,"");
	return date;
}
