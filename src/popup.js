(function(){
	document.addEventListener('DOMContentLoaded', function () {
		var btn = document.getElementById("sendLink");
		btn.addEventListener('click', function() {
			chrome.tabs.query({
				active: true, currentWindow: true
			}, function(tabs) {
				window.open("http://linkhay.com/about.php?qvAutoSubmitLink=" + encodeURIComponent(tabs[0].url))
			});
		});
	});
		
})();
