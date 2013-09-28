


exports.index = function (req, res, next) {
  res.render('bug/index', {
    title: 'Bug',
    alias: 'bug',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
}