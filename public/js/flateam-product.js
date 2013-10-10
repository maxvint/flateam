M.addModelFns({
  productList: {
    mouseenter: function() {
      var args = M.getModelArgs(this);
      $('#product_' + args.id + ' .action').removeClass('hide');
    },
    mouseleave: function() {
      var args = M.getModelArgs(this);
      $('#product_' + args.id + ' .action').addClass('hide');
    }
  }
});

M.addEventFns({
  post: {
    click: function() {
      ui.load('/product/post', '添加产品');
    }
  }
});