define(["backbone"], function (Backbone) {
	var object = {};
	_.extend(object, Backbone.Events);
	object.bind("alert", function (msg) {
		alert("Triggerd " + msg);
	});
	object.bind("alert", func1);
	object.unbind("alert", func1);
	var Sidebar = Backbone.Model.extend({
		promptColor: function() {
			var cssColor = prompt("请输入一个CSS颜色值：");
			this.set({color: cssColor});
		}
	});
	var Bill = Backbone.Model.extend({
		defaults: {
			"title": "新账单",
			"content": "支出账目",
			"bill_flg": 0,
			"money": 0,
			"date": new Date()
		}
	});
	var Bills = Backbone.Collection.extend({
		model: Bill
	});
	return {
		demo4 : function() {
			var bill1 = new Bill();
			var bill2 = new Bill();
			var bills = new Bills([bill1, bill2]);
			bills.add({title: "123",content: "555"});
			bills.remove([bill1, bill2]);
			alert(bills.getByCid());
			bills.each(function(bill) {
				alert(bill.get("title"));
			})
		},
		demo1 : function() {
			var hacker = new Backbone.Model({
				name: "<script>alert('xss')</script>"
			});
			hacker.unset("name");
			if(hacker.has("name")) {
				alert(1);
			}
			alert(hacker.get("name"));
			alert(hacker.escape("name"));
		},
		demo2 : function() {
			var Chapter = Backbone.Model.extend({
 				validate: function(attrs) {
  					if (attrs.end < attrs.start) {
    					return "can't end before it starts";
  					}
 				 }
			});

			var one = new Chapter({
  				title : "Chapter One: The Beginning"
			});

			one.bind("invalid", function(model, error) {
  				alert(model.get("title") + " " + error);
			});

			one.set({
  				start: 15,
  				end:   20
			}, {validate: true});
		},
		bill : function(obj) {
			var bill = new Bill(obj);
			bill.bind("change:title", function(model) {
				$("#sidebar").text(model.previous("title") + " to " + model.get("title"));
			});
			bill.promptTitle();
		},
		sidebar : function() {
			window.sidebar = new Sidebar;

			sidebar.bind("change:color", function(model, color) {
				alert(model + "/n" + color);
				$("#sidebar").css({background: color});
			});
			sidebar.set({color: 'white'});

			sidebar.promptColor();
		},
		a: function(txt) {
			object.trigger("alert", txt);
		},
		demo3: function() {
			var Book = Backbone.Model.extend({urlRoot: "/books"});
			var solaris = new Book({id: "1083-lem-solaris"});

			solaris.fetch();
			alert(solaris.url());
		}
	}
});
var func1 = function() {
	alert(1);
}