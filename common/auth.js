// 需要登录
exports.checkLogin = function(req, res, next) {
	if (!req.session.user) {
		req.flash('error', '请先登录!'); 
		res.redirect('/login');
	}
	next();
}

exports.checkNotLogin = function(req, res, next) {
	if (req.session.user) {
		req.flash('error', '已登录!'); 
		res.redirect('back');
	}
	next();
}