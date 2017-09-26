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
			var domain = matches && matches[1];
			
			if (matches.length >= 3){
				domain = domain + "/…" + matches[2].substr(-10);
			}
			
			if (!!domain) {
				$t.text(domain);
			}
		});
	}
	
	// when submit link, fetch title and description and fill
	// textboxes as default values
	var fetchDataWhenSubmit = function(){
		$(document).on('paste','#link-post-frm-url',function(e) {
			var text = (e.originalEvent || e).clipboardData.getData('text/plain');
			if (text.match(/https?\:\/\/([^\/\.:?#]+)\.([^\/\.:?#]+)/i)) {
				$.get({url:text}).done(function(html){
					if ($("#link-post-frm-cat").val() == -1) {
						// channel default to News
						$("#link-post-frm-cat").val(9);
					}
					
					var nodeList = $.parseHTML("<div>" + html + "</div>");
					var $html = $(nodeList);
					var site = KnownSites_.get(text);
					var title = null;
					if (!!site) {
						title = $html.find(site.title).text().trim();
					}
					if (!title) {
						title = $html.find("meta[property='og:title']").attr('content').trim() || 
										$html.find("title").text().trim();
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
						$("#link-post-frm-desc").val(desc.replace(/[\s+\.]$/g, '').substr(0, 200)).focus();
					}
				});
			}
	});
	}
	
	var execute = function(url) {
		
		if (PageInfo_.isExternalDetailedPage) {
			showLinkDomain();
		}
		
		fetchDataWhenSubmit();
		
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