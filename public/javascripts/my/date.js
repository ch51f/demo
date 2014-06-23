define(function () {
	Date.prototype.Format = function(formatStr) {
	var str = formatStr;
	var Week = ['日', '一', '二', '三', '四', '五', '六'];
	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
	str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
	str = str.replace(/M/g, (this.getMonth() + 1));
	str = str.replace(/w|W/g, Week[this.getDay()]);
	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());
	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());
	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());
	return str
	}
	function addZore(num) {
    	var re = /^[1-9]+[0-9]*]*$/ ;   //判断字符串是否为数字/^[0-9]+.?[0-9]*$/     //判断正整数 /^[1-9]+[0-9]*]*$/   
    	if(!re.test(num)) {
        	alert("格式化时间失败，传入格式不对");
    	}
    	if(num < 10) {
        	num = "0" + num;
    	}
    	return num;
	}
	return {
		getCurrentTime : function(flag) {
			var currentTime = "";
    		var now = new Date();
    		var year = now.getFullYear();
    		var month = (now.getMonth() + 1);
    		var date = now.getDate();
    		var hour = now.getHours();
    		var minute = now.getMinutes();
    		var second = now.getSeconds();
    		var day = now.getDay();

    		month = addZore(month);
    		date = addZore(date);
    		hour = addZore(hour);
    		minute = addZore(minute);
   		 	second = addZore(second);

    		var week = "日一二三四五六"[day];

   		 	if(flag == 0) {
    	    	currentTime = year + "/" + month + "/" + date + " " + hour + ":" + minute + ":" + second; 
   		 	} else if(flag == 1) {
     		   	currentTime = year + "年" + month + "月" + date + "日" + " 星期" + week;
    		}
    		return currentTime;
		}
	}
});