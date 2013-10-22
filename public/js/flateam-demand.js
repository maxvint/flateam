M.addEventFns({
  post: {
    click: function() {
      ui.load('/demand/post', '添加需求');
    }
  },
  show: {
    click: function() {
      var args = M.getEventArgs(this);
      $.get('/demand/' + args.id, function(res) {
        if(res) {
          $('#recent').addClass('hide');
          $('#show').html(res).removeClass('hide');
        }
      });
    }
  }
});

var closeDetail = function() {
  $('.demand-info').removeClass('a-fadein').addClass('a-fadeout');
  $('#show').addClass('hide');
  $('#recent').removeClass('hide').addClass('a-fadein');
}

var demandRemove = function(id) {
  var doRemove = function() {
    $.post('/demand/doRemove/' + id, function(res) {
      if(res.status == 'success') {
        ui.success('删除成功');
        window.location.href = '/demand/';
      } else {
        ui.error('删除失败');
      }
    }, 'json');
  }
  ui.confirm(this, '您确定删除该需求？',doRemove);
}

// 讨论
var replyPost = function(post_id, content) {
  if(content == '') {
    $('#content').focus();
    return false;
  }
  $.post('/demand/replyPost/' + post_id + '/' + content, function(res) {
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
  $.post('/demand/replyRemove/' + id, function(res) {
    if(res.status == 'success') {
      $('.reply-list #item_' + id).fadeOut();
    }
  });
}