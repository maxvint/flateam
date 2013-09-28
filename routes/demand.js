


exports.index = function (req, res, next) {
  res.render('demand/index', {
    title: '需求',
    alias: 'demand',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
}