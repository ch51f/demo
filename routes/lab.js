exports.index = function (req, res, next) {
	res.render('lab/index',{
		layout : '',
		title : 'Ch51F\'s Laboratory'
	})
}
exports.main = function (req, res, next) {
	res.render('lab/main',{
		layout : '',
		title : 'Ch51F\'s Laboratory'
	})
}
exports.blindify = function (req, res, next) {
	res.render('lab/blindify',{
		layout : '',
		title : 'Ch51F\'s Blindify'
	})
}