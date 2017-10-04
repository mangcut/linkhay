window.PageInfo_ = window.PageInfo_ || (function($){
	
	var info = {};
	
	// if this is a normal-link detailed page 
	// that is, not index, media, or note page
	info.isExternalDetailedPage = ($(".V2-link-voter-list").length === 1 &&
		$("#admrecommen").length === 1 &&
		$(".link-summary .link-info .info .source").text() != "linkhay.com");
	
	if (!!info.isExternalDetailedPage) {
		// if a builtin preview available (like the one for Youtube link)
		info.hadBuiltinPreview = ($(".link-summary .app-content").length > 0);
		info.targetUrl = $("#admrecommen").data("url").toLowerCase();
		info.title = $(".link-summary .title h1").text().trim();
		info.linkID = $(".link-summary .V2-vote-box").attr("link-id");
	} else {
		info.isStream = ($(".V2-link-stream ul.V2-link-list").length > 0);
	}
	
	info.query = 	Util_.query(window.location.href);
	info.user = $("#account-username").text().trim();
	
	//console.log(info);
	return info;
	
})(jQuery);