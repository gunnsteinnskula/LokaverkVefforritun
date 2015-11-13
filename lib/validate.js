'use strict';

var validate = { };

validate.isEmail = function (email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
};

validate.required = function(s) {
	return s!=='';
};

validate.length=function(s, n){
	return s.length>=n;
};

validate.address=function(s){
	var res = s.split(" ");
	if(res.length>2)
		return false;
	res[0]=parseInt(res[0]);
	res[1]=parseInt(res[1]);
	if(!isNaN(res[0]) || isNaN(res[1]))
		return false;
	return true;
};

validate.oneOf=function(s, array){
	for(var n=0; n<array.length;n++){
		if(s===array[n])
			return true;
	}
	return false;
};

validate.phonenumber=function(s){
	var res=s.split("");
	var countNumbers=0;
	for(var n=0;n<res.length;n++){
		if(res[n]!==" "&&res[n]!=="-")
			res[n]=parseInt(res[n]);
		if(isNaN(res[n])&&res[n]!==" "&&res[n]!=="-")
			return false;
		if(typeof res[n]==="number")
			countNumbers++;
	}
	return(countNumbers===7&&(res[0]===4||res[0]===5||res[0]===6||res[0]===7||res[0]===8));

};

module.exports = validate;