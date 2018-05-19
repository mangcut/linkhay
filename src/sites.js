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
		quote: "[type='SimpleQuote'], .trichdan",
		infoBox: ".VCSortableInPreviewMode[type='content']",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, .caption, .quote_author, figcaption",
		replaceDesc: "TTO - ",
		media: ".VCSortableInPreviewMode, .desc_image",
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
		infoBox: ".VCSortableInPreviewMode[type='content']",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption",
		media: ".VCSortableInPreviewMode",
		remove: ".link-content-footer, .relationnews",
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
	/*
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
		infoBox: "table[bordercolor], .VCSortableInPreviewMode[type='content']",
		p: ">div, table[bordercolor] td>div>div:not(:first)",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, .caption, figcaption",
		media: ".VCSortableInPreviewMode, table.imagefull, >div:has(>img, >.caption)",
		remove: "article.story, .morenews",
		hide: "",
		dynamic: function($content) {
			Util_.doClip($content, ".player-effect", ".video-effect a", "video", ".video-effect", "img, a", false);
		}
	},
	*/
	
	{
		domain: "thanhnien.vn",
		title: "#storybox h1.details__headline",
		author: "#storybox .details__author a[title]",
		date: "#storybox .details__meta time",
		lead: "#storybox .l-content .sapo",
		leadImg: "#contentAvatar img",
		leadImgCaption: "#contentAvatar figure span",
		content: "#abody",
		quote: "",
		infoBox: "table[bordercolor], .quote",
		p: ">div, >div>div, table[bordercolor] td>div>div:not(:first)",
		caption: ".imgcaption, figcaption",
		media: "table.imagefull, >div:has(>img, >.caption)",
		remove: ".details__morenews, .article-poll, article.story",
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
		infoBox: "table:not(:has(img, video, iframe))",
		caption: ".tplCaption .Image, .desc_cation, .parser_title",
		media: "table, .item_slide_show",
		remove: ".related_news, .block_tinlienquan_temp, .box_img_video, >p:has(strong a):contains('>> ')",
		hide: "",
		dynamic:  function($content) {
			// old way, seems changed and unnecessary now
			Util_.clipVNExpress($content);

			// It seems they change the way for clip
			$content.find(".box_embed_video_parent").each(function(){
				var src = $(this).find(".box_img_video img").attr("src");
				if (src) {
					$(this).find("video").attr("poster", src);
				}
			});
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
		caption: ".tplCaption .Image, .desc_cation, .parser_title",
		media: "table, .item_slide_show",
		remove: ".box_img_video",
		hide: "",
		dynamic:  function($content) {
			// old way, seems changed and unnecessary now
			Util_.clipVNExpress($content);

			// It seems they change the way for clip
			$content.find(".box_embed_video_parent").each(function(){
				var src = $(this).find(".box_img_video img").attr("src");
				if (src) {
					$(this).find("video").attr("poster", src);
				}
			});
		}
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
		caption: ".expNoEdit .expEdit:not(.quote)",
		media: ".expNoEdit",
		remove: ".adbro-sm, .explus_related_1404022217, .single-tags, .adv, p:contains('>>>'), p:contains('Đọc thêm:')",
		hide: ""
	},
	
	/*
	{
		domain: "vneconomy.vn",
		category: ".titleheaderbv span[itemprop='name']",
		title: ".contentleft h1.h1titleheaderbvt",
		author: ".contentleft .tacgiabaiviet",
		date: ".contentleft .timverbvvth",
		lead: ".contentleft h2.h2titleheaderbvt",
		leadImg: ".leftmaincontentleft .spimgbaiviet img",
		leadImgCaption: ".leftmaincontentleft .spimgbaivietnote",
		content: ".leftmaincontentleft .detailsbaiviet, .psamaincontenleft .psaboximage",
		quote: "",
		caption: ".psaboxfooterimage, figcaption",
		media: ".psaboximage",
		remove: "",
		hide: ""
	},
	*/

	{
		domain: "vneconomy.vn",
		category: ".menutop .active",
		title: "h1.title",
		author: ".author .name a",
		date: ".author .time a",
		lead: ".contentleft .sapo",
		leadImg: ".contentleft .imgdetail img",
		leadImgCaption: ".contentleft .avatardesc",
		content: ".contentleft .contentdetail",
		quote: "",
		caption: ".psaboxfooterimage, figcaption",
		media: ".psaboximage",
		remove: "",
		hide: ""
	},
	
	{
		domain: "vietnamnet.vn",
		referrer: "no-referrer",
		replaceUrl: ["://m.", "://"],
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
				var clipSrc = fakeSrc.replace("https://vietnamnet.vn/", "https://media3.cdn2.vietnamnet.vn/vod/")
														.replace("http://vietnamnet.vn/", "https://media3.cdn2.vietnamnet.vn/vod/");
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
		infoBox: ".VCSortableInPreviewMode[type='content']",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption, .LayoutAlbumCaption",
		media: ".VCSortableInPreviewMode",
		remove: ".knc-relate-wrapper",
		hide: "",
		dynamic: Util_.clip
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
		infoBox: ".VCSortableInPreviewMode[type='content']",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption",
		media: ".VCSortableInPreviewMode",
		remove: ".link-content-footer, .VCSortableInPreviewMode[type=RelatedNewsBox]",
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
		infoBox: ".VCSortableInPreviewMode[type='content']",
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
			var text = $html.find("#content .player_wrapper script").text();
			var clipSrc = text.match(/s720:\s*'(.*.mp4)/)[1];
			var poster = text.match(/thumbnail:\s*'(.*.(?:jpg|png))/)[1];
			var useIframe = false;
			return Util_.insertClip(useIframe, clipSrc, $("<div class='media_' />"), {poster: poster});
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
			$html.find("iframe[src^='http://video.infonet.vn/embed/']").each(function() {
				var $t = $(this);
				var src = $t.attr("src");
				Util_.getPage({url: src}, function(html){
					var newSrc = html.match(/s720:\s*'(.*.mp4)/)[1];
					var newPoster = html.match(/thumbnail:\s*'(.*.(?:jpg|png))/)[1];

					// replace the iframe with the video tag
					var $div = $("<div />");
					$t.replaceWith($div);
					Util_.insertClip(false, newSrc, $div, {poster: newPoster});
				})
			});
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
		hide: "",
		dynamic: function($content, $html) {
			$html.find("img[data-src]").each(function(){
				$(this).attr("src", $(this).attr("data-src"));
			});
		}
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
		infoBox: ".VCSortableInPreviewMode[type='content']",
		caption: ".PhotoCMS_Caption, .VideoCMS_Caption, .StarNameCaption, figcaption",
		media: ".VCSortableInPreviewMode",
		remove: ".news-tag",
		hide: "",
		dynamic: function($content, $html) {
			$html.find("#ctl00_IDContent_ctl00_divContent .sapo a, #ctl00_IDContent_ctl00_divContent .sapo br").remove();
			Util_.clip($content)
		}
	},
	
	/*
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
		hide: "",
		dynamic: function($content, $html) {
			$html.find("video>source[data-src]:not([src])").each(function(){
				$(this).attr("src", $(this).attr("data-src"));
			});
		}
	},
	*/

	{
		domain: "baomoi.com",
		title: ".article h1.article__header",
		author: "",
		source: ".article .article__meta .source",
		date: ".article .article__meta time",
		lead: ".article .article__sapo",
		leadImg: "",
		leadImgCaption: "",
		content: ".article .article__body",
		quote: "",
		caption: "figcaption",
		media: ".body-image",
		remove: "",
		hide: "",
		dynamic: function($content, $html) {
			$html.find("video>source[data-src]:not([src]), .body-video-youtube iframe").each(function(){
				$(this).attr("src", $(this).attr("data-src"))
					.css({
						width: "640px",
						height: "360px"
					});
			});
		}
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
		infoBox: ".VCSortableInPreviewMode[type='content']",
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
		domain: "tinhte.vn/threads",
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
	
	/*
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
	*/

	{
		domain: "24h.com.vn",
		title: ".nwsHt h1.clrTit",
		author: "",
		source: "",
		date: ".nwsHt .updTm",
		lead: ".nwsHt .ctTp",
		leadImg: "",
		leadImgCaption: "",
		content: ".nwsHt",
		quote: "",
		caption: "figcaption",
		media: ".news-image",
		remove: ".sbNws, .flRt, .atclTit, .updTm, .baiviet-bailienquan, .bv-lq, iframe[src*='/dsp_poll.php?']",
		hide: "",
		dynamic: function($content){
			$content.find(".news-image").each(function(){
				var $t = $(this);
				$t.attr("onclick", null);
				var originalSrc = $t.attr("data-original");
				!!originalSrc && $t.attr("src", originalSrc);
			});
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
		caption: "figure img+div",
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
		match: "tumblr.cuongdc.co/post",
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
		hide: "",
		dynamic: function($content){
			$content.children().each(function(){
				var $t = $(this),
						matches = $t.text().match(/^\[gg_video](\d+)\[\/gg_video]$/);
				if (!!matches){
					//$.getJSON("http://bna.vn/bna_craw/video.php", {
					Util_.getJSON({
						url: "http://bna.vn/bna_craw/video.php",
						data: {
							"mode": "get_link",
							"id": matches[1]
						}
					}, function(data){
						var url = data.data.links[data.data.links.length - 1].url;
						Util_.insertClip(false, url, $t.empty());
					}, function(errorThrown){
						console.log(errorThrown);
						console.log(url);
						$t.text("Không lấy được video clip.");
					});
				}
			});
		}
	},
	
	{
		domain: "vnreview.vn",
		title: ".asset-content .title-content h1",
		author: "",
		source: "",
		date: ".asset-content .panel-social .review-displaydate",
		lead: "",
		leadImg: "",
		leadImgCaption: "",
		content: ".asset-content .journal-content-article",
		p: "",
		quote: "",
		caption: "figcaption",
		media: ".infogram-embed",
		remove: ".relation-link",
		hide: "",
		dynamic: function($content){
			$content.children().has(">a")
				.filter(function(){
					var $t = $(this).clone();
					$t.find("a").remove();
					var t = $t.text().trim();
					if (t.length === 0 && $(this).text().trim().indexOf(">") === 0) {
						return true;
					}
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
	
	var getByDomain = function(domain){
		if (domain.indexOf("m.") === 0) {
			domain = domain.substr(2);
		} else if (domain.indexOf("touch.") === 0) {
			domain = domain.substr(6);
		}
		for (var i=0; i<sites.length; i++){
			if (domain === sites[i].domain ||
					domain.endsWith("." + sites[i].domain)){
				return sites[i];
			}
		}
		
		return null;
	}
	
	return {
		all: sites,
		get: get,
		getByDomain: getByDomain
	}
	
})(jQuery);

window.Cats_ = window.Cats_ || (function($){
	
	// map is array where each member:
	// - is string -> match the category text
	// - has test() - like RegExp? -> call test()
	// - is an array? -> first element is url test, second category
	
	// genk.vn: site
	// vnreview.vn: site
	// kenh14.vn: site
	// nhipsongso.tuoitre.vn: site`
	// dulich.tuoitre.vn: site
	// cafebiz.vn: cat
	// cafef.vn: cat
	// tuoitre.vn: cat
	
	var cats = [
	// private channels goes first
	// private not currently supported
	
	// PUBLIC channels
	{
		id: 9,
		name: "Thời sự",
		map: ["thời sự", "chính trị", "quân sự", "quốc phòng"]
	},
	
	{
		id: 7,
		name: "Kinh doanh",
		map: ["kinh doanh", "doanh nghiệp", "doanh nhân", "thị trường", "thị trường chứng khoán",
			"tài chính", "chứng khoán", "địa ốc", "bất động sản", "ngân hàng", "kinh tế",
			"tài chính - ngân hàng", "kinh tế vĩ mô", "đầu tư", "kinh tế vĩ mô - đầu tư",
			/^https?:\/\/startup\.vnexpress\.net\//,
			/^https?:\/\/kinhdoanh\.vnexpress\.net\//
		]
	},
	
	{
		id: 12,
		name: "Công nghệ",
		map: ["công nghệ", 
					/^https?:\/\/genk\.vn\//,
					/^https?:\/\/vnreview\.vn\//,
					/^https?:\/\/tinhte\.vn\//,
					/^https?:\/\/nhipsongso\.tuoitre\.vn\//,
					/^https?:\/\/sohoa\.vnexpress\.net\//,
					/^https?:\/\/www\.techz\.net\//,
					"xe", "xe máy", "ô-tô", "xe độ", "siêu xe",
					"điện thoại", "máy tính bảng", "ứng dụng di động",
					"cuộc sống số", "viễn thông"
		]
	},
	
	{
		id: 18,
		name: "Văn hóa",
		map: [/^https?:\/\/dulich\.tuoitre\.vn\//,
					"văn hóa", "văn học", "sách", "thơ", "nghệ thuật", "văn học - sách", "du lịch", "phượt",
					/^https?:\/\/dulich\.vnexpress\.net\//,
					"xuất bản", "sách hay"
		]
	},
	
	{
		id: 28,
		name: "Khoa giáo",
		map: [
			"giáo dục", "học đường", "du học", "câu chuyện giáo dục", "góc học tập", // tuoitre.vn
			"khoa học", "thường thức", "phát minh" // tuoitre.vn
		]
	},
	
	{
		id: 1,
		name: "Giải trí",
		map: [/^https?:\/\/kenh14\.vn\//,
			"giải trí", "âm nhạc", "điện ảnh", "tv show", "thời trang", "hậu trường",
			/^https?:\/\/giaitri\.vnexpress\.net\//,
			"sao việt", "sao châu á", "sao hollywood",
			"nhạc việt", "nhạc hàn", "nhạc âu mỹ",
			"phim ảnh", "phim chiếu rạp", "phim truyền hình", "game show",
			"thời trang sao", "mặc đẹp", "làm đẹp"
		]
	},
	
	{
		id: 6,
		name: "Thể thao",
		map: [
			"thể thao", "bóng đá", "bóng đá anh", "bóng rổ", "quần vợt", "tennis",
			/^https?:\/\/thethao\.tuoitre\.vn\//,
			/^https?:\/\/thethao\.vnexpress\.net\//
		]
	},
	
	{
		id: 21,
		name: "Gia đình & Sức khỏe ",
		map: [
			"sức khỏe", "dinh dưỡng", "mẹ & bé", "giới tính", "phòng mạch", "biết để khỏe",
			"gia đình", "gia đình - vnexpress", "tâm sự",
			"khỏe đẹp", "mẹ và bé", "bệnh thường gặp"
		]
	},
	
	{
		id: 19,
		name: "Tệ nạn",
		map: []
	},
	
	{
		id: 22,
		name: "Lạ Funny",
		map: []
	},
	
	{
		id: 691,
		name: "Comic",
		map: []
	},
		
	]
	
	var match = function(url, $h, site){
		var i, j;
		
		// match URL first
		for (i = 0; i < cats.length; i++){
			for (j = 0; j < cats[i].map.length; j++){
				if (typeof cats[i].map[j].test === "function"){
					if (cats[i].map[j].test(url)) return cats[i];
				}
			}
		}
		
		// match category
		site = site || KnownSites_.get(url);
		var selector = (site ? (site.subcat || site.category) : null) ||
			"meta[property='article:section'],meta[itemprop='articleSection'],meta[name='dc.subject']";
		var category = null;
		if (selector.indexOf("meta") === 0) {
			category = $h.find(selector).first().attr("content");
		} else {
			category = $h.find(selector).first().text();
		}
		
		if (!!category) {
			category = category.trim().toLowerCase();
			for (i = 0; i < cats.length; i++){
				for (j = 0; j < cats[i].map.length; j++){
					if (cats[i].map[j] === category){
						return cats[i];
					}
				}
			}
		}
		
		return null;
	}
	
	return {
		match: match
	}
	
})(jQuery);