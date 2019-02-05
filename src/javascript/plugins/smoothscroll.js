// usage:
// if( $('a[href*="#"]').length > 0 ) {
//     $(window).smoothScroll();
// }

// smooth scroll plugin
(function($){
	var methods = {
		init : function(options) {

			function filterPath(string) {
				return string
					.replace(/^\//, '')
					.replace(/(index|default).[a-zA-Z]{3,4}$/, '')
					.replace(/\/$/, '');
			}

			var locationPath = filterPath(location.pathname);
			$('a[href*="#"]').each(function() {
				var thisPath = filterPath(this.pathname) || locationPath;
				var hash = this.hash;
				if ($("#" + hash.replace(/#/, '')).length) {
					if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
						var $target = $(hash),
							target = this.hash;
						if(target) {
							$(this).on('click', function(e) {
								e.preventDefault();
								$('html, body').animate({scrollTop: $target.offset().top}, 1000, function() {
									location.hash = target;
									$target.focus();
									if( $target.is(":focus") ) { // checking if the target was focused
										return false;
									} else {
										$target.attr('tabindex', '-1'); // adding tabindex for elements not focusable
										$target.focus(); // setting focus
									}
								});
							});
						}
					}
				}
			});

		},
		show : function( ) {},
		hide : function( ) {},
		update : function( content ) {}
	};
	$.fn.smoothScroll = function(methodOrOptions) {
		if ( methods[methodOrOptions] ) {
			return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
			return methods.init.apply( this, arguments ); // default to "init"
		} else {
			$.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.smoothScroll' );
		}
	};
})(jQuery);