var db = require("../db");
var Bill = db.Bill;
var utils = require('connect').utils;


exports.demo = function(req, res, next){
	res.render('demo', {
		title : '小小记账单-实验室',
		layout : "layout"
	});
};
exports.bills = function(req, res, next) {
	Bill.find({"user_id": req.cookies.user_id}).sort({date: 1,_id: 1}).exec( function (err, bills) {
		if(err) {
			return next(err);
		}
		res.end(JSON.stringify(bills));
	});
};
exports.billCreate = function(req, res, next){
	new Bill({
		user_id : req.cookies.user_id,
		title : req.param("title"),
		content : req.param("content"),
		bill_flg : formatBillFlg(req.param("bill_flg")),
		money : req.param("money"),
		date : formatBillDate(req.param("dateStr"))
	}).save(function (err, bill, count){
		if(err) {
				return next(err);
		}
	});
};
exports.billUpdate = function(req, res, next) {
	Bill.findById( req.param("_id"), function ( err, bill ){
		bill.title = req.param("title");
		bill.content = req.param("content");
		bill.bill_flg = formatBillFlg(req.param("bill_flg"));
		bill.money = req.param("money");
		bill.date = formatBillDate(req.param("dateStr"));
		bill.save(function(err, bill) {
			if( err ) {
				return next( err );
			}
		});
	});
};
exports.billRemove = function(req, res, next) {
	Bill.findById( req.param("id"), function ( err, bill ){
		if(err) {
			return next(err);
		}
		bill.remove(function (err, bill) {
			if( err ) {
					return next( err );
			}
		})
	});
}
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
