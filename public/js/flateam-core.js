

var core = {
  /**
   * 格式化日期为友好日期
   * @param date sTime 需要格式化的时间，Unix时间戳
   * @param date cTime 当前时间，Unix时间戳
   * @return date
   * @public
   */
  friendlyDate: function (sTime, cTime) {
    var formatTime = function (num) {
      return (num < 10) ? '0' + num : num;
    };
    if (!sTime) {
      return '';
    }
    var cDate = new Date(cTime * 1000);
    var sDate = new Date(sTime * 1000);
    var dTime = cTime - sTime;
    var dDay = parseInt(cDate.getDate()) - parseInt(sDate.getDate());
    var dMonth = parseInt(cDate.getMonth() + 1) - parseInt(sDate.getMonth() + 1);
    var dYear = parseInt(cDate.getFullYear()) - parseInt(sDate.getFullYear());

    if (dTime < 60) {
      if (dTime < 10) {
        return '刚刚';
      } else {
        return parseInt(Math.floor(dTime / 10) * 10) + '秒前';
      }
    } else if (dTime < 3600) {
      return parseInt(Math.floor(dTime / 60)) + '分钟前';
    } else if (dYear === 0 && dMonth === 0 && dDay === 0) {
      return '今天' + formatTime(sDate.getHours()) + ':' + formatTime(sDate.getMinutes());
    } else if (dYear === 0) {
      return formatTime(sDate.getMonth() + 1) + '月' + formatTime(sDate.getDate()) + '日 ' + formatTime(sDate.getHours()) + ':' + formatTime(sDate.getMinutes());
    } else {
      return sDate.getFullYear() + '-' + formatTime(sDate.getMonth() + 1) + '-' + formatTime(sDate.getDate()) + ' ' + formatTime(sDate.getHours()) + ':' + formatTime(sDate.getMinutes());
    }
  }
}