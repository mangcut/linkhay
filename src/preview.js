var TEST_PREVIEW_URL_ = null;

window.Previewer_ = window.Previewer_ || (function($){

	// should load from template files
	var buildPreviewPane = function(site){
		var $qvLink = $("<div id='qvLinkDiv_'><button id='qvLink_'><i class='fa fa-bolt' aria-hidden='true'></i> Xem nhanh</button></div>");
		$(".link-summary").append($qvLink);
		
		var $qv = $("<div id='qvDiv_' />")
		var qvClass = site.domain.replace(/\./g, "-");
		!!site.extraClass && (qvClass += " " + site.extraClass);
		$qv.addClass(qvClass);
		
		
		var $qvTopBar = $("<div id='qvTopBar_'><span id='qvDate_' /><span id='qvOldNews_' /></div>");
		var $qvTitle = $("<h1 id='qvTitle_' />");
		var $qvLead = $("<div id='qvLead_' />");
		var $qvLeadImg = $("<div id='qvLeadImg_' class='media_ media-img_' />");
		var $qvLeadImgCaption = $("<p id='qvLeadImgCaption_' class='caption_'/>");
		var $qvContent = $("<div id='qvContent_' />");
		var $qvBottomBar = $("<div id='qvBottomBar_'><a href='https://chrome.google.com/webstore/detail/linkhay-quickview/jdiingledcmkbdenjnfelcoomapkcbpm/support' target='_blank'>Phản hồi về Xem nhanh</a><a href='#' id='qvClose_'>[&times;] ĐÓNG</a><div>");
		var $qvOverlay = $("<div id='qvOverlay_'><button id='qvMore_'>ĐỌC TIẾP</button></div>");
		var $qvTools = $("<div id='qvTools_' title='Đổi cỡ chữ'><i data-font-size='12' class='fa fa-font' aria-hidden='true' /><i data-font-size='14' class='fa fa-font' aria-hidden='true' /><i data-font-size='16' class='fa fa-font' aria-hidden='true' /></div>");
		$qvTools.find("i").on("click", function(){
			var fontSize = $(this).attr("data-font-size") + "px";
			document.documentElement.style.fontSize = fontSize;
			if (fontSize === "16px") {
				localStorage.removeItem("qv_.customStyle");
			} else {
				localStorage["qv_.customStyle"] = "html{font-size:" + fontSize + "}"
			}
		});
		
		$qv.append($qvTopBar)
			.append($qvTitle)
			.append($qvLead)
			.append($qvLeadImg)
			.append($qvLeadImgCaption)
			.append($qvContent)
			.append($qvBottomBar)
			.append($qvOverlay)
			.append($qvTools);
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
			if (!$(this).hasClass("clicked_")){
				$(this).addClass("clicked_");
				var list = localStorage["qv_.viewedList"];
				if (!!list) {
					list = list.split("|");
				} else {
					list = [];
				}
				if (list.indexOf(PageInfo_.linkID) < 0) {
					list.unshift(PageInfo_.linkID);
					if (list.length > 100) list.length = 100;
					localStorage["qv_.viewedList"] = list.join("|");
				}
			}
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
			if (src.indexOf("http") !== 0 && src.indexOf("//") !== 0) {
				if (src.indexOf("/") !== 0) src = "/" + src;
				$(this).attr("src", baseUri + src)
			}
		});
		
		$dom.find("a[href]").each(function(){
			var src = $(this).attr("href");
			if (src.indexOf("http") != 0 && src.indexOf("//") !== 0) {
				if (src.indexOf("/") !== 0) src = "/" + src;
				$(this).attr("href", baseUri + src)
			}
		});
	}
	
	var showImageBox = function($img){
		if (!$img || $img.length === 0) return;
		if ($img.length === 1 && $img[0].nodeName != "IMG") {
				$img = $img.find("img");
		}
		
		$img.on("click", function(e){
				e.preventDefault();
				var src = null;
				var $lb = $(this).parent("a[rel='lightbox'], a[data-lightbox], a.detail-img-lightbox, a.fancybox");
				if ($lb.length === 1){
					src = $lb.attr("href");
				}
				if (!src){
					 src = $(this).attr("data-original") || $(this).attr("src");
				}
				!!src && Util_.showImageBox(src);
			});
	}
	
	var process = function(html, site, url){
		var nodeList = $.parseHTML("<div>" + html + "</div>", null, !!site.keepScripts);
		var $html = $(nodeList);
		
		if (site.matchHtml) {
			site = KnownSites_.get(url, $html);
			if (site.replaceUrl) {
				url = url.replace(site.replaceUrl[0], site.replaceUrl[1]);
			}
		}

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
		
		// content do not use .first() since we could not guarantee
		// there's single mother tag for content
		// if want .first to fetch first of several articles on same page
		// use :first in selector
		var $content = $html.find(site.content);//.first();
		
		if (($content.length === 0) &&
			($lead === null || $lead.length === 0) &&
			($leadImg === null || $leadImg.length === 0)) {
				console.log("[QuickView] Article content not found: " + url);
				return;
		}
		
		// Clean unwelcomed things
		if (!site.keepStyle) {
			$.each([$content, $lead, $leadImg], function(index, $tag){
				if (!!$tag) {
					$tag.find("[style]").removeAttr("style");
				}
			});
		}
		
		!!site.p && $content.find(site.p).addClass("p_");
		!!site.quote && $content.find(site.quote).addClass("quote_");
		!!site.infoBox && $content.find(site.infoBox).addClass("info-box_");
		if (!!site.media) {
			var $mediaList = $content.find(site.media).addClass("media_");
			$mediaList.each(function(){
				var $il = $(this).find("img");
				if ($il.length === 1){
					$(this).addClass("media-img_")
				}
				
				var $vl = $(this).find("video");
				if ($vl.length === 1){
					$(this).addClass("media-video_")
				}
			});
		}
		!!site.caption && $content.find(site.caption).addClass("caption_");
		if (!!site.dynamic) {
			var $newContent = site.dynamic($content, $html, {
				$title: $title,
				$date: $date,
				$lead: $lead,
				$leadImg: $leadImg,
				$leadImgCaption: $leadImgCaption
			});
			if (($content.length === 0) && !!$newContent && ($newContent.length > 0)) {
				$content = $newContent;
			}
		}

		showImageBox($leadImg);
		showImageBox($content.find(".media_ img[src]"));		
		
		// remove, hide, empty
		!!site.remove && $content.find(site.remove).remove();
		!!site.hide && $content.find(site.hide).hide();
		!!site.empty && $content.find(site.empty).empty();
		
		// Clean unwelcomed things + ajust some style
		$.each([$content, $lead, $leadImg], function(index, $tag){
			if (!!$tag) {
				$tag.find("style, script").remove();
				$tag.find("p, div, h1, h2, h3, h4, h5, h6, a[name]").each(function() {
					var $this = $(this);
					var html = $this.html().replace(/\s|&nbsp;/g, '').toLowerCase();
					if(html.length === 0 || html === "<br>" || html === "<br/>") {
						$this.remove();
					}
				});
				
				$tag.find("iframe[width]").each(function(){
					var ifWidth = $(this).attr("width");
					if (ifWidth === "100%" || ifWidth > 640){
						$(this).css({
							"width": "640px",
							"height": "360px",
						});
					}
					if (ifWidth === "100%" || ifWidth > 624) {
						$(this).css("margin-left", "-16px");
					}
				});
				
				$tag.find("video:not([controls])").attr("controls", "");
			}
		});
		
		// Make sure referrer is set for website which requires
		if (!!site.referrer) {
			metaReferrer(site.referrer);
		}
		
		// build preview pane
		buildPreviewPane(site);
		
		// append to preview pane
		var dateObj = null;
		var dateText = null;
		if (!!$date) {
			if (!site.dateAttr){
				dateText = $date.text();
				$("#qvDate_").text(dateText);
			} else {
				var dateText = $date.attr(site.dateAttr);
				var parsedDate = Date.parse(dateText);
				var dateString = dateText;
				if (!isNaN(parsedDate)) {
					dateObj = new Date(parsedDate);
					dateString = dateObj.toLocaleString();
				}
				$("#qvDate_").text(dateString);
			}
		}
		
		if (!dateObj && !!dateText) {
			var dateMatches = dateText.match(/([0-3]\d?)(?:\/|-)(\d\d?)(?:\/|-)((?:19|20)\d\d)/);
			if (!!dateMatches && dateMatches.length === 4){
				dateObj = new Date(dateMatches[3],dateMatches[2]-1,dateMatches[1])
			}
		}
		
		if (!!dateObj){
			var dateDiff = parseInt((new Date() - dateObj)/(24*3600*1000));
			if (dateDiff >= 7) {
				// old article warning
				$("#qvOldNews_").text(dateDiff + " ngày trước").show();
			}
		}
		
		var qvTitle = $title.text().trim();
		if (qvTitle !== PageInfo_.title) {
			$("#qvTitle_").text(qvTitle);
		}
		!!$lead && $("#qvLead_").append($lead.attr("id", "qvLeadInner_"));
		!!$leadImg && $("#qvLeadImg_").append($leadImg.attr("id", "qvLeadImgInner_"));
		!!$leadImgCaption && $("#qvLeadImgCaption_").text($leadImgCaption.text().trim());
		if ($content.length > 1) {
			$("#qvContent_").append("<div id='qvContentInner_' />");
			$("#qvContentInner_").append($content);
		} else {
			$("#qvContent_").append($content.attr("id", "qvContentInner_"));
		}
		
		// show the preview button
		$("#qvLinkDiv_").show();
		if (Util_.shouldExpand()){
			$("#qvLink_").trigger("click");
		}
	}
	
	var load = function(url, site){
		//$.get({
		Util_.getPage({
			url: url
		}, function(html){
			process(html, site, url);
		}, function(errorThrown){
			console.log(errorThrown);
			console.log(url);
		});
	}
	
	var execute = function(url) {
		url = TEST_PREVIEW_URL_ || url || PageInfo_.targetUrl;
		var site = KnownSites_.get(url);
		if (!site) {
			console.log("[QuickView] Unsupported: " + url);
			return;
		}
		
		if (!!site.replaceUrl) {
			url = url.replace(site.replaceUrl[0], site.replaceUrl[1]);
		}

		// turn t.me to embed
		if (url.indexOf("https://t.me/") === 0 && url.indexOf("embed=1") < 0) {
			url += "?embed=1";
		}
		
		// flattern javascript redirect (and meta refresh?)
		if (url.match(/^(https?:\/\/)?(cafef|cafebiz|kenh14|dantri\.com)\.vn\/news-\d+(\.\w+)?/)) {
			//$.get({
			Util_.getPage({
				url: url
			}, function(html){
				//var find = html.match(/\<body\s+onload\s*\=\s*"(?:window\.)?location\.href\s*\=\s*'(.+?)'/i);
				var find = html.match(/(?:window\.)?(?:top\.)?location(?:\.href)?\s*\=\s*'(.+?)'/i);
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
			load(url, site);
		}
	}
	
	return {
		execute: execute
	}
	
})(jQuery);