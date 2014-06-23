var db = require("../db");
var Bill = db.Bill;
var utils = require('connect').utils;

exports.index = function(req, res, next) {
	if(!req.cookies.user_id){
		res.redirect("/login");
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
		res.render('index', {
			title : '小小记账单',
			layout : "layout",
			bills : bills,
			total : total
		});
	});
};

exports.payin = function(req, res, next) {
	if(!req.cookies.user_id){
		res.redirect("/login");
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
		res.render('pay-in', {
			title : '小小记账单',
			layout : "layout",
			bills : bills,
			total : total
		});
	});
};

exports.payout = function(req, res, next) {
	if(!req.cookies.user_id){
		res.redirect("/login");
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
		res.render('pay-out', {
			title : '小小记账单',
			layout : "layout",
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
		res.redirect('/');
	});
};

exports.update = function( req, res, next ){
	Bill.findById( req.params.id, function ( err, bill ){
		if(bill.user_id !== req.cookies.user_id){
			return utils.forbidden( res );
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

			res.redirect( '/' );
		});
	});
};

exports.destroy = function ( req, res, next ){
	Bill.findById( req.params.id, function ( err, bill ){
		if( bill.user_id !== req.cookies.user_id ){
			return utils.forbidden( res );
		}

		bill.remove( function ( err, bill ){
			if( err ) {
					return next( err );
			}

			res.redirect( '/' );
		});
	});
};

exports.destroyAll = function(req, res, next){
	Bill.remove({"user_id": req.cookies.user_id}, function (err, bills) {
		if(err) {
			return next(err);
		}
		res.redirect('/');
	});
};

exports.updateAll = function(req, res, next){
	Bill.find(function (err, todos) {
		if(err) {
			return next(err);
		}
		for(var i in todos) {
			todos[i].user_id = req.cookies.user_id;
			todos[i].save();
		}
		res.redirect('/');
	})
};

exports.get_user = function(req, res, next){
	if(!req.cookies.user_id){
		res.cookie('user_id', getUid(32));
	}
	next();
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
