M.addModelFns({
  feedList: {
    mouseenter: function() {
      
      var c = $(this).find('.delFeed');
      $(c).removeClass('hide');

    },
    mouseleave: function() {
      var c = $(this).find('.delFeed');
      $(c).addClass('hide');
    }
  }
});


M.addEventFns({
  post: {
    click: function() {
      ui.load('/project/post', '创建项目');
    }
  },
  stick: {
    click: function() {
      var args = M.getEventArgs(this);
      console.log(args);
    }
  },
  start: {
    click: function() {
      ui.success('操作成功');
    }
  },
  remove: {
    click: function() {
      var args = M.getEventArgs(this);
      var doRemove = function() {
        $.post('/project/doRemove/' + args.id, function(res) {
          if(res.status == 'success') {
            ui.success('删除成功');
            $('#' + args.id).fadeOut();
          } else {
            ui.error('删除失败');
          }
        }, 'json');
      }
      ui.confirm(this, '您确定删除该项目？',doRemove);
    }
  },
  delay: {
    click: function() {
      ui.load('/project/delay', '项目延期');
    }
  },
  end: {
    click: function() {
      var args = M.getEventArgs(this);
      var doEnd = function() {
        $.post('/project/doEnd/' + args.id, function(res) {
          if(res.status == 'success') {
            ui.success('操作成功');
          } else {
            ui.error('操作失败');
          }
        }, 'json');
      }
      ui.confirm(this, '您确定结束该项目？', doEnd);
    }
  },


  // project feed
  msgfield: {
    focus: function() {
      $('.post-action').fadeIn();
    },
    // blur: function() {
    //   if($(this).val() == '') {
    //     $('.post-action').fadeOut();
    //   }
    // },
    keyup: function() {
      if($(this).val() !== '') {
        $('#doSendmsg').removeClass('disabled');
      } else {
        $('#doSendmsg').addClass('disabled');
      }
    },
    keydown: function() {
      if($(this).val() !== '') {
        $('#doSendmsg').removeClass('disabled');
      } else {
        $('#doSendmsg').addClass('disabled');
      }
    }
  },
  sendmsg: {
    click: function() {
      var args = M.getEventArgs(this);
      var pid = args.id;
      var content = $('#msgfield').val();

      if(content) {
        $.post('/project/doAddFeed', {pid: pid, content: content}, function(res) {
          if(res.status == 'success') {
            var date = Math.round(new Date().getTime()/1000);
            var ctime = core.friendlyDate(res.data.ctime, date);
            var html = '<dt class="head">\
              <a href="" class="avatar"><img src="/img/avatar.jpg" width="60" height="60" class="img-circle"></a>\
              <h5><a href="/user/'+ res.data.uid +'">'+ res.data.name +'</a></h5>\
              <p class="feed-info">\
                <span>'+ ctime +'<a href="javascript:void(0)" event-node="delFeed" event-args="id='+ res.data._id +'" class="delFeed ml20 hide">删除</a></span>\
                <span class="pull-right"></span>\
              </p></dt>\
              <dd class="body">\
                <p class="feed-body">'+ res.data.content +'</p>\
              </dd>\
              <dd class="foot">\
                <div class="control-group">\
                  <input type="text" name="title" class="input-xxxlarge" id="title" placeholder="我也说一句">\
                </div>\
              </dd>';

            if($('.pro-feed').length > 0) {
              var before = $('.pro-feed dl').eq(0);
              $dl = $('<dl></dl>');
              $dl.attr('model-node', 'feedList');
              $dl.attr('id', 'feed' + res.data._id);
              $dl.addClass('feed-item a-fadein');
              $dl.html(html);

              if(before.length > 0) {
                $dl.insertBefore(before);
              } else {
                if($('.pro-feed').find('dl').size() > 0) {
                  $('.pro-feed').append($dl);
                } else {
                  $('.pro-feed').html($dl);
                }
              }
              M($dl[0]);
            }

            // 清空发布框数据
            $('#msgfield').val('');
            // 设置发布按钮
            $('#doSendmsg').addClass('disabled');

          } else {
            ui.error('操作失败', 1);
          }
        }, 'json');
      }
    }
  },
  delFeed: {
    click: function() {
      var args = M.getEventArgs(this);
      var doDelFeed = function() {
        $.post('/project/doDelFeed/' + args.id, function(res) {
          if(res.status == 'success') {
            $('#feed' + args.id).fadeOut();
            ui.success('删除成功');
          } else {
            ui.error('删除失败');
          }
        }, 'json');
      }
      ui.confirm(this, '您确定删除该动态？', doDelFeed);
    }
  } 
});


