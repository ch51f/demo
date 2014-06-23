define(function () {
	var _bills = "<table id='bills'>";
	_bills += "<tr>";
	_bills += "<th class='title'>标题</th>";
	_bills += "<th class='content'>内容</th>";
	_bills += "<th class='money'>金额（元）</th>";
	_bills += "<th class='date'>时间</th>";
	_bills += "<th class='operate'>操作</th>";
	_bills += "</tr>";
	_bills += "</table>";

	var _bill = "<td class='title'><%= title %></td>";
	_bill += "<td class='content'><%= content %></td>";
	_bill += "<td class='money'><% if (bill_flg == 0) { %>-<% } else { %>+<% } %><%= money %></td>";
	_bill += "<td class='date'><%= dateStr %></td>";
	_bill += "<td class='operate'><a href='javascript:;' class='update-bill'>修改</a> | <a href='javascript:;' class='remove-bill'>删除</a></td>";

	var _form = "<h4><%= title %></h4>";
	_form += "<label for='bill_title'><span>标题：</span><input required type='text' id='bill_title' value='<%= bill.title %>'></label>";
	_form += "<label for='bill_content'><span>内容：</span><input required type='text' id='bill_content' value='<%= bill.content %>'></label>";
	_form += "<label for='bill_flg'><span>流向：</span><input required type='text' id='bill_flg' list='bill_flg_list' value='<% if(bill.bill_flg == 0) { %>支出<% } else { %>收入<% } %>'>";
	_form += "<datalist id='bill_flg_list'>";
	_form += "<option value='支出'></option>";
	_form += "<option value='收入'></option>";
	_form += "</datelist>";
	_form += "</label>";
	_form += "<label for='bill_money'><span>金额：</span><input required type='text' id='bill_money' value='<%= bill.money %>'></label>";
	_form += "<label for='bill_date'><span>时间：</span><input required type='date' id='bill_date' value='<%= bill.dateStr %>'></label>";
	_form += "<a href='javascript:;' class='submit <%= type %>'>提交</a>";
	return {
		bills : _bills,
		bill : _bill,
		form : _form
	}
});