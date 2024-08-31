$(document).ready(function($){
	$().ready(function(){
		var cook = readCookie('style');
		if (cook == 'eyes') {
			$('#default-style').after('<link rel="stylesheet" href="https://dmsu.gov.ua/assets/css/eyes.css" id="eyes-style">');
		};
		$('#switch-styles').on('click', function() {
			
			var cookies = readCookie('style');
			
			if (cookies == 'eyes') {
				$('#eyes-style').remove();
				createCookie('style', 'default', 365);
			} else {
				$('#default-style').after('<link rel="stylesheet" href="https://dmsu.gov.ua/assets/css/eyes.css" id="eyes-style">');
				createCookie('style', 'eyes', 365);
			}
		})
	});
});

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    } else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
