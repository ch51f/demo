var pg = require("../pg");
var Client = pg.Client;

exports.bills = function(req, res, next) {
	if(!req.cookies.user_id){
		res.redirect("/bills/login");
	}
	var query = Client.query("select * from bill where user_id='" + req.cookies.user_id + "' order by date;", function (err,result) {
		var bills = result.rows;
		var total = 0;
		for(var i in bills){
			bills[i].dateStr = formatDate(bills[i].date);
			if(bills[i].bill_flg == 0) {
				total -= bills[i].money;
			} else {
				total += bills[i].money;
			}
		}
		res.render('bill/bills', {
			title : '小小记账单',
			layout : "bill/layout",
			bills : bills,
			total : total
		});
	});
};

exports.payin = function(req, res, next) {
	if(!req.cookies.user_id){
		res.redirect("/bills/login");
	}
	var query = Client.query("select * from bill where user_id='" + req.cookies.user_id + "' and bill_flg= 1 order by date;", function (err,result) {
		var bills = result.rows;
		var total = 0;
		for(var i in bills){
			bills[i].dateStr = formatDate(bills[i].date);
			if(bills[i].bill_flg == 0) {
				total -= bills[i].money;
			} else {
				total += bills[i].money;
			}
		}
		res.render('bill/pay-in', {
			title : '小小记账单',
			layout : "bill/layout",
			bills : bills,
			total : total
		});
	});
};

exports.payout = function(req, res, next) {
	if(!req.cookies.user_id){
		res.redirect("/bills/login");
	}
	var query = Client.query("select * from bill where user_id='" + req.cookies.user_id + "' and bill_flg= 0 order by date;", function (err,result) {
		var bills = result.rows;
		var total = 0;
		for(var i in bills){
			bills[i].dateStr = formatDate(bills[i].date);
			if(bills[i].bill_flg == 0) {
				total -= bills[i].money;
			} else {
				total += bills[i].money;
			}
		}
		res.render('bill/pay-out', {
			title : '小小记账单',
			layout : "bill/layout",
			bills : bills,
			total : total
		});
	});
};

exports.create = function(req, res, next){
	Client.query("INSERT INTO bill (user_id, title, content, bill_flg, money, date) VALUES ('" + req.cookies.user_id + "', '" + req.body.bill_title + "', '" + req.body.bill_content + "', " + formatBillFlg(req.body.bill_flg) + ", " + req.body.bill_money + ", '" + formatBillDate(req.body.bill_date) + "');");
	res.redirect('/bills');
};

exports.update = function( req, res, next ){
	Client.query("UPDATE bill SET title='" + req.body.bill_title + "', content='" + req.body.bill_content + "', bill_flg=" + formatBillFlg(req.body.bill_flg) + ", money=" + req.body.bill_money + ", date='" + formatBillDate(req.body.bill_date) + "' WHERE id=" + req.params.id + ";");
	res.redirect('/bills');
};

exports.destroy = function ( req, res, next ){
	Client.query("DELETE FROM bill WHERE id=" + req.params.id + ";");
	res.redirect('/bills');
};


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

var formatDate = function(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	return year + "-" + month + "-" + day;
}
