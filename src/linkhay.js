(function(){
	
	var waitForJQuery = function(callback) {
		if (window.jQuery) {
				callback(window.jQuery);
		} else {
				setTimeout(function() {
					waitForJQuery(callback)
				}, 50);
		}
	}

	waitForJQuery(function($){
		if (PageInfo_.isExternalDetailedPage) {
			// quick view
			if (!PageInfo_.hadBuiltinPreview) {
				Previewer_.execute();
			}
			
			// clean-up (remove unnecessary items)
			// only clean for "quickview-enable" page
			// admins do not like removing ads -> keep it for other kind of pages
			Cleaner_.execute();
		}
			
		// other improvement
		Improver_.execute();
	});
	
})()