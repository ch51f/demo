exports.index = function (req, res, next) {
	res.render('lab/index',{
		layout : '',
		title : 'CH51F\'s Laboratory'
	})
}
exports.main = function (req, res, next) {
	res.render('lab/main',{
		layout : '',
		title : 'CH51F\'s Laboratory'
	})
}
exports.blindify = function (req, res, next) {
	res.render('lab/blindify',{
		layout : '',
		title : 'CH51F\'s Blindify'
	})
}
exports.carousel = function (req, res, next) {
	res.render('lab/carousel',{
		layout : '',
		title : 'CH51F\'s Carousel'
	})
}
exports.dialog = function (req, res, next) {
	res.render('lab/dialog',{
		layout : '',
		title : 'CH51F\'s Dialog'
	})
}
exports.drag = function (req, res, next) {
	res.render('lab/drag',{
		layout : '',
		title : 'CH51F\'s Drag'
	})
}