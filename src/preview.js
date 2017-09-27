var TEST_PREVIEW_URL_ = null;

window.Previewer_ = window.Previewer_ || (function($){

	// should load from template files
	var buildPreviewPane = function(){
		var $qvLink = $("<div id='qvLinkDiv_' style='display:none;margin-top:1rem'><button id='qvLink_'  style='background:#C00607;color:#f8f8f8;border-radius:3px;border:0;padding:4px 8px;font-size:0.75rem;cursor:pointer'>&#9889; Xem nhanh &#9889;</button></div>");
		$(".link-summary").append($qvLink);
		
		var $qv = $("<div id='qvDiv_' class='app-content'/>")
		var $style = $("<style>#qvDate_:empty, #qvDiv_ {display:none;position:relative;margin-top:0.5rem;padding: 0 0.8rem 0 1rem;font-size:1rem;line-height:1.556;clear:both} #qvContent_ h1 {padding:1rem 0 0.5rem;line-height: 1.36;font-size:1.3rem} #qvContent_ h2, #qvContent_ h3 {padding:1rem 0 0.5rem;line-height: 1.4} #qvContent_ a {text-decoration:underline} #qvDiv_ ul {padding-left:1rem} #qvDiv_ p, #qvDiv_ .p_, #qvContent_>div {padding-top:0.65rem} #qvDiv_ .quote_{float:none;font-size:1.1rem;border-left:5px solid grey;padding:0.5rem;margin:1.5em 0 0;font-style: italic} #qvDiv_ .media_ {margin-top:1rem;} #qvDiv_ img,#qvDiv_ video {max-width:100%;width:auto;height:auto} #qvDiv_ .caption_ {font-size:0.9rem;font-style:italic;line-height:1.5;display:block;margin-top: 0.3rem;} #qvDiv_ .b_ {font-weight:bold} figure {margin:0} #qvLead_:empty,#qvLeadImg_:empty,#qvLeadImgCaption_:empty {display:none}</style>");
		var $qvDate = $("<div id='qvDate_' style='font-size:0.75rem;color:gray;margin-top:0.8rem'/>");
		var $qvTitle = $("<h1 id='qvTitle_' style='font-size:1.5rem;line-height:1.36;padding:.5rem 0'/>");
		var $qvLead = $("<p id='qvLead_' style='font-weight:bold;padding-bottom: 0.2rem'/>");
		var $qvLeadImg = $("<div id='qvLeadImg_' class='media_' />");
		var $qvLeadImgCaption = $("<p id='qvLeadImgCaption_' class='caption_' style='margin-bottom:1rem'/>");
		var $qvContent = $("<div id='qvContent_' style='padding-bottom: 2rem;'/>");
		var $qvBottomBar = $("<div id='qvBottomBar_' style='font-size:0.75rem;background:antiquewhite;padding:2px 8px;margin:0 -0.8rem -1px -1rem;'><a href='https://chrome.google.com/webstore/detail/linkhay-quickview/jdiingledcmkbdenjnfelcoomapkcbpm/support' target='_blank'>Phản hồi về Xem nhanh</a><a href='#' id='qvClose_' style='float:right'>[&times;] ĐÓNG</a><div>");
		var $qvOverlay = $("<div id='qvOverlay_' style='display:none;position:absolute;left:0;bottom:0;right:0;background:linear-gradient(to bottom, transparent, #f4f5f7);padding:2rem 0 1rem;text-align:center'><button id='qvMore_'  style='background:#C00607;color:#f8f8f8;border-radius:3px;border:0;padding:4px 8px;font-size:0.75rem;cursor:pointer;box-shadow:0 8px 6px -6px gray'>ĐỌC TIẾP</button></div>");
		
		$qv.append($style).append($qvDate).append($qvTitle).append($qvLead).append($qvLeadImg).append($qvLeadImgCaption).append($qvContent).append($qvBottomBar).append($qvOverlay);
		$(".link-summary").append($qv);

		// Quick View button
		$("#qvLink_").click(function(event){
			event.preventDefault();
			if ($("#qvDiv_").height() >= 1120) {
				$("#qvDiv_").css({
					"overflow": "hidden",
					"max-height": "960px"
				});
				
				// Show the "read more" button panel
				$("#qvOverlay_").show("slow");
			}
			$("#qvDiv_").slideToggle("fast");
		});
		
		$("#qvClose_").click(function(event){
			event.preventDefault();
			$("#qvDiv_").hide();
			window.scrollTo(0, 0);
		});
		
		// "Read more" button
		$("#qvMore_").click(function(event){
			event.preventDefault();
			$("#qvDiv_").css({
				"overflow": "visible",
				"max-height": "none"
			});
			$("#qvOverlay_").fadeOut("fast");
		});
	}

	var metaReferrer = function(value){
		var meta = document.createElement('meta');
		meta.name = "referrer";
		meta.content = value;
		document.getElementsByTagName('head')[0].appendChild(meta);
	}

	var ensureProtocol = function(url, fullUrl) {
		if (url.indexOf("http") === 0) return url;
		
		var protocol = "http://";
		if (!!fullUrl && fullUrl.indexOf("https://") === 0) {
			protocol =  "https://";
		}
		return protocol + url;
	}
	
	var getBaseUri= function($html, site, fullUrl){
		var baseUri = "";
		var $base = $html.find("base");
		if ($base.length > 0) {
			baseUri = $base.attr("href");
			if (!!baseUri) return baseUri;
		}
		
		var protocol = "http://";
		if (!!fullUrl && fullUrl.indexOf("https://") === 0) {
			protocol =  "https://";
		}
		return protocol + site.domain;
	}
	
	// fix relative src/href
	var fixSrc = function($dom, site, url){
		$dom.find("img[data-src]").each(function(){
				if (!$(this).attr("src")) {
					$(this).attr("src", $(this).attr("data-src"));
				}
			});
		
		var baseUri = getBaseUri($dom, site, url);
		$dom.find("img[src], iframe[src]").each(function(){
			var src = $(this).attr("src");
			if (src.indexOf("http") !== 0) {
				if (src.indexOf("/") !== 0) src = "/" + src;
				$(this).attr("src", baseUri + src)
			}
		});
		
		$dom.find("a[href]").each(function(){
			var src = $(this).attr("href");
			if (src.indexOf("http") != 0) {
				if (src.indexOf("/") !== 0) src = "/" + src;
				$(this).attr("href", baseUri + src)
			}
		});
	}
	
	var process = function(html, site, url){
		var nodeList = $.parseHTML("<div>" + html + "</div>", null, !!site.keepScripts);
		var $html = $(nodeList);
		
		fixSrc($html, site, url);
		
		var $title = $html.find(site.title).first();
		if ($title.length === 0) {
			console.log("[QuickView] Article title not found: " + url);
			return;
		}

		var $date = null;
		if (site.date){
			$date = $html.find(site.date);
		}
		
		var $lead = null;
		if (site.lead){
			$lead = $html.find(site.lead).first();
		}
		var $leadImg = null;
		if (site.leadImg){
			$leadImg = $html.find(site.leadImg).first();
		}
		var $leadImgCaption = null;
		if (site.leadImgCaption){
			$leadImgCaption = $html.find(site.leadImgCaption).first();
		}
		
		var $content = $html.find(site.content).first();
		
		if (($content.length === 0) &&
			($lead === null || $lead.length === 0) &&
			($leadImg === null || $leadImg.length === 0)) {
				console.log("[QuickView] Article content not found: " + url);
				return;
			}
		
		// remove, hide, empty
		!!site.remove && $content.find(site.remove).remove();
		!!site.hide && $content.find(site.hide).hide();
		!!site.empty && $content.find(site.empty).empty();

		// Clean unwelcomed things
		$.each([$content, $lead, $leadImg], function(index, $tag){
			if (!!$tag) {
				$tag.find("[style]").removeAttr("style");
			}
		});
		
		!!site.p && $content.find(site.p).addClass("p_");
		!!site.quote && $content.find(site.quote).addClass("quote_");
		!!site.caption && $content.find(site.caption).addClass("caption_");
		!!site.media && $content.find(site.media).addClass("media_");
		if (!!site.dynamic) {
			var $newContent = site.dynamic($content, $html);
			if (($content.length === 0) && !!$newContent && ($newContent.length > 0)) {
				$content = $newContent;
			}
		}
		
		// Clean unwelcomed things
		$.each([$content, $lead, $leadImg], function(index, $tag){
			if (!!$tag) {
				$tag.find("style, script").remove();
				$tag.find("p, div").each(function() {
					var $this = $(this);
					if($this.html().replace(/\s|&nbsp;/g, '').length === 0) {
						$this.remove();
					}
				});
			}
		});
		
		// Make sure referrer is set for website which requires
		if (!!site.referrer) {
			metaReferrer(site.referrer);
		}
		
		// build preview pane
		buildPreviewPane();
		
		// append to preview pane
		if (!!$date) {
			if (!site.dateAttr){
				$("#qvDate_").text($date.text());
			} else {
				var unparsedDate = $date.attr(site.dateAttr);
				var parsedDate = Date.parse(unparsedDate);
				var dateString = unparsedDate;
				if (!isNaN(parsedDate)) {
					dateString = (new Date(parsedDate)).toLocaleString();
				}
				$("#qvDate_").text(dateString);
			}
		}
		$("#qvTitle_").text($title.text().trim());
		!!$lead && $("#qvLead_").append($lead);
		!!$leadImg && $("#qvLeadImg_").append($leadImg);
		!!$leadImgCaption && $("#qvLeadImgCaption_").text($leadImgCaption.text().trim());
		$("#qvContent_").append($content);
		
		// show the preview button
		if (!!site.alwaysShow || $("#qvDiv_").height() <= 800 ) {
			$("#qvLink_, #qvClose_").hide();
			$("#qvLinkDiv_, #qvDiv_").show();
		} else {
			$("#qvLinkDiv_").show();
			if (jQuery(window).scrollTop() + 50 < jQuery("#qvLink_").offset().top){
				$("#qvLink_").trigger("click");
			}
		}
	}
	
	var load = function(url, site){
		$.get({
			url: url,
			dataType: "html"
		}).fail(function(jqXHR, textStatus, errorThrown){
			console.log(textStatus + " (" + jqXHR.status + "): " + errorThrown);
			console.log(url);
		}).done(function(html){
			process(html, site, url);
		});
	}
	
	var execute = function(url) {
		url = TEST_PREVIEW_URL_ || url || PageInfo_.targetUrl;
		var site = KnownSites_.get(url);
		if (!site) {
			console.log("[QuickView] Unsupported: " + url);
			return;
		}
		
		// flattern javascript redirect (and meta refresh?)
		if (url.match(/^(https?:\/\/)?(cafef|cafebiz|kenh14).vn\/news-\d+.chn/)) {
			$.get({
				url: url,
				dataType: "html"
			}).done(function(html){
				var find = html.match(/\<body\s+onload\s*\=\s*"(?:window\.)?location\.href\s*\=\s*'(.+?)'/i);
				if (!!find) {
					var newUrl = find[1];
					if (newUrl.indexOf("http") !== 0) {
						newUrl = ensureProtocol(site.domain, url) + find[1];
					}
					load(newUrl, site);
				} else {
					process(html, site, url);
				}
			});
		} else {
			load(url,site);
		}
	}
	
	return {
		execute: execute
	}
	
})(jQuery);