


exports.index = function (req, res, next) {
  res.render('task/index', {
    title: '任务',
    alias: 'task',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
}