'use strict';
document.addEventListener('DOMContentLoaded',function() {
  console.log('DOM loaded');
  setjumTakkana();
});




function setjumTakkana(){
	var buttons = document.querySelectorAll('.formButton');
  	for (var i = 0; i < buttons.length; i++) {
    	buttons[i].addEventListener('click', function() {
    		$.ajax({
				url: '/respondfriend',
				type: 'POST',
				data: {pressed: this.value},
				success: function() {
					location.reload();
				}, 
				error : function(err) {
					console.error(err);
				}
			});
    	});
    }
}
