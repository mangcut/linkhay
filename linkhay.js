(function($){
	
	// check if this is a normal-link detailed page 
	// that is, not index, media, or note page
	var isNormalDetailedPage = ($(".V2-link-voter-list").length === 1 &&
		$("#admrecommen").length === 1 &&
		$(".link-summary .link-info .info .source").length === 1 &&
		$(".link-summary .link-info .info .source").text() != "linkhay.com");
	
	if (!isNormalDetailedPage) return;
	
	// already had built-in preview pane (like youtube link)
	var hasAppContent = ($(".link-summary .app-content").length > 0);
	
	// hide the trash (ads, fb, etc.)
	//$(".top-adv, .V2-old-style-sidebar-box, .controls, .fb-box").remove();
	$(".top-adv, .fb-box").remove();
	$("#admzone449, #admzone963, #admzone3174").parent().parent().remove();
	$(".ads-links-recommend").hide();
	
	// fix the avatar display in case user has no avatar
	var $img = $(".link-info .info a.user-link img");
	$img.attr("alt", $img.attr("alt").slice(0, 2).toUpperCase());
	
	// fix avatar in voter list
	$(".V2-link-voter-list li a img").each(function(){
		$(this).attr("alt", $(this).attr("alt").slice(0, 2).toUpperCase());
	});
	
	// function for convert some giphy
	var giphy = function(){
		$(".V2-comments .V2-comment-item .V2-comment-body a[title*='/media.giphy.com/media/']").each(function(){
			var $t = $(this);
			$("<img />").attr("src", $t.attr("title")).on("load", function(){
				$i = $(this); 
				$t.text("Đóng/mở GIF")
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
	
	// convert GIF at page load
	giphy();
	
	// convert GIF when user submits comments
	$(".V2-comments").on("click", ".V2-comment-frm .submit", function(){
		window.setTimeout(giphy, 1500);
		// backup :)
		window.setTimeout(giphy, 5000);
	});
		
	// already has preview (youtube page), then nothing left to do -> quit
	if (hasAppContent) return;
	
	// NOW, build the preview panel
	
	// first get the URL to fetch
	var url = $("#admrecommen").data("url").toLowerCase();
	if (!url) return;

	// make link URL direct (skip Linkhay server - just micro optimization :)
	$(".link-info .title h1 a").attr("href", url);

	//
  // Build the tags for preview pane
	//
	
	var $ivLink = $("<div id='qvLinkDiv_' style='display:none;margin-top:1rem'><button id='qvLink_'  style='background:#C00607;color:#f8f8f8;border-radius:3px;border:0;padding:4px 8px;font-size:0.75rem;cursor:pointer'>&#9889; Xem nhanh &#9889;</button></div>");
	$(".link-summary").append($ivLink);
	
	var $qv = $("<div id='qvDiv_' class='app-content' style='display:none;position:relative;margin-top:0.5rem;padding: 0 0.8rem 0 1rem'/>")
	$qv.attr("data-url", url);
	var $style = $("<style>#qvDate_:empty,#qvLead_:empty,#qvLeadImg_:empty,#qvLeadImgCaption_:empty {display:none} #qvDiv_ {font-size:1rem} #qvContent_ h1 {padding:1rem 0 0.5rem;line-height: 1.36;font-size:1.3rem} #qvContent_ h2, #qvContent_ h3 {padding:1rem 0 0.5rem;line-height: 1.4} #qvDiv_ p, #qvDiv_ .p_ {padding-top:0.65rem;font-size:1rem;line-height:1.556} #qvDiv_ .quote_{float:none;font-size:1.1rem;border-left:5px solid grey;padding:0.5rem;margin:1.5em 0 0;font-style: italic} #qvDiv_ .media_ {margin-top:1rem;} #qvDiv_ img,#qvDiv_ video {max-width:100%;width:auto;height:auto} #qvDiv_ .caption_ {font-size:0.7rem;font-style:italic} #qvDiv_ .b_ {font-weight:bold} figure {margin:0}</style>");
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
	
	// now send message to background page to read
	chrome.runtime.sendMessage({cmdID: "loadExternalUrl"});
	
})(jQuery)