define(function () {
	var itemtemplate = "<div class='view'>";
	itemtemplate += "<input class='toggle' type='checkbox' <%= done ? 'checked=\"checked\"' : '' %> >";
	itemtemplate += "<label><%= title %></label><span style'padding-left: 50px;'><%= time %></span>";
	itemtemplate += "<a class='destroy'></a>";
	itemtemplate += "</div>";
	itemtemplate += "<input class='edit' type='text' value='<%= title %>' >";
	var statstemplate = "<% if (done) { %>";
	statstemplate += "<a id='clear-completed'>Clear <%= done %> completed <%= done == 1 ? 'item' : 'items' %></a>";
	statstemplate += "<% } %>";
	statstemplate += "<div class='todo-count'><b><%= remaining %></b> <%= remaining == 1 ? 'item' : 'items' %> left</div>";
	return {
		item : itemtemplate,
		stats : statstemplate
	}
});