(function(){
	var stopAsking = (localStorage["qv_.stopAsking"] === "true");
	var sendLink = function(url, title, index) {
		chrome.tabs.create({
			url: "https://linkhay.com/about.php?qvAutoSubmitLink=" + encodeURIComponent(url) +
				"&qvAutoSubmitTitle=" + encodeURIComponent(title),
			index: index
		});
		window.close();
	}
	
	chrome.tabs.query({
				active: true, currentWindow: true
			}, function(tabs) {
					var url = tabs[0].url,
						index = tabs[0].index + 1,
						title = tabs[0].title
				if (stopAsking) {
					sendLink(url, title, index);
				} else {
					document.getElementById("url").textContent = url;
					document.getElementById("sendLink").addEventListener('click', function() {
						localStorage["qv_.stopAsking"] = !!document.getElementById("stopAsking").checked;
						sendLink(url, title, index);;
					});
				}
			});
			
})();
