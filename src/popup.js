(function(){
	//localStorage["qv_.stopAsking"] = false;
	var stopAsking = (localStorage["qv_.stopAsking"] === "true");
	var sendLink = function(url, index) {
		chrome.tabs.create({
			url: "http://linkhay.com/about.php?qvAutoSubmitLink=" + encodeURIComponent(url),
			index: index
		});
		window.close();
	}
	
	chrome.tabs.query({
				active: true, currentWindow: true
			}, function(tabs) {
					var url = tabs[0].url
							index = tabs[0].index + 1;
				if (stopAsking) {
					sendLink(url, index);
				} else {
					document.getElementById("url").textContent = url;
					document.getElementById("sendLink").addEventListener('click', function() {
						localStorage["qv_.stopAsking"] = !!document.getElementById("stopAsking").checked;
						sendLink(url, index);;
					});
				}
			});
			
})();
