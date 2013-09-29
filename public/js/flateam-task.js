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
				if(res.info == 0) {
					child[0].className = 'finish';
					child[1].className = 'block';
				} else {
					child[0].className = 'finished';
					child[1].className = 'blocked';
				}
  			}
  		});
  	}
  },
  showTask: {
    click: function() {
      var args = M.getEventArgs(this);
      console.log(args);
      $.post('/task/doShow/' + args.id, function(res) {
        // console.log(res);
        if(res.status == 'success') {
          var detail = '<div class="task-info a-fadein"><h5>任务详情<button type="button" class="close" onclick="closeDetail();">×</button></h5>\
            <h3>'+ res.data.title +'</h3><hr>\
            <h5>讨论</h5>\
            <div class="input-append">\
              <input class="input-large" id="comment_text" type="text" placeholder="请输入讨论内容">\
              <button class="btn btn-primary" type="submit">发送</button>\
            </div>\
            <ul>\
              <li>庾文辉 创建了任务</li>\
            </ul></div>';
            $('#recent').addClass('hide');
            $('#show').html(detail).removeClass('hide');
          
        }
      });
    }
  }

});

var closeDetail = function() {
  $('.task-info').removeClass('a-fadein').addClass('a-fadeout');
  $('#show').addClass('hide');
  $('#recent').removeClass('hide').addClass('a-fadein');
  console.log('33');
}