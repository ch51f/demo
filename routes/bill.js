var db = require("../db");
var Bill = db.Bill;

exports.bills = function(req, res, next) {
	if(!req.cookies.user_id){
		res.redirect("/bills/login");
	}
	Bill.find({"user_id": req.cookies.user_id}).sort({date: 1,_id: 1}).exec( function (err, bills) {
		if(err) {
			return next(err);
		}
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
	Bill.find({"user_id": req.cookies.user_id,"bill_flg": 1}).sort({date: 1,_id: 1}).exec( function (err, bills) {
		if(err) {
			return next(err);
		}
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
	Bill.find({"user_id": req.cookies.user_id,"bill_flg": 0}).sort({date: 1,_id: 1}).exec( function (err, bills) {
		if(err) {
			return next(err);
		}
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
	new Bill({
			user_id : req.cookies.user_id,
			title : req.body.bill_title,
			content : req.body.bill_content,
			bill_flg : formatBillFlg(req.body.bill_flg),
			money : req.body.bill_money,
			date : formatBillDate(req.body.bill_date)
	}).save(function (err, bill, count){
		if(err) {
				return next(err);
		}
		res.redirect('/bills');
	});
};

exports.update = function( req, res, next ){
	Bill.findById( req.params.id, function ( err, bill ){
		if(bill.user_id !== req.cookies.user_id){
			res.redirect("/bills/login");
		}

		bill.title = req.body.bill_title;
		bill.content = req.body.bill_content;
		bill.bill_flg = formatBillFlg(req.body.bill_flg);
		bill.money = req.body.bill_money;
		bill.date = formatBillDate(req.body.bill_date);
		bill.save( function ( err, bill, count ){
			if( err ) {
					return next( err );
			}

			res.redirect('/bills');
		});
	});
};

exports.destroy = function ( req, res, next ){
	Bill.findById( req.params.id, function ( err, bill ){
		if( bill.user_id !== req.cookies.user_id ){
			res.redirect("/bills/login");
		}

		bill.remove( function ( err, bill ){
			if( err ) {
					return next( err );
			}

			res.redirect('/bills');
		});
	});
};


var formatBillFlg = function(flg) {
	if(flg == "支出") {
		return 0;
	} else {
		return 1;
	}
}
var formatBillDate = function(date) {
	date = date.replace(/-/g,"/");
	return new Date(date);
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
