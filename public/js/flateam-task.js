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
      $.get('/task/' + args.id, function(res) {
        if(res) {
          $('#recent').addClass('hide');
          $('#show').html(res).removeClass('hide');
        }
      });
    }
  }
});

var closeDetail = function() {
  $('.task-info').removeClass('a-fadein').addClass('a-fadeout');
  $('#show').addClass('hide');
  $('#recent').removeClass('hide').addClass('a-fadein');
}

var replyPost = function(post_id, content) {
  if(content == '') {
    $('#content').focus();
    return false;
  }
  $.post('/task/replyPost/' + post_id + '/' + content, function(res) {
    if(res.status == 'success') {
      // 清空文本框
      $('#content').val('');
      // 刷新列表
      var item = '<li id="item_'+ res.info._id +'" class="a-fadein"><a class="close ml10" onclick="replyRemove(\''+res.info._id+'\');" title="删除">×</a><a herf="">'+ res.info.name +'</a> '+ res.info.content +'</li>'
      $('.reply-list').prepend(item);
    }
  });
}

var replyRemove = function(id) {
  $.post('/task/replyRemove/' + id, function(res) {
    if(res.status == 'success') {
      $('.reply-list #item_' + id).fadeOut();
    }
  });
}