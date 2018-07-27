function getDateDiff(dateTimeStamp){
	let minute = 1000 * 60;
	let hour = minute * 60;
	let day = hour * 24;
	let halfamonth = day * 15;
	let month = day * 30;
	let now = new Date().getTime();
    let diffValue = now - dateTimeStamp;
    let monthC =diffValue/month;
	let weekC =diffValue/(7*day);
	let dayC =diffValue/day;
	let hourC =diffValue/hour;
    let minC =diffValue/minute;
    let result=null;
	if(diffValue < 0){
        return;
    }else{
        if(monthC>=1){
            result="" + parseInt(monthC) + "月前";
        }
        else if(weekC>=1){
            result="" + parseInt(weekC) + "周前";
        }
        else if(dayC>=1){
            result=""+ parseInt(dayC) +"天前";
        }
        else if(hourC>=1){
            result=""+ parseInt(hourC) +"小时前";
        }
        else if(minC>=1){
            result=""+ parseInt(minC) +"分钟前";
        }else{
            result="刚刚";
        }
    }
	return result;
}
let result=new Date('2018-04-04 11:35:16').getTime()
console.log(result)
console.log(getDateDiff(result))