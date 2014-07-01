requirejs.config({

	baseUrl: '/javascripts/lib',

	paths: {
		jquery: "jquery"
	}
});

requirejs(["jquery"], function($) {
	$(function() {
		var $addBill = $("#add-bill"),
			$updateBill = $(".update-bill"),
			$createForm = $("#create-form"),
			$updateForm = $("#update-form"),
			$mask = $("#mask"),
			$bills = $("#bills");
		$addBill.mouseenter(function () {
			$(this).text("点我新增账单●︿●");
		}).mouseleave(function () {
			$(this).text("点我新增账单●﹏●");
		}).click(function () {
			$mask.show(function () {
				$createForm.show();
			});
		});
		$updateBill.click(function () {
			if(!(!!$(this).data("id"))) {
				return false;
			}
			$updateForm.attr("action","bills/update/" + $(this).data("id"));
			$updateForm.find("input[name='bill_title']").attr("value", $(this).data("title"));
			$updateForm.find("input[name='bill_content']").attr("value", $(this).data("content"));
			$updateForm.find("input[name='bill_flg']").attr("value", ($(this).data("flg") == "1")? "收入" : "支出");
			$updateForm.find("input[name='bill_money']").attr("value", $(this).data("money"));
			$updateForm.find("input[name='bill_date']").attr("value", $(this).data("date"));
			$mask.show(function () {
				$updateForm.show();
			});
		});
		$mask.click(function () {
			$(".bill-form").find("input").each(function() {
				$(this).attr("value","");
			}).end().hide(function () {
				$mask.hide();
			})
		});
		$createForm.find("button").click(function() {
			$createForm.hide();
		});
		$updateForm.find("button").click(function() {
			$updateForm.hide();
		});
		$bills.find("tr:odd() td").css({
			"background": "#F8F7FC"
		})
	})
});