// look and feel improvements goes here
window.Improver_ = window.Improver_ || (function($){

	/*
	
	NOT VERY USEFUL, SO COMMENT OUT

	// function for converting some giphy
	var giphy = function(){
		$(".V2-comments .V2-comment-item .V2-comment-body a[title*='/media.giphy.com/media/']").not(".giphy_done_").each(function(){
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
		$(".V2-comments .V2-comment-item .V2-comment-body a[href*='https://goo.gl/']").not(".goo_gl_done_").each(function(){
			var $t = $(this).addClass("goo_gl_done_");
			var targetUrl = $t.attr("title").split(/[?#]/)[0];
			var matches = targetUrl.match(/^(?:https?\:\/\/)?([^\/:?#]+)(?::[^\/]+)?(?:\/(.+))?$/i);
			if (matches) {
				var domain = matches[1];
				if (domain.indexOf("www.") === 0) {
					domain = domain.substr(4);
				}
						
				if (matches.length >= 3){
					domain = domain + "/…" + matches[2].substr(-10);
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
			window.setTimeout(function(){
						fetchDataForLink(text);
					}, 100);
		});
	}
	
	// when submit link, fetch title and description and fill
	// textboxes as default values
	var fetchDataForLink = function(text){
		if (text.match(/https?\:\/\/([^\/\.:?#]+)\.([^\/\.:?#]+)/i)) {
			
			// change focus right away to let thumbnail list loads asap
			if (!!$("#link-post-frm-url").val()) {
				$("#link-post-frm-desc").focus();
			}
			
			$.get({url:text}).done(function(html){
				if ($("#link-post-frm-cat").val() == -1) {
					if (text.indexOf("genk.vn") >= 0) {
						// channel default to Tech
						$("#link-post-frm-cat").val(12);
						$("#link-post-frm .cat-frm .selected-item>div").text("Công nghệ");
					} else {
						// channel default to News
						$("#link-post-frm-cat").val(9);
						$("#link-post-frm .cat-frm .selected-item>div").text("Thời sự");
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
				
				var nodeList = $.parseHTML("<div>" + html + "</div>");
				var $html = $(nodeList);
				var site = KnownSites_.get(text);
				var title = null;
				if (!!site) {
					title = $html.find(site.title).text().trim();
				}
				if (!title) {
					title = $html.find("meta[property='og:title']").attr('content') || 
									$html.find("title").text();
				}
				
				if (!!title) {
					$("#link-post-frm-title").val(title);
				}
				
				var desc = $html.find("meta[property='og:description']").attr('content') || 
									$html.find("meta[name='description']").attr('content');
				if (!desc && !!site && !!site.lead) {
					desc = $html.find(site.lead).text();
				}
				
				if (!!desc) {
					$("#link-post-frm-desc").val(desc.replace(/[\s\.]+$/g, '').substr(0, 200)).focus();
				}
				
				var thumb = null;
				if (!!site && !!site.leadImg) {
					thumb = $html.find(site.leadImg).attr("src");
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
						fetchDataForLink($(el).val());
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
	
	var execute = function(url) {
		
		if (PageInfo_.isExternalDetailedPage) {
			showLinkDomain();
		}
		
		onSubmitLink();
		handleLinkPasted();
		if (!!PageInfo_.query["qvautosubmitlink"]) {
			var submitLink = $("#lh-header a.submit:contains('Gửi tin')")[0];
			!!submitLink && submitLink.click();
		}
		
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