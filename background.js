(function(global){
	chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
			switch (request.cmdID) {
					case "loadExternalUrl":
						chrome.tabs.executeScript(sender.tab.id, {
								file: "jquery-3.2.1.min.js",
								runAt: "document_start"
						}, function(){
								chrome.tabs.executeScript(sender.tab.id, {
									file: "loadExternalUrl.js",
									runAt: "document_end"
						})});
						sendResponse({});
						break;
					
					case "createTab":
						chrome.tabs.query({active: true}, function(tabs){
							chrome.tabs.create({ url: request.url, index: tabs[0].index+1 })
						})
						sendResponse({});
						break;
			}
    }
	);
})(this);
