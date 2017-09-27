window.Util_ = window.Util_ || (function($){
	
	var exports = {};
	
	exports.insertClip = function(useIframe, clipSrc, $target) {
		if (!!useIframe) {
			$("<iframe allowfullscreen frameborder='0' scrolling='no' style='width:640px;height:360px;margin-left:-1rem' />")
			.attr("src", clipSrc).prependTo($target);
		} else {
			$("<video controls />")
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
			alert("timeOut");
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
		
	return exports;
	
})(jQuery);