/*
Performer JavaScript library (http://performerjs.org)
Created by Chris Taylor (http://www.stillbreathing.co.uk)
Additional work by kourge and Danny Linkov
Version 2.0.0

This work is released under any of the following licenses, please choose the one you wish to use:

- Creative Commons Attribution-ShareAlike 3.0 licence (http://creativecommons.org/licenses/by-sa/3.0/)
- Microsoft Public License (http://www.opensource.org/licenses/ms-pl.html)
- MIT License (http://www.opensource.org/licenses/mit-license.php)
- BSD License (http://www.opensource.org/licenses/bsd-license.php)
*/

;var Performer = {

	// the version of Performer
    version: '2.0.0',
	
	// whether Performer is in debug mode
	isDebugging: true,
	
	// whether Performer is initialised
	isInitialised: false,
	
	// the initialisation error, if any
	initialisationError: 0,
	
	// stores the reference to this instance of Performer
	self: {},
	
	// stores the external references
	jQuery: {},
	window: {},
	document: {},
	$: {},
	
	// get the document body
	body: self.$('body'),
	
	// get the current location hash
	hash: self.window.location.hash.replace( '#', '' ),
	
	// the defaults
	defaults: {
		hideClass: 'hider',
		showClass: 'shower',
		togglerOpenClass: 'toggleropen',
		togglerClosedClass: 'togglerclosed',
	},
	
	// initialise Performer
	init: function( jQuery, window, document ) {
	
		// store the reference to this instance of Performer
		self = this;
		
		// initialise properties
		self.initialisationError = self.enums.initialisationError.None;
		
		// check the jQuery version
		if (!self.checkjQueryVersion()) {
			self.initialisationError = self.enums.initialisationError.jQueryTooOld;
			self.debugError( 'Initialisation error: ' + self.initialisationError );
			return;
		}
		
		// store the external references
		self.jQuery = jQuery;
		self.$ = jQuery;
		self.window = window;
		self.document = document;
		
		// add the CSS classes
		self.addStyles();
		
		// attach transformers, which perform actions on page load
		try {
			self.attachTransformers();
		} catch ( ex ) {
			self.debugException( ex );
		}
		
		// attach listeners, which respond to events on the page
		try {
			self.attachListeners();
		} catch ( ex ) {
			self.debugException( ex );
		}
		
		// set Performer as being initialised
		self.isInitialised = true;
	},
	
	// checks the version of jQuery to ensure it is new enough
	checkjQueryVersion: function() {
		// get the version number
		var version = jQuery.fn.jquery,
			parts = version.split( '.' ),
			majorVersion = parseInt( parts[0] ),
			minorVersion = parseInt( parts[1] );
		// check if jQuery is 1.7 or above (because we need the on() method)
		if ( majorVersion >= 1 && minorVersion >= 7 ) {
			return true;
		}
		return false;
	},
	
	// display an exception if Performer is in debug mode
	debugException: function( ex ) {
		if ( ! self.isDebugging ) {
			return;
		}
		console.exception( ex );
	},
	
	// display an error message if Performer is in debug mode
	debugError: function( message ) {
		if ( ! self.isDebugging ) {
			return;
		}
		console.error( message );
	},
	
	// display a warning message if Performer is in debug mode
	debugWarning: function( message ) {
		if ( ! self.isDebugging ) {
			return;
		}
		console.warn( message );
	},
	
	// display an informational message if Performer is in debug mode
	debugInfo: function( message ) {
		if ( ! self.isDebugging ) {
			return;
		}
		console.info( message );
	},
	
	// display an error message if Performer is in debug mode
	debug: function( message ) {
		if ( ! self.isDebugging ) {
			return;
		}
		console.log( message );
	},
	
	// add the CSS styles to the document
	addStyles: function() {
		self.document.write('<style type="text/css" id="performerstyles">.hider { display: none; }</style>');
	},
	
	// attach transformers, which perform actions on page load
	attachTransformers: function() {
	
		// hider
		self.$( '.' + self.defaults.hideClass, self.body ).each( function() {
			self.doHide( $( this ) );
		});
		
		// shower
		self.$( '.' + self.defaults.showClass, self.body ).each( function() {
			self.doShow( $( this ) );
		});
	},
	
	// attach listeners, which respond to events on the page
	attachListeners: function() {
	
		// toggler
		self.body.on( 'click keypress', "a.toggler,button.toggler,input[type='button'].toggler,input[type='submit'].toggler", self.toggle );
		self.body.on( 'change', "input[type='checkbox'].toggler,input[type='radio'].toggler,select.toggler", self.toggle );
		
		// group toggler: for backwards compatibility with Performer syntax < v2.0
		self.body.on( 'click keypress', '.grouptoggler', self.toggle );
		
		// switcher
		self.body.on( 'click keypress', '.switcher', self.switch );
		
		// sizer
		self.body.on( 'click keypress', '.sizer', self.size );
		
		// styler
		self.body.on( 'click keypress', "a.styler,button.styler,input[type='button'].styler,input[type='submit'].styler", self.style );
		self.body.on( 'change', "input[type='checkbox'].styler,input[type='radio'].styler,select.styler", self.style );
	},
	
	// toggle an elements visibility
	toggle: function( e ) {
		var el = self.$( this );
		if ( !el.length ) {
			return true;
		}
		
		// set the prefix to use with < v2.0 syntax
		var compatibilityPrefix = '#';
		// if the element has the grouptoggler class then the prefix needs to be a dot
		if ( el.hasClass( 'grouptoggler' ) ) {
			compatibilityPrefix = '.';
		}
		
		// get the target
		var target = self.getTarget( el, compatibilityPrefix );
		
		// if the element is a select list we hide the targets for all options
		// then show the target for the currently select option
		if ( el.prop( 'tagName' ) === 'SELECT' ) {
			// hide all the targets for all options
			self.hideTargets( el.find( 'option' ) );
			var option = el.find( ':selected' );
			target = self.getTarget( option );
		}
		
		// if the element is a radio button we hide the targets for all options
		// then show the target for the currently select option
		if ( el.prop( 'tagName' ) === 'INPUT' && el.attr( 'type' ) === 'radio' ) {
			// hide all the targets for all options
			var radioName = el.attr( 'name' );
			self.hideTargets( self.$( "input[type='radio'][name='" + radioName + "']" ) );
		}
		
		// check a target has been given
		if ( ! target ) {
			return true;
		}
		
		// get the target element(s)
		var targetEl = $( target );
		if ( ! targetEl.length ) {
			return true;
		}
		
		// get the show and hide effects
		var showeffect = el.dataVar( 'showeffect', 'slidedown' );
		var hideeffect = el.dataVar( 'hideeffect', 'slideup' );
		
		// get whether to allow the page to move, for example to jump to a page anchor if
		// the toggler is a link and has a href starting '#'
		var move = el.dataVar( 'move', false );
		
		// get the delay for the toggling
		var delay = el.dataVar( 'delay', 0 ) * 1000;
		
		// toggle the visibility of the target element(s)
		var elementShown = false;
		if ( delay === 0 ) {
			elementShown = self.doToggle( targetEl, showeffect, hideeffect );
		} else {
			self.window.setTimeout( function() {
				elementShown = self.doToggle( targetEl, showeffect, hideeffect );
			}, delay );
		}
		
		// if moving the window is allowed and the element is shown, move to the page anchor in the link href attribute
		var href = el.attr( "href" );
		if ( move && elementShown && href !== undefined && href.indexOf( '#' ) !== -1 ) {
			self.window.location.hash = href.split( '#' )[1];
		}
		
		// stop the event propagating
		return self.stopEvent( e );
	},
	
	// switch the visibility of two elements
	switch: function( e ) {
		var el = self.$( this );
		if ( !el.length ) {
			return true;
		}
		
		// get the targets
		var target1 = el.dataVar([
			'target1', // 2.0+ syntax, using data attributes
			['targetEl1', '#'], // < v2.0 syntax, using class parameters
			['rel', '#'] // < v2.0 syntax, using the rel attribute
		], false);
		var target2 = el.dataVar([
			'target2', // 2.0+ syntax, using data attributes
			['targetEl2', '#'], // < v2.0 syntax, using class parameters
			['rev', '#'] // < v2.0 syntax, using the rev attribute
		], false);
		if ( ! target1 || ! target2 ) {
			return true;
		}
		
		// get the target elements
		var targetEl1 = $( target1 ),
			targetEl2 = $( target2 );
		if ( ! targetEl1.length || ! targetEl2.length ) {
			return true;
		}
		
		// switch the elements
		if ( self.$( target1 ).is( ':visible' ) ) {
			self.doHide( self.$( target1 ) );
			self.doShow( self.$( target2 ) );
		} else {
			self.doShow( self.$( target1 ) );
			self.doHide( self.$( target2 ) );
		}
		
		// stop the event propagating
		return self.stopEvent( e );
	},
	
	// resize an element
	size: function( e ) {
		var el = $(this);
		if (!el.length) {
			return true;
		}
		
		// get the target
		var target = self.getTarget( el );
		if ( ! target ) {
			return true;
		}
		
		// get the target element(s)
		var targetEl = self.$( target );
		if ( ! targetEl.length ) {
			return true;
		}
		
		// get the size array
		var size = el.dataVar([
			'size', // 2.0+ syntax, using data attributes
			'sizes' // < v2.0 syntax, using class parameters
		], '');
		
		// no size given
		if ( size === '' ) {
			return true;
		}
		
		// get the height/width values
		var sizeParts, height, width;
		if ( typeof size === 'number' ) {
			height = size;
			width = 0;
		} else {
			sizeParts = size.split( ',' );
			height = sizeParts[0];
			width = sizeParts[1];
		}
		
		if ( height == '' ) { 
			height = 0; 
		}
		if ( width == '' ) { 
			width = 0; 
		}
		
		// get the current element dimensions
		var currentHeight = targetEl.height();
        var currentWidth = targetEl.width();
		
		// set the new height
		if (height !== 0) {
			var newHeight = ( parseFloat( height ) + parseFloat( currentHeight  ) ) + 'px';
			targetEl.css( { height: newHeight } );
		}
		
		// set the new width
		if (width !== 0) {
			var newWidth = ( parseFloat( width ) + parseFloat( currentWidth ) ) + 'px';
			targetEl.css( { width: newWidth } );
		}
		
		// stop the event propagating
		return self.stopEvent( e );
	},
	
	// apply a class to element(s)
	style: function( e ) {
		var el = self.$( this );
		if ( !el.length ) {
			return true;
		}
		
		// get the class name
		var className = el.dataVar( 'style', false );
		
		// get the target
		var target = self.getTarget( el );
		
		// if the element is a select list we hide the targets for all options
		// then show the target for the currently select option
		if ( el.prop( 'tagName' ) === 'SELECT' ) {
			// remove the class all the targets for all options
			self.removeClassFromTargets( el.find( 'option' ), className );
			var option = el.find( ':selected' );
			var optionTarget = self.getTarget( option );
			// if the option target is not set then use the target on the select list
			if ( optionTarget ) {
			    target = optionTarget;
			}
		}
        
        // if the element is a radio button we remove the class for all the targets for all options
		// then show the target for the currently select option
		if ( el.prop( 'tagName' ) === 'INPUT' && el.attr( 'type' ) === 'radio' ) {
			var radioName = el.attr( 'name' );
			self.removeClassFromTargets( self.$( "input[type='radio'][name='" + radioName + "']" ), className );
		}
		
		// check a target has been given
		if ( ! target ) {
			return true;
		}
		
		// if no class name has been specified we return
		if ( ! className ) {
		    return true;
		}
		
		// get the target element(s)
		var targetEl = $( target );
		if ( ! targetEl.length ) {
			return true;
		}
		
		// get the delay for the toggling
		var delay = el.dataVar( 'delay', 0 ) * 1000;
		
		// don't allow the class to be unstyled by default
		var unstyle = false;
		
		// see if the source element is a checkbox and if the target
		// element already has the class, in which case we want to remove it
		if ( el.prop( 'tagName' ) === 'INPUT' 
			&& el.attr( 'type' ) === 'checkbox'
			&& targetEl.hasClass( className ) ) {
			unstyle = true;
		}
		
		// if we can unstyle the element, for example when a checkbox is unchecked,
		// then remove the class instead of adding it
		if ( unstyle ) {
		    
			if ( delay === 0 ) {
				targetEl.removeClass( className );
			} else {
				self.window.setTimeout( function() {
					targetEl.removeClass( className );
				}, delay );
			}
		
		// just add the class
		} else {
		
			// add the class to the target element(s)
			if ( delay === 0 ) {
				targetEl.addClass( className );
			} else {
				self.window.setTimeout( function() {
					targetEl.addClass( className );
				}, delay );
			}
		}
		
		// stop the event propagating
		return self.stopEvent( e );
	},
	
	// performs a toggle of the given element(s), returning true if the element has been shown and false if it has been hidden
	doToggle: function( el, showeffect, hideeffect ) {
		// hide the element(s)
		if ( el.is( ':visible' ) ){
			self.doHide( el, hideeffect );
			el.removeClass( self.defaults.togglerOpenClass );
			el.addClass( self.defaults.togglerClosedClass );
		
		// show the element(s)
		} else {
			
			// show the hidden parents of the element
			el.parents().show();
		
			// show the element itself
			self.doShow( el, showeffect );
			el.removeClass( self.defaults.togglerClosedClass );
			el.addClass( self.defaults.togglerOpenClass );
			return true;
		}
		return false;
	},
	
	// shows an element, using the optional given effect
	doShow: function( el, effect ) {
	
		// try to perform the effect
		if ( ! self.doEffect( el, effect ) ) {
			el.show();
		}
		
		// toggle the classes
		el.removeClass( self.defaults.hideClass );
		el.addClass( self.defaults.showClass );
		return el;
	},
	
	// gets the target from the given element(s) and hides it
	hideTargets: function( el ) {
		self.$.each( self.getTargets( el ), function( index, value ) {
			self.doHide( self.$( value ) );
		});
	},
	
	// gets the target from the given element(s) and removes the given class name from them
	removeClassFromTargets: function( el, className ) {
		var targets = self.getTargets( el );
		for ( var i = 0; i < targets.length; i++ ) {
			self.$( targets[i] ).removeClass( className );
		};
	},
	
	// hides an element, using the optional given effect
	doHide: function( el, effect ) {
	
		// if the element is the one currently targeted with the hash then don't hide it
		if ( el.attr( 'id' ) !== undefined && el.attr( 'id' ) == self.hash ) {
			return;
		}
	
		// try to perform the effect
		if ( ! self.doEffect( el, effect ) ) {
			el.hide();
		}
		
		// toggle the classes
		el.removeClass( self.defaults.showClass );
		el.addClass( self.defaults.hideClass );
		return el;
	},
	
	// triggers an effect on the given element
	doEffect: function( el, effect ) {
		if ( effect === undefined ) {
			return false;
		}
		if ( effect == 'slideup' || effect == 'blindup' ) { 
			return el.slideUp( "normal" ); 
		}
		if ( effect == 'slidedown' || effect == 'blinddown' ) { 
			return el.slideDown( "normal" ); 
		}
		if ( effect == 'fadein' ) { 
			return el.fadeIn( "normal" ); 
		}
		if ( effect == 'fadeout' ) { 
			return el.fadeOut( "normal" ); 
		}
		return false;
	},
	
	// stops the default action of the given event
	stopEvent: function(e) {
		e.preventDefault;
		return false;
	},
	
	// get the target element from the given elements data attribute or class parameter
	getTarget: function( el, compatibilityPrefix ) {
		if ( ! el.length ) {
			return false;
		}
		
		if ( compatibilityPrefix === undefined ) {
			compatibilityPrefix = '#';
		}
		
		return el.dataVar( [
			'target', // 2.0+ syntax, using data attributes
			['targetEl', compatibilityPrefix], // < v2.0 syntax, using class parameters
			['rel', compatibilityPrefix] // < v2.0 syntax, using the rel attribute
		], false );
	},
		
	// gets the target from the element(s) in the given collection
	getTargets: function( el ) {
		if ( ! el.length ) {
			return [];
		}
		// get the targets
		var targets = [];
		el.each( function( index ) {
			targets.push( self.getTarget( self.$( this ) ) );
		});
		return self.$.unique( targets );
	},
	
	// stores enumerations
	enums: {
		// the enumeration of possible initialisation errors
		initialisationError: {
			None: 0,
			jQueryTooOld: 1
		}
	}
};
jQuery.fn.extend({
	// get a variable from a data attribute or class parameter
	dataVar: function( paramName, def ) {
		var val;
		
		// the parameter name is just a string, 
		if ( typeof paramName === 'string' ) {
		
			// see if the variable is defined in a data attribute (v2.0+)
			val = this.data( paramName );
			if ( val !== undefined ) {
				return val;
			}
			
			// see if the value is in a class parameter (< v2.0)
			val = this.getClassVar( paramName );
			if ( val !== undefined ) {
				return val;
			}
			
			// return the default value
			return def;
		}
		
		// the parameter names are in an array, so loop them to return the first matched one
		for ( var i = 0, thisParamName; thisParamName = paramName[i]; i++ ) {
		
			// see if the variable is defined in a data attribute (v2.0+)
			if ( typeof thisParamName === 'string' ) {
				val = this.data( thisParamName );
				if ( val !== undefined ) {
					return val;
				}
			}
			
			// see if the value is in a class parameter (< v2.0)
			val = this.getClassVar( thisParamName );
			if ( val !== undefined ) {
				return val;
			}
			
			// finally check for an attribute with this name (< v2.0, often used with 'rel')
			if ( typeof thisParamName === 'string' ) {
				val = this.attr( thisParamName );
				if ( val !== undefined ) {
					return val;
				}
			}
		}
		
		// return the default value
		return def;
	},
	
	// gets a variable from a class parameter (< v2.0)
	getClassVar: function( paramName ) {
		var classParamName,
			prefix = '';
	
		// the parameter name is a normal string
		if ( typeof paramName === 'string' ) {
			classParamName = paramName;
			
		// the parameter name is an array, with the first element being the class parameter name
		// and the second element the required prefix (normally a # or . to create a CSS selector)
		} else {
			classParamName = paramName[0];
			prefix = paramName[1];
		}
	
		// get the class attribute, if the element has one
		var classAttr = this.attr( 'class' );
		if ( classAttr === undefined ) {
			return undefined;
		}
	
		// get the classes on the element in an array
		var classes = classAttr.split( /\s+/ );
		
		// loop the classes
		for (var i = 0, thisClass; thisClass = classes[i]; i++) {
		
			// if this class starts with the parameter name then return the class parameter value,
			// with the prefix if required
			if ( thisClass && thisClass.substring(0, classParamName.length + 1) === classParamName + '-' ) { 
				return prefix + thisClass.replace( classParamName + '-', '' ); 
			}
		}
		
		// there is no class parameter with this name
		return undefined;
	},
	
	// returns a boolean indicating if this element is an anchor
	isAnchor: function() {
		return this.get( 0 ).nodeName.toLowerCase() === 'a';
	},
	
	// returns a boolean indicating if this element is a button
	isButton: function() {
		return ( 
			this.get( 0 ).nodeName.toLowerCase() === 'button' 
			|| 
			( this.get( 0 ).nodeName.toLowerCase() === 'input' && this.attr( 'type' ).toLowerCase() === 'button' )
		);
	}
});
Performer.init( jQuery, window, document );