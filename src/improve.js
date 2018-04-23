// look and feel improvements goes here
window.Improver_ = window.Improver_ || (function($){

	var addCustomStyle = function(){
		var style = localStorage["qv_.customStyle"];
		if (!!style){
			var tag = document.createElement('style');
			tag.textContent = style;
			document.getElementsByTagName('head')[0].appendChild(tag);
		}
	}

	/*
	
	NOT VERY USEFUL, SO COMMENT OUT

	// function for converting some giphy
	var giphy = function(){
		$(".V2-comments .V2-comment-item .V2-comment-body a[title*='/media.giphy.com/media/']:not(.giphy_done_)").each(function(){
			var $t = $(this).addClass("giphy_done_");
			
			$("<img />").attr("src", $t.attr("title")).on("load", function(){
				var $i = $(this); 
				$t.text("Mở/đóng GIF")
					.after($("<p />").hide().css("margin", "0.5rem 0").append($i));
				$t.css({
					"background": "antiquewhite",
					"margin":"0 5px",
					"border-radius":"3px",
					"padding":"2px 6px",
					"font-size":"0.6rem"
				});
				$t.on("click", function(event){
					event.preventDefault();
					$i.parent().slideToggle("fast");
				});
			});
		});
	}
	
	*/
	
	// show domain for links embeded in comments
	// currently show as "https://goo.gl/iqBdHL" -> hard to spot spam
	var showLinkDomain = function(){
		$(".V2-comments .V2-comment-item .V2-comment-body a[href*='//goo.gl/']").each(function(){
			var $t = $(this);
			var targetUrl = $t.attr("title").split(/[?#]/)[0];
			var matches = targetUrl.match(/^(?:https?\:\/\/)?([^\/:?#]+)(?::[^\/]+)?(?:\/(.+))?$/i);
			if (matches) {
				var domain = matches[1];
				if (domain.indexOf("www.") === 0) {
					domain = domain.substr(4);
				}
						
				if (matches.length >= 3){
					if (matches[2].length <= 16) {
						domain = domain + "/" + matches[2];
					} else {
						domain = domain + "/…" + matches[2].substr(-15);
					}
				}
				
				if (!!domain) {
					$t.text(domain);
				}
			}
		});
	}
	
	var handleLinkPasted = function(){
		$(document).on('paste','#link-post-frm-url',function(e) {
			var text = (e.originalEvent || e).clipboardData.getData('text/plain');
			if (text.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/gi)) {
				window.setTimeout(function(){
							fetchDataForLink(text);
						}, 100);
			}
		});
	}
	
	var invokeLoadImage = function(url, el){
		if (url.match(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/gi)) {
			$(el || "#mediaV2_post_frm .url-uploader")[0].click();
			Util_.waitForEl(".LHV2-simple-frm .input-wrap input", 3000, function(input){
				$(input).val(url);
				$(".LHV2-simple-frm .action-bar .blue-btn")[0].click();
			});
		}
	}
	
	var handleImagePasted = function(){
		$(document).on('paste','#mediaV2_post_frm',function(e) {
			//e.stopPropagation();
			var url = (e.originalEvent || e).clipboardData.getData('text/plain');
			invokeLoadImage(url);
		});
	}
	
	// when submit link, fetch title and description and fill
	// textboxes as default values
	var fetchDataForLink = function(text, defaultTitle){
		// change focus right away to let thumbnail list loads asap
		if (!!$("#link-post-frm-url").val()) {
			$("#link-post-frm-desc").focus();
		}

		if (!text.match(/https?\:\/\/([^\/\.:?#]+)\.([^\/\.:?#]+)/i)) {
			if (defaultTitle) {
				$("#link-post-frm-title").val(defaultTitle.split(/[|-]/, 2)[0].trim());
			}
		} else {
			
			//$.get({url:text}).done(function(html){
			Util_.getPage({url:text}, function(html) {
				var site = KnownSites_.get(text);
				var nodeList = $.parseHTML("<div>" + html + "</div>");
				var $html = $(nodeList);
				
				if ($("#link-post-frm-cat").val() == -1) {
					var category = Cats_.match(text, $html, site);
					if (!!category){
						$("#link-post-frm-cat").val(category.id);
						$("#link-post-frm .cat-frm .selected-item>div").text(category.name);
					}
				}
				
				if ($("#qvCats_").length === 0) {
					var $cats = $('<div id="qvCats_" style="font-size: 9px;"><a data-val="9">Thời sự</a> <a data-val="12">Công nghệ</a> <a data-val="1">Giải trí</a> <a data-val="7">Kinh doanh</a> <a data-val="18">Văn hóa</a> <a data-val="28">Khoa giáo</a></div>').appendTo("#link-post-frm .cat-frm");
					$cats.find("a").css({
						"text-decoration": "underline",
						"padding-right": "1px",
						"cursor": "pointer"
					}).on("click", function(e){
						e.preventDefault();
						$("#link-post-frm-cat").val($(this).attr("data-val"));
						$("#link-post-frm .cat-frm .selected-item>div").text($(this).text());
					});
				}
				
				var title = null;
				var siteWork = false;
				if (!!site) {
					title = $html.find(site.title).first().text().trim();
					siteWork = !!title;
				}
				if (!title) {
					title = ($html.find("meta[property='og:title']").attr('content') || 
									$html.find("title").text()).trim();
				}
				
				if (!siteWork){
					var titleCandidate = $html.find("h1:not(:has(a))").first().text().trim();
					if (!!titleCandidate &&
							titleCandidate.length >= 5 &&
							(!title || (title.indexOf(titleCandidate) >= 0))) {
						title = titleCandidate;
					} else {
						!!title && (title = title.split(/[|-]/, 2)[0].trim());
					}
				}
				
				if (!!title) {
					$("#link-post-frm-title").val(title);
				}
				
				/*
				var desc = ($html.find("meta[property='og:description']").attr('content') || 
									$html.find("meta[name='description']").attr('content')).trim();
				if (!desc && !!site && !!site.lead) {
					desc = $html.find(site.lead).first().text();
				}
				
				if (!!desc) {
					if (!!site && !!site.replaceDesc){
						desc = desc.replace(site.replaceDesc, "");
					}
					desc = desc.split(/[|.?!]/, 2)[0].trim();
					var remainCount = Math.min(90, 199 - (title?title.length:0));
					while (desc.length > remainCount) {
						var descParts = desc.split(/(?:, |-|;)/);
						var lastPart = descParts.pop();
						//desc = descParts.join(", ").trim();
						desc = desc.substr(0, desc.length - lastPart.length).trim();
						desc = desc.substr(0, desc.length-1);
					}
					if (desc.length > 5) {
						$("#link-post-frm-desc").val(desc).focus(); //.replace(/[\s\.]+$/g, '')
					}
				}
				*/
				$("#link-post-frm-desc").attr("placeholder", "Thông điệp phụ - không bắt buộc").focus();
				
				var thumb = null;
				if (!!site && !!site.leadImg) {
					var $thumb = $html.find(site.leadImg).first();
					var thumbStyle = $thumb.attr("style");
					if (!!thumbStyle) {
						var matches = thumbStyle.match(/background\-image\s*:\s*url\s*\(\s*(.+)\s*\)/i);
						if (!!matches) {
							thumb = matches[1];
						}
					} else {
						thumb = $thumb.attr("data-src") || $thumb.attr("src");
					}
				}
				if (!thumb) {
					thumb = $html.find("meta[property='og:image']").attr('content');
				}
				
				if (!!thumb) {
					window.setTimeout(function(){
						$("#link-post-frm-embed-wrap, #link-post-frm-thumb-wrap").toggle();
						$("#link-post-frm-thumb").focus().val(thumb);
						$("#link-post-frm-desc").focus();
						window.setTimeout(function(){
							$("#link-post-frm-embed-wrap, #link-post-frm-thumb-wrap").toggle();
						}, 0);
						window.setTimeout(function(){
							var i, btn = $(".thumb-slide .next-btn")[0];
							btn.click();
							
							var $items = $(".thumb-slide .tray .item");
							var count = $items.length;
							
							// slide to begining
							if (count > 5) {
								for (i=0; i<=count/5;i++) {
									btn.click();
								}
							}
							
							// get the index of selected item
							var selectedIndex = $(".thumb-slide .tray .item.selected").index();
							if (selectedIndex > 5){
								var btn2 = $(".thumb-slide .previous-btn")[0];
								for (i=1; i<=(selectedIndex-1)/5;i++) {
									btn2.click();
								}
							}
							
						}, 1000);
					}, 1500);
				}
			});
		}
	}
	
	var onSubmitLink = function(){
		$("#lh-header a[class='submit']").on("click", function(){
			Util_.waitForEl("#link-post-frm-url", 3000, function(el){
				$(el).attr("placeholder", "Link muốn chia sẻ").focus();
				
				if (PageInfo_.query["qvautosubmitlink"]) {
					$(el).val(PageInfo_.query["qvautosubmitlink"]);
					window.setTimeout(function(){
						fetchDataForLink($(el).val(), PageInfo_.query["qvautosubmittitle"]);
					}, 0);
				}
				
				// this requires readClipboard permission
				// plus, should check if clipboard contains url
				// (by pasting to a background page's input first)
				// => pending
				//document.execCommand('paste');
				//fetchDataForLink($(el).val());
				
			});
		});
	}
	
	var onSubmitImage = function(){
		$("#lh-header a.submit.media").on("click", function(){
			Util_.waitForEl("#mediaV2_post_frm .url-uploader", 3000, function(el){
				if (PageInfo_.query["qvautosubmitimage"]) {
					var url = PageInfo_.query["qvautosubmitimage"];
					var title = PageInfo_.query["qvautosubmitimagepagetitle"];
					if (!!title) {
						$("#mediaV2_post_title").text(title);
						//$("#mediaV2_post_desc").focus();
						//$("#mediaV2_post_content").attr("tabindex", -1).focus();
						$("#mediaV2_poster_save_btn").focus();
					}
					invokeLoadImage(url, el);
				}	
			});
		});
	}
	
	var handleAddImage = function(){
		chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
			if (msg.command === 'sendImgToLinkhay_add') {
				// only add image if the "send media dialog is opening
				if ($("#mediaV2_post_frm .url-uploader").length > 0) {
					invokeLoadImage(msg.url);
					sendResponse({ok: true});
				} else {
					// tell the background to open new tab
					sendResponse({ok: false});
				}
			}
		});
	}
	
	var addQVIndicator = function(){
		var add = function(){
			$(".V2-link-stream .V2-link-list .V2-link-item .link-info:not(.indicator_done_)").each(function(){
				var $t = $(this);
				// no way to find out the real URL, so use the domain
				var domain = $t.find("a.source").text();
				if (!!KnownSites_.getByDomain(domain)) {
					var $c = $t.find("a.comments");
					$("<i />")
						.attr("title", "Có bản xem nhanh")
						.addClass("fa fa-bolt")
						.appendTo($c);
					$t.addClass("indicator_done_")
				}
			});
		};

		add();
		$(".V2-link-stream .V2-link-list").on("click", ".load-more", function(){
			window.setTimeout(function(){
				add();
			}, 1000);
		});
	}
	
	var execute = function(url) {

		if (!!PageInfo_.isExternalDetailedPage) {
			addCustomStyle();
			showLinkDomain();
		} else if (!!PageInfo_.isStream) {
			addQVIndicator();
		}
		
		onSubmitLink();
		handleLinkPasted();
		if (!!PageInfo_.query["qvautosubmitlink"]) {
			var submitLink = $("#lh-header a.submit:contains('Gửi tin')")[0];
			!!submitLink && submitLink.click();
		}
		
		onSubmitImage();
		handleImagePasted();
		if (!!PageInfo_.query["qvautosubmitimage"]) {
			var submitImg = $("#lh-header a.submit.media")[0];
			!!submitImg && submitImg.click();
		}
		
		handleAddImage();
		
		/*
		
		NOT VERY USEFUL, SO COMMENT OUT
		
		// convert GIF right away
		giphy();
		
		// convert GIF when user submits comments
		$(".V2-comments").on("click", ".V2-comment-frm .submit", function(){
			window.setTimeout(giphy, 1500);
			// backup, in case of delay :)
			window.setTimeout(giphy, 10000);
		});
		
		*/
	}
	
	return {
		execute: execute
	}
	
})(jQuery);