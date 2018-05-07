window.Stickers_ = window.Stickers_ || (function($){
    var dfMap = {
        "*ném tôm*": "nem_tom.png",
        "*như luỳnh*": "nhu_luynh.png",
        "*sml*": "sml.png",
        "*muốn gì*": "muon_gi.mp4"
    };
    var map = null;
    var lastGet = null;
    var DURATION = 60 * 60 * 1000; // 60 mins
    var STICKER_PATH = "https://raw.githubusercontent.com/mangcut/linkhay/master/src/stickers/sticker.json";

    var loadStickers = function(success){
        lastGet = lastGet || parseInt(localStorage.getItem("qv_.stickerTimestamp")) || null;
        map = map || Util_.tryParseJSON(localStorage.getItem("qv_.stickers"), dfMap);
        if (!map || !lastGet || (new Date().getTime() - lastGet > DURATION)) {
            Util_.getJSON({
                url: STICKER_PATH
            }, function(json) {
                map = json;
                lastGet = new Date().getTime();
                localStorage.setItem("qv_.stickers", JSON.stringify(map));
                localStorage.setItem("qv_.stickerTimestamp", lastGet);
                success($.extend(true, {}, map));
            })
        } else {
            success($.extend(true, {}, map));
        }
    }

    var makeTag = function(stickers, key) {
        var value = stickers[key];
        if (typeof value === "string") {
            value = {
                src: value
            }
        }

        var styles = value.css || {};
        !styles["max-width"] && (styles["max-width"] = "100%");

        var attrs = value.attr || {};
        attrs.title = attrs.title || key.replace(/^\*+|\*+$/g, '');
        attrs.src = attrs.src || value.src;
        if (attrs.src.indexOf("://") < 0) {
            attrs.src = chrome.runtime.getURL('stickers/' + attrs.src);
        }

        if (!styles.width && !styles.height && !attrs.width && !attrs.height) {
            attrs.height = 160;
        }

        if (!value.tag) {
            if (attrs.src.endsWith(".mp4")) {
                value.tag = "video";
            } else {
                value.tag = "img";
            }
        }

        if (value.tag === "video") {
            (typeof attrs.autoplay === "undefined") && (attrs.autoplay = true);
            (typeof attrs.loop === "undefined") && (attrs.loop = true);
            (typeof attrs.muted === "undefined") && (attrs.muted = true);
        }

        return $("<" + value.tag + "/>").css(styles).attr(attrs)
    }

    return {
        loadStickers: loadStickers,
        makeTag: makeTag
    }
})(jQuery);