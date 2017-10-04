window.Util_ = window.Util_ || (function($){
	
	var exports = {};
	
	exports.insertClip = function(useIframe, clipSrc, $target) {
		if (!!useIframe) {
			$("<iframe allowfullscreen frameborder='0' scrolling='no' style='width:640px;height:360px;margin-left:-16px' />")
			.attr("src", clipSrc).prependTo($target);
		} else {
			$("<video controls style='width:640px;height:360px' />") // set width/height to anti-splash
				.append($("<source />")
				.on("error", function(){
					var $p = $("<p />").addClass("caption_");
					var $error = $("<span />").text("Không xem được clip? ");
					var $a = $("<a />").text("Mở trong tab mới")
					.attr({
						"href": clipSrc,
						"rel": "noreferrer"})
					.css({
						"text-decoration": "underline",
						"color": "#c00"
					});
					$target.append($p.append($error).append($a));
				})
				.attr("src", clipSrc))
				.prependTo($target);
		}
		
		return $target;
	}
	
	exports.clip = function($content){
		exports.doClip($content, "div[type='VideoStream']", null, "data-src", "div", "img, a", true);
	}
	
	exports.doClip = function($content, anchor, src, srcAttr, target, thumbnail, useIframe){
		// now check for embeded video
		$content.find(anchor).each(function(){
			var $anchor = $(this);
			
			var $src = $anchor;
			!!src && ($src = $src.find(src));
			var clipSrc = $src.attr(srcAttr);
			
			var $target = $anchor;
			!!target && ($target = $target.find(target).first());
			
			// remove the thumbnail if any
			!!thumbnail && $anchor.find(thumbnail).remove();
			
			// add video
			exports.insertClip(useIframe, clipSrc, $target);
		});
	}
	
	exports.clipVNExpress = function($content){
		//https://video.vnexpress.net/parser.html?id=166960&t=2
		// now check for embeded video
		$content.find("div[data-component-type='video']").each(function(){
			var clipID = $(this).attr("data-component-value");
			var clipType = $(this).attr("data-component-typevideo");
			var clipSrc = "https://video.vnexpress.net/parser.html?id=" + clipID + "&t=" + clipType;
			var useIframe = true;
			var $clipDiv = $(this).closest("div");
			// remove the thumbnail if any
			$clipDiv.parent().find("img, a").remove();
			// add video
			exports.insertClip(useIframe, clipSrc, $clipDiv);
		});
	}
	
	exports.waitForEl = function(selector, timeOut, callback, timeOutCallBack) {
		if (timeOut < 0) {
			!!timeOutCallBack && timeOutCallBack();
			return null;
		}
		
		var el = document.querySelector(selector);
		if (!!el) {
			callback(el);
		} else {
			setTimeout(function() {
				exports.waitForEl(selector, timeOut - 100, callback, timeOutCallBack);
			}, 100);
		}
	}
	
	exports.query = function(url){
		var query = {};
		var a = (url.indexOf("?") >= 0 ? url.split("?", 2)[1] : url).split('&');
		for (var i = 0; i < a.length; i++) {
				var b = a[i].split('=');
				query[decodeURIComponent(b[0]).toLowerCase()] = decodeURIComponent(b[1] || '');
		}
		
		return query;
	}
	
	exports.showImageBox = function(src){
		var $b = $("#image-box_");
		if ($b.length === 0){
			$b = $("<div />").attr("id", "image-box_").appendTo("body");
		}
		
		$b.css("background-image", "none").on("click wheel", function(){
				$(this).fadeOut("fast");
				/*
				$("body").css({
					"overflow":"visible",
					"height":"auto"
				});
				*/
		}).fadeIn();
		/*
		$("body").css({
			"overflow":"hidden",
			"height":"100%"
		});
		*/
		
		$("<img />").on("load", function(){
			var size = "auto";
			if (this.naturalHeight > $b.height()) {
				size = "contain";
			}
			$b.css({
				"background-image": "url(" + src + ")",
				"background-size": size
			});
		}).attr("src", src);
	}
	
	exports.shouldExpand = function(){
		// there's hash -> came from noti/reply/mention
		// -> should not expand
		if (!!window.location.hash && (window.location.hash != "#c0-form")) {
			return false;
		}
		
		var commentCount = $(".V2-comments .V2-comment-item").length;
		
		// no comment to read -> should expand
		if (commentCount === 0){
			return true;
		}
		
		// I made comment here -> should not expand
		if ($(".V2-comments .V2-comment-item .V2-comment-header a[href$='/" + PageInfo_.user + "']").length > 0){
			return false;
		}
		
		// Loadding too slow, I scrolled -> should not expand
		if ($(window).scrollTop() + 50 >= $("#qvLink_").offset().top) {
			return false;
		}

		// shown once -> should not expand
		var list = localStorage["qv_.viewedList"] || "";
		if (list.indexOf(PageInfo_.linkID) >= 0) {
			return false;
		}

		// It is short -> let's expand
		// Note: because images might not finish loading -> length is not very accurate
		if ($("#qvDiv_").height() <= 640) {
			return true;
		}
		
		// It is long -> expand depend on number of comments
		return (commentCount < 10);
	}
		
	return exports;
	
})(jQuery);