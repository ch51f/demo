exports.blindify = function (req, res, next) {
	res.render('lab/blindify',{
		layout : false,
		title : 'CH51F\'s Blindify'
	})
}
exports.carousel = function (req, res, next) {
	res.render('lab/carousel',{
		layout : false,
		title : 'CH51F\'s Carousel'
	})
}
exports.dialog = function (req, res, next) {
	res.render('lab/dialog',{
		layout : false,
		title : 'CH51F\'s Dialog'
	})
}
exports.drag = function (req, res, next) {
	res.render('lab/drag',{
		layout : false,
		title : 'CH51F\'s Drag'
	})
}