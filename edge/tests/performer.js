/*
Performer JavaScript library (http://performerjs.org)
Created by Chris Taylor (http://www.stillbreathing.co.uk)
Additional work on version 1 by kourge and Danny Linkov
Version 2.0.0

This work is released under any of the following licenses, please choose the one you wish to use:

- Creative Commons Attribution-ShareAlike 3.0 licence (http://creativecommons.org/licenses/by-sa/3.0/)
- Microsoft Public License (http://www.opensource.org/licenses/ms-pl.html)
- MIT License (http://www.opensource.org/licenses/mit-license.php)
- BSD License (http://www.opensource.org/licenses/bsd-license.php)
*/

;var Performer = (function(window, document, $) {
'use strict';

	var

	// a reference to this
	self = undefined,
	
	// the version of Performer
    version = '2.0.0',
	
	// whether Performer is in debug mode
	isDebugging = true,
	
	// whether Performer is initialised
	isInitialised = false,
	
	// the initialisation error, if any
	initialisationError = 0,
	
	// stores the counter, incremented for unique ids
	counter = 0,
	
	// get the document body
	body = $('body'),
	
	// get the current location hash
	hash = window.location.hash.replace( '#', '' ),
	
	// the defaults
	defaults = {
		hideClass: 'hider',
		showClass: 'shower',
		togglerOpenClass: 'toggleropen',
		togglerClosedClass: 'togglerclosed',
	},
	
	// stores enumerations
	enums = {
		// the enumeration of possible initialisation errors
		initialisationError: {
			None: 0,
			jQueryTooOld: 1
		}
	},
	
	// a function that will be run when an action completes
	// this is used to assist unit testing
	callback: undefined,
	
	// ========================================================================================
	// Initialisation methods
	
	// initialise Performer
	init = function() {
		
		// set up the reference to this
		self = this;
		
		// reset the callback to an empty function
		self.resetCallback();
		
		// initialise properties
		self.initialisationError = self.enums.initialisationError.None;
		
		// check the jQuery version
		if ( ! checkjQueryVersion()) {
			self.initialisationError = self.enums.initialisationError.jQueryTooOld;
			self.debugError( 'Initialisation error: ' + self.initialisationError );
			return;
		}
		
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
	checkjQueryVersion = function() {
		// get the version number
		var version = $.fn.jquery,
			parts = version.split( '.' ),
			majorVersion = parseInt( parts[0] ),
			minorVersion = parseInt( parts[1] );
		// check if jQuery is 1.7 or above (because we need the on() method)
		if ( majorVersion >= 1 && minorVersion >= 7 ) {
			return true;
		}
		return false;
	},
	
	// ========================================================================================
	// Debugging methods
	
	// display an exception if Performer is in debug mode
	debugException = function( ex ) {
		if ( ! self.isDebugging ) {
			return;
		}
		console.exception ? console.exception( message ) : console.log( ex );
	},
	
	// display an error message if Performer is in debug mode
	debugError = function( message ) {
		if ( ! self.isDebugging ) {
			return;
		}
		console.error ? console.error( message ) : console.log( message );
	},
	
	// display a warning message if Performer is in debug mode
	debugWarning = function( message ) {
		if ( ! self.isDebugging ) {
			return;
		}
		console.warn ? console.warn( message ) : console.log( message );
	},
	
	// display an informational message if Performer is in debug mode
	debugInfo = function( message ) {
		if ( ! self.isDebugging ) {
			return;
		}
		console.info ? console.info( message ) : console.log( message );
	},
	
	// display an error message if Performer is in debug mode
	debug = function( message ) {
		if ( ! self.isDebugging ) {
			return;
		}
		console.log( message );
	},
	
	// ========================================================================================
	// Setup methods
	
	// add the CSS styles to the document
	addStyles = function() {
		document.write('<style type="text/css" id="performerstyles">.hider { display: none; }</style>');
	},
	
	// attach transformers, which perform actions on page load
	attachTransformers = function() {
	
		// hider
		$( '.' + self.defaults.hideClass, self.body ).each( function() {
			self.doHide( $( this ) );
		});
		
		// shower
		$( '.' + self.defaults.showClass, self.body ).each( function() {
			self.doShow( $( this ) );
		});
		
		// truncator
		$( '.truncator', self.body ).each( function() {
			self.truncate( $( this ) );
		});
		
		// looper
		$( '.looper', self.body ).each( function(){
			self.initLooper( $( this ) );
		});
		
		// pager
		$( '.pager', self.body ).each( function(){
			self.initPager( $( this ) );
		});
		
		// focusser
		$( '.focusser', self.body ).each( function(){
			self.focus( $( this ) );
		});
		
		// submitlocker
		$( 'form.submitlocker', self.body ).each( function(){
			self.submitlocker( $( this ) );
		});
	},
	
	// attach listeners, which respond to events on the page
	attachListeners = function() {
	
		// toggler
		self.body.on( 'click keypress', "a.toggler,form button.toggler,form input[type='button'].toggler,form input[type='submit'].toggler", self.toggle );
		self.body.on( 'change', "form input[type='checkbox'].toggler,form input[type='radio'].toggler,form select.toggler", self.toggle );
		
		// group toggler: for backwards compatibility with Performer syntax < v2.0
		self.body.on( 'click keypress', '.grouptoggler', self.toggle );
		
		// switcher
		self.body.on( 'click keypress', '.switcher', self.switcher );
		
		// sizer
		self.body.on( 'click keypress', '.sizer', self.size );
		
		// styler
		self.body.on( 'click keypress', "a.styler,form button.styler,form input[type='button'].styler,form input[type='submit'].styler", self.style );
		self.body.on( 'change', "form input[type='checkbox'].styler,form input[type='radio'].styler,form select.styler", self.style );
        
        // tabber
        self.body.on( 'click keypress', "a.tabber,form button.tabber,form input[type='button'].tabber,form input[type='submit'].tabber", self.tab );
        self.body.on( 'change', "form input[type='checkbox'].tabber,form input[type='radio'].tabber,form select.tabber", self.tab );
		
		// accordianer
        self.body.on( 'click keypress', "a.accordianer,form button.accordianer,form input[type='button'].accordianer,form input[type='submit'].accordianer", self.accordian );
        self.body.on( 'change', "form input[type='checkbox'].accordianer,form input[type='radio'].accordianer,form select.accordianer", self.accordian );
		
		// looper
        self.body.on( 'click keypress', "a.looperforward,form button.looperforward,form input[type='button'].looperforward,form input[type='submit'].looperforward", self.loop );
		self.body.on( 'click keypress', "a.looperback,form button.looperback,form input[type='button'].looperback,form input[type='submit'].looperback", self.loop );
		self.body.on( 'click keypress', "a.looperfirst,form button.looperfirst,form input[type='button'].looperfirst,form input[type='submit'].looperfirst", self.loop );
		self.body.on( 'click keypress', "a.looperlast,form button.looperlast,form input[type='button'].looperlast,form input[type='submit'].looperlast", self.loop );
		self.body.on( 'click keypress', "a.looperitem,form button.looperitem,form input[type='button'].looperitem,form input[type='submit'].looperitem", self.loop );
		self.body.on( 'click keypress', "a.looperitem,form button.looperitem,form input[type='button'].looperitem,form input[type='submit'].looperitem", self.loop );
		self.body.on( 'click keypress', "a.looperpause,form button.looperpause,form input[type='button'].looperpause,form input[type='submit'].looperpause", self.loop );
		self.body.on( 'click keypress', "a.looperstop,form button.looperstop,form input[type='button'].looperstop,form input[type='submit'].looperstop", self.loop );
		self.body.on( 'click keypress', "a.looperplay,form button.looperplay,form input[type='button'].looperplay,form input[type='submit'].looperplay", self.loop );
		self.body.on( 'click keypress', "a.looperstart,form button.looperstart,form input[type='button'].looperstart,form input[type='submit'].looperstart", self.loop );
		
		// pager
		self.body.on( 'click keypress', '.performer-pagination a', self.page );
	},
	
	// ========================================================================================
	// Feature methods
	
	// toggle an elements visibility
	toggle = function( e ) {
		var el = $( this );
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
			self.hideTargets( $( "input[type='radio'][name='" + radioName + "']" ) );
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
			window.setTimeout( function() {
				elementShown = self.doToggle( targetEl, showeffect, hideeffect );
			}, delay );
		}
		
		// if moving the window is allowed and the element is shown, move to the page anchor in the link href attribute
		var href = el.attr( "href" );
		if ( move && elementShown && href !== undefined && href.indexOf( '#' ) !== -1 ) {
			window.location.hash = href.split( '#' )[1];
		}
		
		// stop the event propagating
		return self.stopEvent( e );
	},
	
	// switch the visibility of two elements
	switcher = function( e ) {
		var el = $( this );
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
		if ( $( target1 ).is( ':visible' ) ) {
			self.doHide( $( target1 ) );
			self.doShow( $( target2 ) );
		} else {
			self.doShow( $( target1 ) );
			self.doHide( $( target2 ) );
		}
		
		// stop the event propagating
		return self.stopEvent( e );
	},
	
	// resize an element
	size = function( e ) {
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
		var targetEl = $( target );
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
	style = function( e ) {
		var el = $( this );
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
			self.removeClassFromTargets( $( "input[type='radio'][name='" + radioName + "']" ), className );
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
				window.setTimeout( function() {
					targetEl.removeClass( className );
				}, delay );
			}
		
		// just add the class
		} else {
		
			// add the class to the target element(s)
			if ( delay === 0 ) {
				targetEl.addClass( className );
			} else {
				window.setTimeout( function() {
					targetEl.addClass( className );
				}, delay );
			}
		}
		
		// stop the event propagating
		return self.stopEvent( e );
	},
	
    // show a tab in a tab group
	tab = function( e ) {
		self.doShowOneOfGroup( this, '.tab', 'tabGroup', 'tab' );
		
		// stop the event propagating
		return self.stopEvent( e );
	},
      
	// truncate the text in an element
	truncate = function( el ) {
		var limit = el.dataVar( 'limit', 50 ),
			moreText = el.dataVar( 'moretext', '...more' ),
			lessText = el.dataVar( 'lesstext', '...less' ),
			newHtml = '';
		
		if (el && limit) {
            var html = el.html();
            var length = html.length;
            if (limit < length) {
                var id = el.identify();
				newHtml += '<span id="' + id + '_truncated">' + html.substring(0, limit);
				newHtml	+= ' <a href="#" class="switcher" data-target1="#' + id + '_truncated" data-target2="#' + id + '_full">' + moreText + '</a></span>';
				newHtml += '<span class="hider" id="' + id + '_full">' + html;
				newHtml += ' <a href="#" class="switcher" data-target1="#' + id + '_truncated" data-target2="#' + id + '_full">' + lessText + '</a></span>'
                el.html(newHtml);
            }
        }
	},
		
	// show an item in an accordian group
	accordian = function( e ) {
		self.doShowOneOfGroup( this, '.accordianitem', 'group', 'item', 'slidedown' );
		
		// stop the event propagating
		return self.stopEvent( e );
	},
	
	// initialise a looper, showing the default (or first) child and starting the animation (if required)
	initLooper = function( looper ) {
		var defaultItem = $( '.looperdefault', looper );
		if ( defaultItem.length == 0 ) {
			defaultItem = looper.children( ':eq(0)' );
		}
		if ( defaultItem.length == 0 ) {
			return;
		}
		self.doHide( looper.children() );
		self.doShow( defaultItem );
		var delay = looper.dataVar( 'delay', 0 );
		if ( delay > 0 ) {
			self.startLooperAnimation( looper );
		}
	},
	
	// starts the animation of the given looper 
	startLooperAnimation = function( looper ) {
		var delay = looper.dataVar( 'delay' ),
			items = looper.children(),
			currentIndex,
			newIndex,
			animId;
		animId = window.setInterval( function(){
			currentIndex = items.filter(':visible').index();
			newIndex = currentIndex + 1;
			if ( newIndex >= items.length ) {
				newIndex = 0;
			}
			looper.data( 'currentitem', newIndex );
			self.doLoop( looper );
		}, delay * 1000 );
		looper.data( 'looperanim', animId );
	},
	
	// do a looper function
	loop = function( e ) {
		var el = $( this );
		if ( ! el.length ) {
			return true;
		}
		
		// get the target
		var target = self.getTarget( el );
		if ( ! target ) {
			return true;
		}
		
		// get the target element(s) and child items
		var targetEl = $( target );
		if ( ! targetEl.length ) {
			return true;
		}
		var items = targetEl.children();
		
		// get the index of the current item
		var currentIndex = items.filter(':visible').index();
		
		// get the new index to show
		var newIndex = currentIndex;
		if ( el.hasClass( 'looperback' ) ) {
			newIndex--;
			if ( newIndex < 0 ) {
				newIndex = items.length - 1;
			}
		} else if ( el.hasClass( 'looperforward' ) ) {
			newIndex++;
			if ( newIndex >= items.length ) {
				newIndex = 0;
			}
		} else if ( el.hasClass( 'looperfirst' ) ) {
			newIndex = 0;
		} else if ( el.hasClass( 'looperlast' ) ) {
			newIndex = items.length - 1;
		} else if ( el.hasClass( 'looperitem' ) ) {
			newIndex = el.dataVar( 'item', '#' );
		} else if ( el.hasClass( 'looperpause' ) || el.hasClass( 'looperstop' ) ) {
			window.clearTimeout( targetEl.data( 'looperanim' ) );
			return;
		} else if ( el.hasClass( 'looperplay' ) || el.hasClass( 'looperstart' ) ) {
			self.startLooperAnimation( targetEl );
			return;
		}
		
		targetEl.data( 'currentitem', newIndex );
		self.doLoop( targetEl );
		
		// stop the event propagating
		return self.stopEvent( e );
	},
	
	// move a looper to the new item; the index is in the data('currentitem') property
	doLoop = function( looper ) {
		var showAndHideEffect = self.getShowAndHideEffects( looper, 'fadein' ),
			newIndex = looper.data( 'currentitem' ),
			items = looper.children();
		// do the show and hide
		self.doShowAndHide( looper, items.eq( newIndex ), items.not( ':eq(' + newIndex + ')' ), showAndHideEffect.showEffect, showAndHideEffect.hideEffect );
	},
	
	// initialises a pager, showing the correct page
	initPager = function( pager ) {
		var id = pager.identify(),
			startpage = parseInt( pager.dataVar( 'startpage', 1 ) ),
			selector = pager.dataVar( 'selector' ),
			pagesize = parseInt( pager.dataVar( 'pagesize' , 10 ) ),
			items,
			numPages,
			startIndex,
			endIndex;		
		if ( typeof selector != 'undefined' ) {
			items = pager.find( selector ).children();
		} else {
			items = pager.children();
		}
		numPages = Math.ceil( items.length / pagesize );
		if ( startpage == 'last' ) {
			startpage = numPages;
		}
		for( var x = 1; x <= numPages; x++ ) {
			startIndex = ( x * pagesize ) - pagesize;
			endIndex = startIndex + pagesize;
			items.slice( startIndex, endIndex ).addClass( 'pageelement page' + x );
		}
		self.doShowAndHide( pager, items.filter( '.page' + startpage ), items.not( '.page' + startpage ) );
		self.buildPagerNavigation( pager, {
			id: id,
			startpage: startpage,
			selector: selector,
			pagesize: pagesize,
			items: items,
			numPages: numPages
		});
	},
	
	// builds the navigation for a pager element
	buildPagerNavigation = function( pager, options ) {
		var currentpage = '',
			menu = '<ul class="performer-pagination" id="' + options.id + '-pagination">',
			x;
        for (x = 1; x <= options.numPages; x++) {
            if (x == options.startpage) {
				currentpage = ' currentpage'; 
			}
            menu += '<li><a href="#' + options.id + '-page' + x + '" class="' + options.id + '-pagerlink pagerlink' + currentpage + '" id="' + options.id + '-page' + x + '">' + x + '</a></li>';
            currentpage = '';
        }
        menu += '</ul>';
		pager.after(menu);
	},
	
	// shows a page in a pager element
	page = function( e ) {
		var el = $( this ),
			pagerList = el.parents( '.performer-pagination' ),
			id = pagerList.attr( 'id' ),
			pagerId = id.replace( '-pagination', '' ),
			page = el.attr( 'id' ).replace( pagerId + '-', '' ),
			pagerEl,
			effects,
			elsToHide,
			elsToShow;
		pagerEl = $( '#' + pagerId);
		if ( ! pagerEl.length ) {
			return;
		}
		effects = self.getShowAndHideEffects( pagerList );
		elsToHide = $( '.pageelement', pagerEl );
		elsToShow = $( '.' + page, pagerEl );
		self.doShowAndHide( el, elsToShow, elsToHide, effects.showEffect, effects.hideEffect );
	},
	
	// focus on the given element
	focus = function( el ) {
		el.focus();
	},
	
	// stops a form being submitted more than once
	submitlocker = function( el ) {
		el.on( 'submit', function( e ) {
			$( "input[type='submit'],button[type='submit']" ).prop( 'disabled', true );
			e.preventDefault();
			return false;
		});
	},
	
	// ========================================================================================
	// Visibility methods
		
	// shows one of a group of items; used by accordianer and tabber
	doShowOneOfGroup = function( initiator, itemSelector, groupId, itemId, showEffect ) {
		var el = self.getElement( initiator );
		
		if ( ! el.length ) {
			return true;
		}
		
		// get the target group
		var group = el.dataVar( [
			'target',
			[groupId, '#'] // checks all syntaxes for the group variable
		], false );
        var item = el.dataVar( [
			[itemId, '#'] // checks all syntaxes for the item variable
		], false );
		
		// get the effect
		showEffect = el.dataVar( [
			'showeffect'
		], showEffect );
		
		// check a target has been given
		if ( ! group || ! item ) {
			return true;
		}
		
		// get the target element(s)
		var targetGroup = $( group ),
            targetItemEl = $( item );
		if ( ! targetGroup.length || ! targetItemEl.length ) {
			return true;
		}
        
        // get the items in the group
        var items = $( itemSelector, targetGroup );
		
        // no items? then there's nothing we can do
        if ( ! items.length ) {
            return true;
        }
        
		self.doShowAndHide( el, targetItemEl, items, showEffect );
	},
	
	// shows and hides the given elements
	doShowAndHide = function( el, elsToShow, elsToHide, showEffect, hideeffect ) {
		// get the delay
		var delay = el.dataVar( 'delay', 0 ) * 1000;

        // toggle the tabs
        if ( delay === 0 ) {
			self.doHide( elsToHide, hideeffect );
            self.doShow( elsToShow, showEffect );
        } else {
            window.setTimeout( function() {
                self.doHide( elsToHide, hideeffect );
                self.doShow( elsToShow, showEffect );
            }, delay );
        }
	},
		
	// performs a toggle of the given element(s), returning true if the element has been shown and false if it has been hidden
	doToggle = function( el, showeffect, hideeffect ) {
		// hide the element(s)
		if ( el.is( ':visible' ) ){
			self.doHide( el, hideeffect );
			el.removeClass( defaults.togglerOpenClass );
			el.addClass( defaults.togglerClosedClass );
		
		// show the element(s)
		} else {
			
			// show the hidden parents of the element
			el.parents().show();
		
			// show the element itself
			self.doShow( el, showeffect );
			el.removeClass( defaults.togglerClosedClass );
			el.addClass( defaults.togglerOpenClass );
			return true;
		}
		return false;
	},
	
	// shows an element, using the optional given effect
	doShow = function( el, effect ) {
	
		// try to perform the effect
		if ( ! doEffect( el, effect ) ) {
			el.show();
		}
		
		// toggle the classes
		el.removeClass( self.defaults.hideClass );
		el.addClass( self.defaults.showClass );
		return el;
	},
	
	// hides an element, using the optional given effect
	doHide = function( el, effect ) {
	
		// if the element is the one currently targeted with the hash then don't hide it
		if ( el.attr( 'id' ) !== undefined && el.attr( 'id' ) == hash ) {
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
	
	// gets the target from the given element(s) and hides it
	hideTargets = function( el ) {
		$.each( getTargets( el ), function( index, value ) {
			self.doHide( $( value ) );
		});
	},
	
	// ========================================================================================
	// Effect methods
	
	// triggers an effect on the given element
	doEffect = function( el, effect ) {
		if ( effect === undefined ) {
			return false;
		}
		if ( effect == 'slideup' || effect == 'blindup' ) { 
			return el.slideUp( "normal", self.callback ); 
		}
		if ( effect == 'slidedown' || effect == 'blinddown' ) { 
			return el.slideDown( "normal", self.callback ); 
		}
		if ( effect == 'fadein' ) { 
			return el.fadeIn( "normal", self.callback ); 
		}
		if ( effect == 'fadeout' ) { 
			return el.fadeOut( "normal", self.callback ); 
		}
		return false;
	},
	
	// gets the show and hide effects from the given element
	getShowAndHideEffects = function( el, defaultShowEffect, defaultHideEffect ) {
		return {
			showEffect: el.dataVar( 'showeffect', self.defaultShowEffect ),
			hideEffect: el.dataVar( 'hideeffect', self.defaultHideEffect )
		};
	},
	
	// ========================================================================================
	// CSS class methods
	
	// gets the target from the given element(s) and removes the given class name from them
	removeClassFromTargets = function( el, className ) {
		var targets = self.getTargets( el );
		for ( var i = 0; i < targets.length; i++ ) {
			$( targets[i] ).removeClass( className );
		};
	},
	
	// ========================================================================================
	// Event methods
	
	// stops the default action of the given event
	stopEvent = function(e) {
		e.preventDefault;
		return false;
	},
	
	// runs the callback function, if one is set
	doCallback = function() {
		if (typeof self.callback == 'function') {
			self.callback();
		}
	},
	
	// resets the callback function
	resetCallback = function() {
		self.callback = function(){};
	},
	
	// ========================================================================================
	// Acquisition methods
	
	// gets the element which triggered an event; either $(this) or the selected form element
	getElement = function( el ) {
		var result = $( el );
		if ( !result.length ) {
			return [];
		}
		
		// if the element is a select list show the tab for the currently select option
		if ( result.prop( 'tagName' ) === 'SELECT' ) {
			result = result.find( ':selected' );
		}
		// if the element is a radio button show the tab for the currently select option
		if ( result.prop( 'tagName' ) === 'INPUT' && result.attr( 'type' ) === 'radio' ) {
			var inputName = result.attr( 'name' ),
				form = result.parents( 'form' );
			result = $( "input[name='" + inputName + "']:checked", form );
		}
		
		if ( result.length ) {
			return result;
		}
		
		return [];
	},
	
	// get the target element from the given elements data attribute or class parameter
	getTarget = function( el, compatibilityPrefix ) {
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
	getTargets = function( el ) {
		if ( ! el.length ) {
			return [];
		}
		// get the targets
		var targets = [];
		el.each( function( index ) {
			targets.push( getTarget( $( this ) ) );
		});
		return $.unique( targets );
	};
	
	return {
		callback: callback,
		resetCallback: resetCallback,
		counter: counter,
		init: init,
		isInitialised: isInitialised,
		initialisationError: initialisationError,
		enums: enums
	}

})(window, document, jQuery);

// jQuery functions
jQuery.fn.extend({

	// get the ID of an element, or create a unique id
	identify: function(){
        var el = $(this),
			id = el.attr('id');
        if ( ! id || id === '' ) {
			Performer.counter = Performer.counter + 1;
            id = 'anonymous_element_' + Performer.counter;
            el.attr('id', id);
        }
        return id;
	},

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
			val = this.getData( thisParamName );
			if ( val !== undefined ) {
				return val;
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
	
	// gets a variable from a data attribute (v2.0+)
	getData: function( paramName ) {
		if ( typeof paramName === 'string' ) {
			return this.data( paramName );
		} else {
			return this.data( paramName[0] );
		}
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
Performer.init();