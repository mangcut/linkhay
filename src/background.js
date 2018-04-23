(function(){
	chrome.runtime.onInstalled.addListener(function() {
		chrome.contextMenus.create({
			id: "sendImgToLinkhay",
			title: "Gửi media",
			contexts: ["image"]
		});
	});

	/**
	 * Possible parameters for request:
	 *  action: "xhttp" for a cross-origin HTTP request
	 *  method: Default "GET"
	 *  url   : required, but not validated
	 *  data  : data to send in a POST request
	 *
	 * The callback function is called upon completion of the request */
	chrome.runtime.onMessage.addListener(function (request, sender, callback) {
		if (request.action == "xhttp") {
			var xhttp = new XMLHttpRequest();
			var method = request.options.method ? request.options.method.toUpperCase() : 'GET';

			xhttp.onload = function() {
				callback({
					error: null,
					text: xhttp.responseText
				});
			};
			xhttp.onerror = function(e) {
				callback({
					error: e
				})
			};
			xhttp.open(method, request.options.url, true);
			if (method === 'POST') {
				xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			}
			xhttp.send(request.options.data);
			return true; // prevents the callback from being called too early on return
		}
	});
	
	chrome.contextMenus.onClicked.addListener(function(info, tab){
		
		var newTab = function(imgUrl, pageUrl, pageTitle){
			pageTitle = pageTitle.split(/[|-]/, 2)[0].trim();
			chrome.windows.create({
				url: "https://linkhay.com/about.php?qvAutoSubmitImage=" + encodeURIComponent(imgUrl) +
							"&qvAutoSubmitImagePageUrl" + encodeURIComponent(pageUrl) +
							"&qvAutoSubmitImagePageTitle=" + encodeURIComponent(pageTitle),
				//type: "popup",
				width: 1580,
				height: 960
			});
		}
		
		if (info.menuItemId === "sendImgToLinkhay") {
			chrome.tabs.query({
				url: "*://linkhay.com/about.php?qvAutoSubmitImage=http*"
			}, function(tabs) {
				if (tabs.length > 0){
					chrome.tabs.sendMessage(tabs[0].id, {
						command: "sendImgToLinkhay_add",
						url: info.srcUrl
					}, function(res){
						!res.ok && newTab(info.srcUrl, info.pageUrl, tab.title);
					});
					// bring windows to focus (if it alreay, then nothing)
					//chrome.windows.update(tabs[0].windowId, {focused: true}, function(){
						// bring tab to front
						chrome.tabs.update(tabs[0].id, {"active": true, "highlighted": true});
					//});
				} else {
					newTab(info.srcUrl, info.pageUrl, tab.title);
				}
			});
		}
	})
})();
