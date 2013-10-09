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

var taskRemove = function(id) {
  var doRemove = function() {
    $.post('/task/doRemove/' + id, function(res) {
      if(res.status == 'success') {
        ui.success('删除成功');
        location.href = '/task/';
      } else {
        ui.error('删除失败');
      }
    }, 'json');
  }
  ui.confirm(this, '您确定删除该任务？',doRemove);
}

var forward = function(id) {
  ui.load('/task/forward/' + id, '请选择要转让的同事');
}

var doForward = function(tid, uid, name) {
  $.post('/task/doForward/' + tid + '/' + uid + '/' + name, function(res) {
    if(res.status == 'success') {
      location.href = '/task/';
    } else {
      ui.error('转让失败');
    }
  });
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
      var item = '<li id="item_'+ res.info._id +'" class="a-fadein"><a class="close ml10" onclick="replyRemove(\''+res.info._id+'\');" title="删除">×</a><a href="/user/'+ res.info.uid +'"><img src="/img/avatar-small.jpg" class="avatar-tiny"></a><a href="/user/'+ res.info.uid +'">'+ res.info.name +'</a> '+ res.info.content +'</li>'
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