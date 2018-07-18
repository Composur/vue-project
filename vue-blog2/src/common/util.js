//全局方法 挂载到Vue原型上
export default{
  install(Vue,options)
  {
    Vue.prototype.formatDate = function (d) {
      const date1 = new Date(d);
      const newDate = {};
      newDate.year = date1.getFullYear();
      newDate.month = date1.getMonth() + 1;
      newDate.day = date1.getDate();
      newDate.hour = date1.getHours();
      newDate.min = date1.getMinutes();
      newDate.sec = date1.getSeconds();

      for (let k in newDate) {
        if (newDate[k] < 10) {
          newDate[k] = '0' + newDate[k];
        }
      }

      return newDate.year + '-' + newDate.month + '-' + newDate.day + ' ' + newDate.hour + ':' + newDate.min + ':' + newDate.sec;
    }
  },
}
