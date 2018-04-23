// minor cleaning-up stuff does here
window.Cleaner_ = window.Cleaner_ || (function($){

	var execute = function(url) {
		// hide the trash (ads, fb, etc.)
		//$(".top-adv, .V2-old-style-sidebar-box, .controls, .fb-box").remove();
		$(".top-adv, .V2-link-detail-fb-box").remove();
		$("#admzone449, #admzone963, #admzone3174").parent().parent().remove();
		$(".ads-links-recommend").hide();
		
		// fix the avatar display in case user has no avatar
		var $img = $(".link-info .info a.user-link img");
		$img.attr("alt", $img.attr("alt").slice(0, 2).toUpperCase());
		
		// fix avatar in voter list
		$(".V2-link-voter-list li a img").each(function(){
			$(this).attr("alt", $(this).attr("alt").slice(0, 2).toUpperCase());
		});
		
		// make link URL direct (skip Linkhay server - just micro optimization :)
		// should not do to keep goo.gl "click count" correct
		// $(".link-info .title h1 a").attr("href", url);
	}
	
	return {
		execute: execute
	}
	
})(jQuery);