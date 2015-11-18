'use strict';
document.addEventListener('DOMContentLoaded',function() {
  console.log('DOM loaded');
  setjumTakkana();
});


function setjumTakkana(){
	var buttons = document.querySelectorAll('.formButton');
  	for (var i = 0; i < buttons.length; i++) {
    	buttons[i].addEventListener('click', function() {
      	console.log(this.value);
    });
  }
}