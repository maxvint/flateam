


exports.index = function (req, res, next) {
  res.render('doc/index', {
    title: '文档',
    alias: 'doc',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
}