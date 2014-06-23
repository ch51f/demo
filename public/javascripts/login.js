requirejs.config({

	baseUrl: 'javascripts/lib',

	paths: {
		jquery: "jquery"
	}
});

requirejs(["jquery"], function($) {
	$(function() {
		var $getAccount = $("#get-account");
		$getAccount.click(function() {
			var $div = "<div id='div'></div>";
			$("body").append($div);
			$div = $("#div");
			$div.text("账号：fch，密码：1").css({
				"position" : "absolute",
				"left" : $getAccount.offset().left + "px",
				"top" : $getAccount.offset().top + "px",
				"border" : "1px solid #ccc",
				"background-color" : "#fff",
				"padding" : "5px",
				"border-radius" : "5px",
			}).mouseleave(function () {
				$(this).remove();
			})
		});
	});
});