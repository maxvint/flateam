// ajax提交表单
$(document).ready(function() {
	$('#doLogin').submit(function() {
		$(this).ajaxSubmit({
			beforeSubmit: checkLogin,
			success: loginCallback,
      dataType: 'json'
		});
		return false;
	});
	// 提交前验证
  var checkLogin = function() {
    if($('#email').val().length == 0) {
      $('#email').focus();
      $('#message').html('<i class="icon-error"></i><p>请您输入邮箱</p>').show();
      return false;
    } else {
    	$('#message').hide();
    }
    if($('#password').val().length == 0) {
      $('#password').focus();
      $('#message').html('<i class="icon-error"></i><p>请您输入密码</p>').show();
      return false;
    } else {
    	$('#message').hide();
    }
    return true;
  };
  // 成功后的回调函数
  var loginCallback = function(res) {
    if(res.status == 'success') {
      $('#message').html('<i class="icon-error"></i><p>'+res.info+'</p>').show();
      window.location.href = '/';  
    } else {
      $('#message').html('<i class="icon-error"></i><p>'+res.info+'</p>').show();
    }
  };
});

// 事件监听
M.addModelFns({
  loginInput: {
    load: function() {
    	var focus = $('#email');
    	var next = $('#password');
      // 联想框
      $('#email').changeTips({
        divTip: '.on-changes',
        focusInput: focus,
        nextFocus: next
      });
    }
  }
});

/**
 * 登录流程，JQuery插件，用于显示感知框
 */
(function($) {
	$.fn.extend({
		changeTips: function(value) {
			// 初始化选择的类名
			value = $.extend({
					divTip: ""
			}, value);

			var $this = $(this);
			var indexLi = 0;
			// 绑定li点击事件
			$(document).click(function(event) {
				if($(event.target).is("li") && typeof($(event.target).attr('email')) != "undefined") {
					var liVal = $(event.target).text();
					$this.val(liVal);
					blus();
				} else {
					blus();
				}
			});
			// 下拉框消失
			var blus = function() {
				$(value.divTip).hide();
			}
			// 选中上下移动
			var keyChange = function(up) {
				if(up == "up") {
					if(indexLi == 0) {
						indexLi = $(value.divTip).find('li[rel="show"]').length - 1;
					} else {
						indexLi--;
					}
				} else {
					if(indexLi == $(value.divTip).find('li[rel="show"]').length - 1) {
						indexLi = 0;
					} else {
						indexLi++;
					}
				}
				$(value.divTip).find('li[rel="show"]').eq(indexLi).addClass("current").siblings().removeClass(); 
			}
			// 改变输入框中的值
			var valChange = function() {
				var tex = $this.val();
				var fronts = "";
				var af = /@/;
				var regMail = new RegExp(tex.substring(tex.indexOf("@")));
				if($this.val() == "") {
					blus();
				} else {
					$(value.divTip).show().find('li').each(function(index) {
						var valAttr = $(this).attr("email");
						if(index == 0) {
							$(this).text(tex).addClass('current').siblings().removeClass();
						}
						if(index > 0) {
							if(af.test(tex)) {
								fronts = tex.substring(tex.indexOf("@"), 0);
								$(this).text(fronts + valAttr);
								if(regMail.test($(this).attr("email"))) {
									$(this).attr('rel', 'show');
									$(this).css({position:'static', visibility:'inherit'});
								} else {
									if(index > 0) {
										$(this).attr('rel', 'hide');
										$(this).css({position:'absolute', visibility:'hidden'});
									}
								}
							} else {
								$(this).text(tex + valAttr);
							}
						}
					});
				}
			}
			// 浏览器的输入的兼容性
			if(!$.support.leadingWhitespace) {
				$(this).bind("propertychange", function() {
					valChange();
				});
			} else {
				$(this).bind("input", function() {
					valChange();
				});
			}
			// 触碰后的样式
			$(value.divTip).find('li').hover(function() {
				$(this).addClass("current").siblings().removeClass();
			});
			// 绑定按键事件
			$this.keydown(function(event) {
				if(event.which == 38) {
					// 按上
					keyChange("up");
				} else if(event.which == 40) {
					// 按下
					keyChange();
				} else if(event.which == 13) {
					// 按回车
					var liVal = $(value.divTip).find('li[rel="show"]').eq(indexLi).text();
					$this.val(liVal);
					blus();
					// 焦点定位
					typeof(value.nextFocus) != "undefined" && (value.focusInput.val().length != 0) && value.nextFocus.focus();
				} else if(event.which == 9) {
					blus();
				}
			});
		}
	});
})(jQuery);