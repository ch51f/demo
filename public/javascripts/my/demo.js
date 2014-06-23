define(["backbone", "bill", "date"], function (Backbone, T, D) {
	var Bill = Backbone.Model.extend({
		methodToURL: {
    		'read': '/bill/get',
    		'create': '/bill/create',
    		'update': '/bill/update',
			'delete': '/bill/remove'
		},
		sync: function(method, model, options) {
			options = options || {};
			if(method.toLowerCase() == 'delete') {
				options.url = model.methodToURL[method.toLowerCase()] + "?id=" + model.get("id");
			} else {
				options.url = model.methodToURL[method.toLowerCase()];
			}
			return Backbone.sync.apply(this, arguments);
		},
		defaults: function() {
			return {
				title: "",
				content: "",
				bill_flg: 0,
				money: 0,
				dateStr: ""
			}
		}
	});
	var BillList = Backbone.Collection.extend({
		model: Bill,
		methodToURL: {
    		'read': '/bills/get',
    		'create': '/bills/create',
    		'update': '/bills/update',
			'delete': '/bills/remove'
		},
		sync: function(method, model, options) {
			options = options || {};
			options.url = model.methodToURL[method.toLowerCase()];
			return Backbone.sync.apply(this, arguments);
		},
		comparator: "date"
	});
	var Bills = new BillList;
	Bills.fetch();
	var BillView = Backbone.View.extend({
		tagName: "tr",
		template: _.template(T.bill),
		events: {
			"click .update-bill": "updateForm",
			"click .remove-bill": "delete"
		},
		initialize: function() {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		updateForm: function() {
			var view = new FormView({model: this.model});
			this.$el.append(view.update().el);
		},
		delete: function() {
			this.model.destroy();
		}
	});
	var BillApp = Backbone.View.extend({
		el: $("#bill-app"),
		// appTemplate: _.template(T.bills),
		events: {
			"click #add-bill": "createForm"
		},
		initialize: function() {
			this.listenTo(Bills, "add", this.addOne);
			this.listenTo(Bills, "reset", this.addAll);
			this.listenTo(Bills, "all", this.render);
		},
		render: function() {
			if(Bills.length) {
				Bills.each(this.getId, this);
				this.$("#bills").show();
			} else {
				this.$("#bills").hide();
			}
		},
		getId: function(bill) {
			bill.set("id", bill.get("_id"));
			if(bill.get("date")) {
				bill.set("dateStr", new Date(bill.get("date")).Format("YYYY-MM-DD"));
			}
		},
		addOne: function(bill) {
			var view = new BillView({model: bill});
			this.$("#bills tbody").append(view.render().el);
		},
		addAll: function() {
			Bills.each(this.addOne, this);
		},
		createForm: function() {
			var view = new FormView();
			this.$el.append(view.create().el);
		}
	});
	var FormView = Backbone.View.extend({
		tagName: "form",
		className: "bill-form",
		template: _.template(T.form),
		events: {
			"click .create": "createBill",
			"click .update": "updateBill"
		},
		initialize: function() {},
		create: function() {
			this.showMask();
			this.$el.html(this.template({title: "新账单", bill: {
				title: "",
				content: "",
				bill_flg: "",
				money: "",
				dateStr: ""
			}, type: "create"})).show();
			this.inputTitle = this.$("#bill_title");
			this.inputContent = this.$("#bill_content");
			this.inputFlg = this.$("#bill_flg");
			this.inputMoney = this.$("#bill_money");
			this.inputDate = this.$("#bill_date");
			return this;
		},
		update: function() {
			this.showMask();
			this.$el.html(this.template({title: "修改账单", bill: this.model.toJSON(), type: "update"})).show();
			this.inputTitle = this.$("#bill_title");
			this.inputContent = this.$("#bill_content");
			this.inputFlg = this.$("#bill_flg");
			this.inputMoney = this.$("#bill_money");
			this.inputDate = this.$("#bill_date");
			return this;
		},
		showMask: function() {
			$("#mask").show().click(function () {
				$(".bill-form").remove();
				$(this).hide();
			});
		},
		createBill: function() {
			Bills.create({title: this.inputTitle.val(), content: this.inputContent.val(), bill_flg: this.inputFlg.val(), money: this.inputMoney.val(), dateStr: this.inputDate.val()});
			Bills.fetch();
			$("#bills tbody").find("td").parent().remove();
			this.$el.remove();
			$("#mask").hide();
		},
		updateBill: function() {
			this.model.save({title: this.inputTitle.val(), content: this.inputContent.val(), bill_flg: this.inputFlg.val(), money: this.inputMoney.val(), dateStr: this.inputDate.val(), date: new Date(this.inputDate.val().replace(/-/g,"/"))});
			this.$el.remove();
			$("#mask").hide();

		}
	});
	var app = new BillApp;
});