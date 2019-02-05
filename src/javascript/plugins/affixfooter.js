// affix footer plugin
// usage:
// // on window scroll event
// $(window).scroll(function() {
// 	// fixed footer cta functionality
// 	if( $('#fixed').length > 0 ) {
// 		$(window).affixFooter();
// 	}
// });
// // on window resize event
// $(window).resize(function() {
// 	// fixed footer cta functionality
// 	if( $('#fixed').length > 0 ) {
// 		$(window).affixFooter();
// 	}
// });
(function($){
	var methods = {
		init : function(options) {
			var lastScreenTop = 0;
			var screenTop = $(window).scrollTop();
			var screenBottom = $(window).scrollTop() + $(window).height();
			var footerTop = $("#footer").offset().top;
			// if( console.log ) console.log( 'footerTop', footerTop );
			// if( console.log ) console.log( 'screenTop', screenTop );
			// if( console.log ) console.log( 'screenBottom', screenBottom );
			// if( console.log ) console.log( 'conditional', screenBottom > footerTop );
			// if( console.log ) console.log( '--------------------------------------------------');
			if( $(window).width() > 767 ) {
				if( screenTop < 100 ) {
					$('#fixed').stop().animate({
						bottom: '-' + $('#fixed').outerHeight()
					}, 400, function() {
						$('#fixed').css({
							'position': 'static',
							'bottom': '-' + $('#fixed').outerHeight()
						});
						$('#footer').css({
							'margin-top': 0
						});
					});
				} else if( screenTop > 99 ) {
					if( screenBottom > footerTop ) {
						// the #footer element is visible, set static positioning
						$('#fixed').css({
							'position': 'static',
							'bottom': 0
						}).stop().css('opacity', 1);
						$('#footer').css({
							'margin-top': 0
						});
					} else  {
						// the #footer element is not visible, set fixed positioning
						if ( screenTop > lastScreenTop ) {
							// scrolling down
							$('#footer').css({
								'margin-top': $('#fixed').outerHeight()
							});
							$('#fixed').css({
								'position': 'fixed',
								'bottom': '-' + $('#fixed').outerHeight(),
								'opacity': 1
							}).stop().animate({
								bottom: 0
							}, 400);
						} else {
							// scrolling up
							$('#footer').css({
								'margin-top': $('#fixed').outerHeight()
							});
							$('#fixed').css({
								'position': 'fixed',
								'bottom': '-' + $('#fixed').outerHeight(),
								'opacity': 1
							});
						}
						lastScreenTop = screenTop;
					}
				}
			} else {
				// the device is small, set static positioning
				$('#fixed').css({
					'position': 'static',
					'bottom': ( screenTop - footerTop )
				}).stop(false, true).css('opacity', 1);
				$('#footer').css({
					'margin-top': 0
				});
			}
		},
		show : function( ) {},
		hide : function( ) {},
		update : function( content ) {}
	};
	$.fn.affixFooter = function(methodOrOptions) {
		if ( methods[methodOrOptions] ) {
			return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
			return methods.init.apply( this, arguments ); // default to "init"
		} else {
			$.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.affixFooter' );
		}
	};
})(jQuery);
