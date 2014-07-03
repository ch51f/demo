exports.welcome = function (req, res, next) {
	res.render('welcome/welcome',{
		layout : false,
		title : 'CH51F'
	})
}
exports.index = function (req, res, next) {
	res.render('index', {
		title : 'CH51F',
		layout : 'layout/layout',
		navbar : {
			index : "index"
		}		
	})
}
exports.about = function (req, res) {
	res.render('about/about', {
		layout : false
	})
}
exports.laboratory = function (req, res, next) {
	res.render('laboratory',{
		title : 'CH51F\'s Laboratory',
		layout : 'layout/layout',
		navbar : {
			index : "lab"
		}
	})
}