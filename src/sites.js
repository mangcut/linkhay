window.KnownSites_ = window.KnownSites_ || (function($){
	
	var sites = [
	{
		domain: "tuoitre.vn",
		title: ".detail-content h1.title-2",
		author: ".author",
		date: ".detail-content .tool-bar .date",
		lead: ".detail-content h2.txt-head",
		leadImg: "",
		leadImgCaption: "",
		content: ".detail-content .fck",
		quote: "[type='SimpleQuote']",
		quoteCaption: "[type='SimpleQuote']>.StarNameCaption",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption",
		media: ".VCSortableInPreviewMode",
		remove: "div[type='RelatedOneNews'], div[type='RelatedNews']",
		hide: "",
		dynamic: Util_.clip
	},
	
	{
		domain: "cafebiz.vn",
		title: "#mainDetail h1.title",
		author: ".p-author .detail-author",
		date: ".newscontent .breadcumb_top .date_time",
		lead: "#mainDetail .sapo",
		leadImg: "#mainDetail>img.img",
		leadImgCaption: "#mainDetail>.avatar-desc",
		content: "#mainDetail .detail-content",
		quote: "",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption",
		media: ".VCSortableInPreviewMode",
		remove: ".link-content-footer",
		hide: "",
		dynamic: Util_.clip
	},
	
	{
		domain: "cafef.vn",
		title: ".totalcontentdetail h1.title",
		source: ".source",
		author: ".author",
		date: ".totalcontentdetail .dateandcat .pdate",
		lead: ".totalcontentdetail .sapo",
		leadImg: ".totalcontentdetail>div>.media img",
		leadImgCaption: "",
		content: ".totalcontentdetail .contentdetail",
		quote: "",
		infoBox: ".VCSortableInPreviewMode[type='content']",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption",
		media: ".VCSortableInPreviewMode",
		remove: ".tindnd, .tinlienquan, .link-content-footer, .chisochungkhoan",
		hide: "",
		dynamic: Util_.clip
	},
	
	{
		domain: "thanhnien.vn",
		title: ".main-article h1.main-title",
		author: "",
		date: ".main-article .meta time",
		lead: ".main-article .article-body .content .sapo",
		leadImg: "#contentAvatar img",
		leadImgCaption: "#contentAvatar figure.caption",
		content: "#abody",
		quote: "",
		p: ">div",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, .caption, figcaption",
		media: ".VCSortableInPreviewMode, table.imagefull",
		remove: "article.story, .morenews",
		hide: "",
		dynamic: function($content) {
			Util_.doClip($content, ".player-effect", ".video-effect a", "video", ".video-effect", "img, a", false);
		}
	},
	
	{
		domain: "vnexpress.net/tin-tuc/goc-nhin",
		title: "#article_detail .the-article-header .title_gn_detail",
		author: ".box_author .author_name",
		date: "#article_detail .the-article-header .meta .time",
		lead: "",
		leadImg: "",
		leadImgCaption: "",
		content: "#article_detail .article_body .fck_detail",
		quote: "",
		caption: "figcaption",
		media: "table, figure",
		remove: "",
		hide: ""
	},
	
	{
		domain: "video.vnexpress.net",
		keepScripts: true,
		title: "#info_lead h1.title_detail_video",
		author: "",
		source: "",
		date: "#info_lead .block_cate_author .block_timer",
		lead: "#info_lead .lead_detail_video",
		leadImg: "",
		leadImgCaption: "",
		content: "",
		quote: "",
		caption: "",
		media: "",
		remove: "",
		hide: "",
		dynamic: function($content, $html) {
			var clipSrc = $html.find("#content_script script").text().match(/s720:(.*.mp4)/g)[0].substr(7);
			var useIframe = false;
			return Util_.insertClip(useIframe, clipSrc, $("<div class='media_' />"));
		}
	},
	
	{
		domain: "vnexpress.net",
		title: ".sidebar_1 h1.title_news_detail",
		author: ".author_mail strong",
		date: ".sidebar_1 .time",
		lead: ".sidebar_1 h2.description",
		leadImg: "",
		leadImgCaption: "",
		content: ".sidebar_1 .content_detail",
		quote: "",
		infoBox: "table.tbl_insert",
		caption: ".tplCaption .Image, .desc_cation",
		media: "table, .item_slide_show",
		remove: ".related_news",
		hide: "",
		dynamic:  function($content) {
			$content.find(".subtitle").addClass("b_");
			$content.find("table p").css("padding", "3px 5px");
			Util_.clipVNExpress($content);
		}
	},
	
	{
		domain: "ngoisao.net",
		title: ".detailCT h1.title",
		author: ".detailCT .author_mail .author_top",
		date: ".detailCT .author_mail .spanDateTime",
		lead: ".detailCT .lead",
		leadImg: "",
		leadImgCaption: "",
		content: ".detailCT .fck_detail",
		quote: "",
		caption: ".tplCaption .Image, .desc_cation",
		media: "table, .item_slide_show",
		remove: "",
		hide: "",
		dynamic: Util_.clipVNExpress
	},
	
	{
		domain: "vtc.vn",
		title: ".col-single h1",
		author: "",
		date: ".col-single .post-date",
		lead: ".col-single .single-excerpt, .col-single .excerpt",
		leadImg: "",
		leadImgCaption: "",
		content: "#content_detail",
		quote: ".quote-inner",
		caption: ".expNoEdit .expEdit",
		media: ".expNoEdit",
		remove: ".adbro-sm, .explus_related_1404022217, .single-tags, .adv, p:contains('>>>'), p:contains('Đọc thêm:')",
		hide: "",
		dynamic: function($content) {
			$content.find(".quote_").css({
				"float": "none",
				"width": "auto",
				"border-top": 0,
				"padding": "0.5rem",
				"margin": 0
			});
		}
	},
	
	{
		domain: "vneconomy.vn",
		title: ".contentleft h1.h1titleheaderbvt",
		author: ".leftmaincontentleft .tacgiabaiviet",
		date: ".contentleft .timverbvvth",
		lead: ".contentleft h2.h2titleheaderbvt",
		leadImg: ".leftmaincontentleft .spimgbaiviet img",
		leadImgCaption: ".leftmaincontentleft .spimgbaivietnote",
		content: ".leftmaincontentleft .detailsbaiviet",
		quote: "",
		caption: "",
		media: "",
		remove: "",
		hide: ""
	},
	
	{
		domain: "vietnamnet.vn",
		referrer: "no-referrer",
		title: ".ArticleDetail h1.title",
		author: "",
		date: ".ArticleDetail .ArticleDateTime .ArticleDate",
		lead: "",
		leadImg: "",
		leadImgCaption: "",
		content: "#ArticleContent",
		quote: "",
		caption: ".image_desc",
		media: ".fmsmedia, .ImageBox, >div>img, table",
		remove: ".box-taitro, .inner-article, table:has(.box-event)",
		hide: "",
		dynamic: function($content) {
			var $media = $content.find(".fmsmedia");
			
			$content.find(".fmsmedia").each(function(){
				var $a = $(this).find("a").first();
				var fakeSrc = $a.attr("href");
				var clipSrc = fakeSrc.replace("https://vietnamnet.vn/", "http://media3.cdn2.vietnamnet.vn/vod/")
														.replace("http://vietnamnet.vn/", "http://media3.cdn2.vietnamnet.vn/vod/");
				var useIframe = false;
				var $clipDiv = $(this).closest("div");
				// remove the thumbnail if any
				$clipDiv.find("img, a").remove();
				// add video
				Util_.insertClip(useIframe, clipSrc, $clipDiv);
			});
			
			$content.find("div:has(a)").each(function(){
				var $t = $(this);
				if ($t.text() === $t.find("a").text()) {
					// this div contains <a> only, it must be a "related news" section
					$t.remove();
				}
			});
		}
	},
	
	{
		domain: "kenh14.vn",
		title: ".klw-body-top .kbwc-header h1.kbwc-title",
		author: "",
		date: ".klw-body-top .kbwc-header .kbwcm-time",
		lead: ".klw-body-top .klw-new-content .knc-sapo",
		leadImg: "",
		leadImgCaption: "",
		content: ".klw-body-top .klw-new-content .knc-content",
		quote: "",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption",
		media: ".VCSortableInPreviewMode",
		remove: ".knc-relate-wrapper",
		hide: "",
		dynamic: function($content) {
			$content.find(".LayoutAlbumRow .LayoutAlbumItem").css({
				"display": "inline-block",
				"max-width": "50%",
				"margin": 0,
				"padding": "1px",
				"box-sizing": "border-box"
			});
			$content.find(".LayoutAlbumRow .LayoutAlbumItem img").css({
				"width": "auto",
				"height": "auto"
			});
			Util_.clip($content);
		}
	},
	
	{
		domain: "soha.vn",
		title: "main article header h1.news-title",
		author: "main article header b",
		date: "main article header .op-published",
		lead: "main article .detail-body .news-sapo",
		leadImg: "main article header figure img",
		leadImgCaption: "main article header figure figcaption",
		content: "main article .detail-body .news-content",
		quote: "",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption",
		media: ".VCSortableInPreviewMode",
		remove: ".link-content-footer",
		hide: "",
		dynamic: Util_.clip
	},
	
	{
		domain: "news.zing.vn",
		title: ".main .the-article-header h1.the-article-title",
		author: ".main .the-article-credit .author",
		date: ".main .the-article-header .the-article-publish",
		lead: ".main .the-article-summary",
		leadImg: "",
		leadImgCaption: "",
		content: ".main .the-article-body",
		quote: "",
		caption: "figcaption, .pCaption, .caption",
		media: "table.picture, figure.video",
		remove: "table.article, .surveywidget",
		hide: "",
		dynamic: function($content){
			$content.find(".dropcap").css("float", "left");
		}
	},
	
	{
		domain: "genk.vn",
		title: ".kbwcb-left .kbwc-header h1.kbwc-title",
		author: ".kbwcb-left .kbwc-header .kbwcm-author",
		source: ".kbwcb-left .kbwc-header .kbwcm-source",
		date: ".kbwcb-left .kbwc-header .kbwcm-time",
		dateAttr: "title",
		lead: ".kbwcb-left .klw-new-content .knc-sapo",
		leadImg: "",
		leadImgCaption: "",
		content: ".kbwcb-left .klw-new-content .knc-content",
		quote: "",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption",
		media: ".VCSortableInPreviewMode",
		remove: ".knc-relate-wrapper, .link-content-footer",
		hide: "",
		dynamic: Util_.clip
	},
	
	{
		domain: "video.infonet.vn",
		referrer: "no-referrer",
		keepScripts: true,
		title: "#content .video_info h1",
		author: "",
		source: "",
		date: "#content .video_info .update",
		lead: "#content .video_info .detail",
		leadImg: "",
		leadImgCaption: "",
		content: "",
		quote: "",
		caption: "",
		media: "",
		remove: "",
		hide: "",
		dynamic: function($content, $html) {
			var clipSrc = $html.find("#content .player_wrapper script").text().match(/s720:(.*.mp4)/g)[0].substr(7);
			var useIframe = false;
			return Util_.insertClip(useIframe, clipSrc, $("<div class='media_' />"));
		}
	},
	
	{
		domain: "infonet.vn",
		title: ".details-wrap h1.headline-title",
		author: ".details-wrap .meta .name",
		source: "",
		date: ".details-wrap .meta time",
		lead: ".details-wrap .sapo",
		leadImg: "",
		leadImgCaption: "",
		content: "#main_detail",
		quote: "",
		caption: ".caption, figcaption",
		media: "table.picture",
		remove: "#AdAsia, .teads-inread",
		hide: "",
		dynamic: function($content, $html) {
			$html.find("#page-wraper .news-desc .ictnews-lb2").remove();
		}
	},
	
	{
		domain: "ictnews.vn",
		title: "#page-wraper .news-title h1",
		author: "",
		source: "",
		date: ".breadcrumb .time",
		lead: "#page-wraper .news-desc",
		leadImg: "",
		leadImgCaption: "",
		content: "#page-wraper .maincontent .content-detail",
		quote: "",
		caption: ".caption, .PCaption, figcaption",
		media: "table", //"table.imageBox, table:has(.caption)",
		remove: ".knc-relate-wrapper, .link-content-footer",
		hide: "",
		dynamic: function($content, $html) {
			$html.find("#page-wraper .news-desc .ictnews-lb2").remove();
		}
	},
	
	{
		domain: "laodong.vn",
		title: ".section-n2 .section-title .title h1",
		author: ".section-n2 .wrapper-main-content .author-wrapper .author",
		source: "",
		date: ".section-n2 .wrapper-main-content .author-wrapper .f-datetime",
		lead: "#page-wraper .news-desc",
		leadImg: ".section-n2 .section-title .imgCon img",
		leadImgCaption: ".section-n2 .section-title .imgCon .description",
		content: ".section-n2 .wrapper-main-content .article-content",
		quote: "",
		caption: "figcaption",
		media: "figure.insert-center-image",
		remove: "",
		hide: ""
	},
	
	{
		domain: "dantri.com.vn",
		title: "#ctl00_IDContent_ctl00_divContent h1",
		author: "",
		source: "",
		date: "#ctl00_IDContent_ctl00_divContent .box26 span.tt-capitalize",
		lead: "#ctl00_IDContent_ctl00_divContent .sapo",
		leadImg: "",
		leadImgCaption: "",
		content: "#divNewsContent",
		quote: "",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption",
		media: ".VCSortableInPreviewMode",
		remove: ".news-tag",
		hide: "",
		dynamic: function($content, $html) {
			$html.find("#ctl00_IDContent_ctl00_divContent .sapo a, #ctl00_IDContent_ctl00_divContent .sapo br").remove();
			Util_.clip($content)
		}
	},
	
	{
		domain: "baomoi.com",
		title: ".main-article header h1",
		author: "",
		source: ".main-article header .meta .source",
		date: ".main-article header .meta time",
		lead: ".main-article .article-body .sapo",
		leadImg: "",
		leadImgCaption: "",
		content: ".main-article .article-body .body",
		quote: "",
		caption: "figcaption",
		media: ".body-image",
		remove: "",
		hide: ""
	},
	
	{
		domain: "vov.vn",
		title: ".vov-content h1",
		author: ".vov-content .main-contents .author .name",
		source: ".vov-content .main-contents .author .source",
		date: ".vov-content .meta time",
		lead: ".vov-content .sapo",
		leadImg: "",
		leadImgCaption: "",
		content: "#article-body",
		quote: "",
		caption: ".fig, figcaption",
		media: "table.contentimg",
		remove: "article.story",
		hide: ""
	},
	
	{
		domain: "nld.com.vn",
		title: ".titledetail h1",
		author: "#divNewsContent .nguon-tin-detail",
		source: "",
		date: ".contenttotal .ngayxuatban",
		lead: ".contenttotal .sapo",
		leadImg: "",
		leadImgCaption: "",
		content: "#divNewsContent",
		quote: "",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption",
		media: ".VCSortableInPreviewMode",
		remove: ".tinlienquanold, .tlqdetailtotal, .tlqdetail, .tlqrdetail, .totaltlqbotcontent, .displaynone",
		hide: "",
		dynamic: Util_.clip
	},
	
	{
		domain: "tienphong.vn",
		title: "#headline",
		author: ".article-body .article-author",
		source: "",
		date: ".article-header .byline-dateline time",
		lead: ".main-article .article-sapo",
		leadImg: ".main-article .article-avatar img",
		leadImgCaption: ".main-article .article-avatar figcaption",
		content: ".article-body",
		p: ">div:not(:has(p))",
		quote: "blockquote",
		caption: ".fig, figcaption",
		media: ".article-photo",
		remove: ".banner",
		hide: ""
	},
	
	{
		domain: "tinhte.vn",
		title: ".thread-cover .title",
		author: ".thread-cover .author .username",
		source: "",
		date: ".thread-cover .description .DateTime",
		lead: ".main-article .article-sapo",
		leadImg: ".thread-cover img.cover",
		leadImgCaption: "", //".thread-cover .description",
		content: "#messageList .messageText",
		quote: "",
		caption: "figcaption",
		media: "",
		remove: "",
		hide: "",
		dynamic: function($content, $html) {
			$content.addClass("p_");
			var $img = $html.find(".thread-cover img.cover");
			var src = $img.css("background-image");
			src = src.substring(5, src.length - 2);
			$img.attr("src", src);
		}
	},
	
	{
		domain: "24h.com.vn",
		title: ".div-baiviet h1.baiviet-title",
		author: ".colCenter .nguontin",
		source: "",
		date: ".div-baiviet .baiviet-ngay",
		lead: ".div-baiviet .baiviet-sapo",
		leadImg: "",
		leadImgCaption: "",
		content: ".colCenter .text-conent",
		quote: "",
		caption: "figcaption",
		media: "",
		remove: ".baiviet-bailienquan, .bv-lq, iframe[src*='/dsp_poll.php?']",
		hide: "",
		dynamic: function($content){
			$content.find(".viewVideoPlay").each(function(){
				var $t = $(this);
				var config = $t.find(".zplayerDiv").attr("data-config");
				$t.empty();
				if (!config) return;
				
				var query = Util_.query(config);
				if (!query["file"]) return;
				
				var files = query["file"].split("***");
				for (i = files.length-1; i >= 0; i--){
					Util_.insertClip(false, files[i], $t);
				}
				
				$t.css("padding", "0.5rem");
				$t.find("video").css("padding", "0.5rem");
			});
		}
	},
	
	{
		domain: "thethaovanhoa.vn",
		title: ".divContent h1",
		author: "",
		source: "",
		date: ".divContent .pub_time",
		lead: "",
		leadImg: ".chitiet_one img",
		leadImgCaption: "",
		content: "#divcontentwrap",
		quote: "",
		caption: "figcaption",
		media: "table, figure",
		remove: ".boxrelation, .boxembedtinlienquan, .adsbygoogle, #AdAsia",
		hide: "",
		dynamic: function($content){
			$content.find("div").addClass("p_");
			$content.find(">div figure").parent().css({
				"margin": "1rem 0"
			}).find("figcaption").css("margin-top", "0.5rem");
		}
	},
	
	{
		domain: "www.facebook.com",
		match: "www.facebook.com/notes",
		keepScripts: true,
		title: "._4lmi ._5s6c",
		author: "._4lmi ._3uhg a._2yug",
		source: "",
		date: "._4lmi ._3uhg a._39g5",
		lead: "",
		leadImg: "._30q-[style*='background']",
		leadImgCaption: "",
		content: "._4lmi ._39k5._5s6c",
		p: ">div",
		quote: "",
		caption: "",
		media: "figure",
		remove: "",
		hide: "",
		dynamic: function($content, $html){
			$content.find("._4yxo").css({
				"font-weight": "bold",
				"font-size": "1.1em"
			});
			
			var $leadDiv = $html.find("._30q-[style*='background']").first();
			if ($leadDiv.length ===1){
				var src = $leadDiv.css("background-image");
				$leadDiv.css("background-image", "none");
				src = src.substring(5, src.length - 2);
				$("<img />").attr("src", src).prependTo($leadDiv);
			}
			
			var $youtube = $content.find("figure div._1n3w");
			var ybLen = $youtube.length;
			var i, clipID, clipSrc;
			if (ybLen > 0) {
				var script = $html.find("script").text();
				var things = script.split('"originalSrc":"https:\\/\\/www.youtube.com\\/watch?v=');
				for (i = 1; i < things.length && i <= ybLen; i++){
					clipID = things[i].substring(0, things[i].indexOf('"'));
					clipSrc = "https://www.youtube.com/embed/" + clipID;
					Util_.insertClip(true, clipSrc, $youtube.eq(i-1).empty());
				}
			}
		}
	},
	
	{
		domain: "tumblr.cuongdc.co",
		//match: "tumblr.cuongdc.co/post",
		title: "title",
		author: "",
		source: "",
		date: "",
		lead: "",
		leadImg: "",
		leadImgCaption: "",
		content: "article",
		p: "",
		quote: "",
		caption: "",
		media: "",
		remove: "meta, .notes, footer, noscript, #disqus_thread, #fb-comments, .vietid_comments_content, fb\\:like, .dsq-brlink, a[href='http://linkhay.com/submit']",
		hide: ""
	},
	
	{
		domain: "baonghean.vn",
		title: "#title",
		author: "",
		source: "",
		pageCat: "#nav .curent",
		date: "#date",
		lead: "",
		leadImg: "",
		leadImgCaption: "",
		content: "#content",
		p: "",
		quote: "",
		caption: ".image_desc, figcaption",
		media: "table.image, iframe",
		remove: "table.rl",
		hide: ""
	},
	
	{
		domain: "vnreview.vn",
		title: ".asset-content .title-content h1",
		author: "",
		source: "",
		siteCat: "Công nghệ",
		pageCat: "",
		date: ".asset-content .panel-social .review-displaydate",
		lead: "",
		leadImg: "",
		leadImgCaption: "",
		content: ".asset-content .journal-content-article",
		p: "",
		quote: "",
		caption: "figcaption",
		media: ".infogram-embed",
		remove: "",
		hide: "",
		dynamic: function($content){
			$content.find(">p:has(>a)")
				.filter(function(){
					var $t = $(this).clone();
					$t.find("a").remove();
					var t = $t.text().trim();
					return (t === ">" || t === ">>" || t === "Đọc thêm");
				})
				.remove();
			$content.find(".infogram-embed").each(function(){
				var $t = $(this).empty();
				var id = $t.attr("data-id");
				var title = $t.attr("data-title");
				
				$("<p/>").text("[BIỂU ĐỒ] " + title).css("font-weight", "bold").appendTo($t);
				//$("<a/>")
				//	.attr("href", "https://e.infogram.com/" + id + "?src=embed")
				//	.attr("target", "_blank")
				//	.text("Click để xem biểu đồ")
				//	.appendTo($t);
					
				$t.next("div").addClass("caption_").css({
					"margin-bottom": "1rem"
				}).find("a").first().text("Click để xem biểu đồ").next("a").remove();

			});
		}
	}
	];
	

	var get = function(url){
		var i, match;
		for (i=0; i<sites.length; i++){
			match = sites[i].match || sites[i].domain;
			if (url.indexOf("." + match + "/") >= 0 ||
					url.indexOf("/" + match + "/") >= 0){
						return sites[i];
			}
		}
		
		return null;
	}
	
	return {
		all: sites,
		get: get
	}
	
})(jQuery);