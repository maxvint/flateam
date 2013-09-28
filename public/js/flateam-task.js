M.addEventFns({
  post: {
    click: function() {
      ui.load('/task/post', '添加任务');
    }
  },
  finish: {
  	click: function() {
  		var args = M.getEventArgs(this);

  		$.post('/task/doFinish/' + args.id, function(res) {
  			if(res.status == 'success') {
  				var child = $('#task_' + args.id).find('a');
				if(res.info == 1) {
					child[0].className = 'finish';
					child[1].className = 'block';
				} else {
					child[0].className = 'finished';
					child[1].className = 'blocked';
				}
  			}
  		});
  	}
  }

});