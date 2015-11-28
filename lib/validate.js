'use strict';

var validate = { };

validate.isEmail = function (email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(re.test(email)){
    	return 'has-success had-feedback';
    }
    else{
    	return 'has-error had-feedback';
    }
};

validate.required = function(s) {
	if(s!==''){
		return 'has-success had-feedback';
	}
    else{
    	return 'has-error had-feedback';
    }
};

validate.length=function(s, n){
	if(s.length>=n){
		return 'has-success had-feedback';
	}
    else{
    	return 'has-error had-feedback';
    }
};

validate.address=function(s){
	var res = s.split(" ");
	if(res.length>2){
		return false;
	}
	res[0]=parseInt(res[0]);
	res[1]=parseInt(res[1]);
	if(!isNaN(res[0]) || isNaN(res[1])){
		return 'has-error had-feedback';
	}
	return 'has-success had-feedback';
};

validate.isPic = function(url) {
		var picurl = url.split("?");
    if(picurl[0].match(/\.(jpeg|jpg|gif|gifv|png)$/) !== null){
    	return 'has-success had-feedback';
    }
    else{
    	return 'has-error had-feedback';
    }
};

validate.phoneNumber=function(s){
	var res=s.split("");
	var countNumbers=0;
	for(var n=0;n<res.length;n++){
		if(res[n]!==" "&&res[n]!=="-"){
			res[n]=parseInt(res[n]);
		}
		if(isNaN(res[n])&&res[n]!==" "&&res[n]!=="-"){
			return false;
		}
		if(typeof res[n]==="number"){
			countNumbers++;
		}
	}
	if(countNumbers===7&&(res[0]===4||res[0]===5||res[0]===6||res[0]===7||res[0]===8)){
		return 'has-success had-feedback';
	}
    else{
    	return 'has-error had-feedback';
    }
};

module.exports = validate;
