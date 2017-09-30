(function(){
	chrome.runtime.onInstalled.addListener(function() {
		chrome.contextMenus.create({
			id: "sendImgToLinkhay",
			title: "Gửi media",
			contexts: ["image"]
		});
	});
	
	chrome.contextMenus.onClicked.addListener(function(info, tab){
		
		var newTab = function(imgUrl, pageUrl, pageTitle){
			pageTitle = pageTitle.split(/[|-]/, 2)[0].trim();
			chrome.windows.create({
				url: "http://linkhay.com/about.php?qvAutoSubmitImage=" + encodeURIComponent(imgUrl) +
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
