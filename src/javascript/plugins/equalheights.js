// equal heights plugin
//
// Usage:
//
// // set equal heights
// $(window).equalHeights({
// 	selector: '.equal'
// });
// // on window resize events
// $(window).resize(function() {
// 	waitForFinalEvent(function(){
// 		// set equal heights
// 		$(window).equalHeights({
// 			selector: '.equal'
// 		});
// 	}, 500, "UNIQUE_ID_GOES_HERE");
// });
//
(function($){
	var methods = {
		init : function(options) {

			// if( console.log ) console.log( 'this', $(options.selector).selector );
			if( console.log ) console.log( 'options', options.selector );

			if( $(options.selector).length > 0 ) {
				var maxHeight = 0;
				$(options.selector).each(function(){
					if ($(options.selector).height() > maxHeight) { maxHeight = $(options.selector).height(); }
				});
				$(options.selector).height(maxHeight);

				// on resize, set equal heights again
				$(window).on('resize', function(){
					$(options.selector).css('height', 'auto');
					var maxHeight = 0;
					$(options.selector).each(function(){
						if ($(options.selector).height() > maxHeight) { maxHeight = $(options.selector).height(); }
					});
					$(options.selector).height(maxHeight);
				});
			}
		},
		show : function( ) {},
		hide : function( ) {},
		update : function( content ) {}
	};
	$.fn.equalHeights = function(methodOrOptions) {
		if ( methods[methodOrOptions] ) {
			return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
			return methods.init.apply( this, arguments ); // default to "init"
		} else {
			$.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.equalHeights' );
		}
	};
})(jQuery);
