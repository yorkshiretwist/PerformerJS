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
	
	// the version of Performer
    version = '2.0.0',
	
	// whether Performer is in debug mode
	isDebugging = false,
	
	// whether Performer is initialised
	isInitialised = false,
	
	// the initialisation error, if any
	initialisationError = 0,
	
	// stores the counter, incremented for unique ids
	counter = 0,
	
	// an array of duplicator elements
	duplicators = [],
	
	// get the document body
	body = $('body'),
	
	// get the current location hash
	hash = window.location.hash.replace( '#', '' ),
	
	// the defaults
	defaults = {
		hideClass: 'hider',
		hiderHidden: 'hidden',
		showClass: 'shower',
		showerShown: 'shown',
		togglerOpenClass: 'toggleropen',
		togglerClosedClass: 'togglerclosed',
		focusserFocussedClass: 'focussed',
		submitlockerDisabled: 'disabled'
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
	callback = undefined,
	
	// ========================================================================================
	// Initialisation methods
	
	// initialise Performer
	init = function() {
		
		// reset the callback to an empty function
		resetCallback();
		
		// initialise properties
		Performer.initialisationError = enums.initialisationError.None;
		
		// check the jQuery version
		if ( ! checkjQueryVersion()) {
			initialisationError = enums.initialisationError.jQueryTooOld;
			debugError( 'Initialisation error: ' + initialisationError );
			return;
		}
		
		// add the CSS classes
		addStyles();
		
		// attach transformers and event handlers to the body element
		body = $('body');
		initElement( body );
		
		// initialise internal properties
		Performer.duplicators = [];
		
		// set Performer as being initialised
		Performer.isInitialised = true;
	},
	
	// attach transformers and event handlers to an element
	initElement = function( el ) {
		
		// attach transformers, which perform actions on page load
		try {
			attachTransformers( el );
		} catch ( ex ) {
			debugException( ex );
		}
		
		// attach listeners, which respond to events on the page
		try {
			attachListeners( el );
		} catch ( ex ) {
			debugException( ex );
		}
		
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
		if ( ! Performer.isDebugging || ! window.console ) {
			return;
		}
		console.exception ? console.exception( message ) : console.log( ex );
	},
	
	// display an error message if Performer is in debug mode
	debugError = function( message ) {
		if ( ! Performer.isDebugging || ! window.console ) {
			return;
		}
		console.error ? console.error( message ) : console.log( message );
	},
	
	// display a warning message if Performer is in debug mode
	debugWarning = function( message ) {
		if ( ! Performer.isDebugging || ! window.console ) {
			return;
		}
		console.warn ? console.warn( message ) : console.log( message );
	},
	
	// display an informational message if Performer is in debug mode
	debugInfo = function( message ) {
		if ( ! Performer.isDebugging || ! window.console ) {
			return;
		}
		console.info ? console.info( message ) : console.log( message );
	},
	
	// display an error message if Performer is in debug mode
	debug = function( message ) {
		if ( ! Performer.isDebugging || ! window.console ) {
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
	attachTransformers = function( el ) {
	
		// hider
		$( '.' + defaults.hideClass, el ).each( function() {
			doHide( $( this ) );
		});
		
		// shower
		$( '.' + defaults.showClass, el ).each( function() {
			doShow( $( this ) );
		});
		
		// focusser
		$( '.focusser', el ).each( function(){
			focus( $( this ) );
		});
		
		// truncator
		$( '.truncator', el ).each( function() {
			truncate( $( this ) );
		});
		
		// looper
		$( '.looper', el ).each( function(){
			initLooper( $( this ) );
		});
		
		// pager
		$( '.pager', el ).each( function(){
			initPager( $( this ) );
		});
		
		// submitlocker
		$( 'form.submitlocker', el ).each( function(){
			submitlocker( $( this ) );
		});
		
		// submitlocker
		$( 'input.prompter,textarea.prompter', el ).each( function(){
			setPrompt( $( this ) );
		});
	},
	
	// attach listeners, which respond to events on the page
	attachListeners = function( el ) {
	
		// toggler
		el.on( 'click keypress', "a.toggler,form button.toggler,form input[type='button'].toggler,form input[type='submit'].toggler", toggle );
		el.on( 'change', "form input[type='checkbox'].toggler,form input[type='radio'].toggler,form select.toggler", toggle );
		
		// group toggler: for backwards compatibility with Performer syntax < v2.0
		el.on( 'click keypress', '.grouptoggler', toggle );
		
		// switcher
		el.on( 'click keypress', '.switcher', switcher );
		
		// sizer
		el.on( 'click keypress', '.sizer', size );
		
		// styler
		el.on( 'click keypress', "a.styler,form button.styler,form input[type='button'].styler,form input[type='submit'].styler", style );
		el.on( 'change', "form input[type='checkbox'].styler,form input[type='radio'].styler,form select.styler", style );
        
        // tabber
        el.on( 'click keypress', "a.tabber,form button.tabber,form input[type='button'].tabber,form input[type='submit'].tabber", tab );
        el.on( 'change', "form input[type='checkbox'].tabber,form input[type='radio'].tabber,form select.tabber", tab );
		
		// accordianer
        el.on( 'click keypress', "a.accordianer,form button.accordianer,form input[type='button'].accordianer,form input[type='submit'].accordianer", accordian );
        el.on( 'change', "form input[type='checkbox'].accordianer,form input[type='radio'].accordianer,form select.accordianer", accordian );
		
		// looper
        el.on( 'click keypress', "a.looperforward,form button.looperforward,form input[type='button'].looperforward,form input[type='submit'].looperforward", loop );
		el.on( 'click keypress', "a.looperback,form button.looperback,form input[type='button'].looperback,form input[type='submit'].looperback", loop );
		el.on( 'click keypress', "a.looperfirst,form button.looperfirst,form input[type='button'].looperfirst,form input[type='submit'].looperfirst", loop );
		el.on( 'click keypress', "a.looperlast,form button.looperlast,form input[type='button'].looperlast,form input[type='submit'].looperlast", loop );
		el.on( 'click keypress', "a.looperitem,form button.looperitem,form input[type='button'].looperitem,form input[type='submit'].looperitem", loop );
		el.on( 'click keypress', "a.looperitem,form button.looperitem,form input[type='button'].looperitem,form input[type='submit'].looperitem", loop );
		el.on( 'click keypress', "a.looperpause,form button.looperpause,form input[type='button'].looperpause,form input[type='submit'].looperpause", loop );
		el.on( 'click keypress', "a.looperstop,form button.looperstop,form input[type='button'].looperstop,form input[type='submit'].looperstop", loop );
		el.on( 'click keypress', "a.looperplay,form button.looperplay,form input[type='button'].looperplay,form input[type='submit'].looperplay", loop );
		el.on( 'click keypress', "a.looperstart,form button.looperstart,form input[type='button'].looperstart,form input[type='submit'].looperstart", loop );
		
		// pager
		el.on( 'click keypress', '.performer-pagination a', page );
		
		// morpher
		el.on( 'click keypress', "a.morpher,form button.morpher,form input[type='button'].morpher,form input[type='submit'].morpher", morph );
		
		// hooker
		el.on( 'click keypress', '.hooker-click', hook );
        el.on( 'keypress', '.hooker-keypress', hook );
		el.on( 'keydown', '.hooker-keydown', hook );
        el.on( 'change', '.hooker-change', hook );
        el.on( 'mouseover', '.hooker-mouseover', hook );
        el.on( 'mouseout', '.hooker-mouseout', hook );
        el.on( 'submit', '.hooker-submit', hook );
        el.on( 'focus', '.hooker-focus', hook );
        el.on( 'blur', '.hooker-blur', hook );
		
		// popper
		el.on( 'click keypress', '.popper', pop );
		
		// duplicator
		el.on( 'click keypress', '.duplicator', duplicate );
		
		// setter
		el.on( 'click keypress', '.setter', set );
		
		// limiter
		el.on( 'keyup keydown', '.limiter', limit );
		
		// prompter
		el.on( 'focus', 'input.prompter,textarea.prompter', removePrompt );
        el.on( 'blur', 'input.prompter,textarea.prompter', checkPrompt);
		
		// editor
		el.on( 'click keypress', '.editor', edit );
        el.on( 'click keypress', '.uneditor', unEdit );
	},
	
	// ========================================================================================
	// Feature methods
	
	// toggle an elements visibility
	toggle = function( e ) {
		var el = $( this );
		if ( !el.length ) {
			return true;
		}
		
		var compatibilityPrefix = '#';
		
		// if the element has the grouptoggler class then the prefix needs to be a dot
		if ( el.hasClass( 'grouptoggler' ) ) {
			compatibilityPrefix = '.';
		}
		
		// get the target
		var target = getTarget( el, compatibilityPrefix );
		
		// if the element is a select list we hide the targets for all options
		// then show the target for the currently select option
		if ( el.prop( 'tagName' ) === 'SELECT' ) {
			// hide all the targets for all options
			hideTargets( el.find( 'option' ) );
			var option = el.find( ':selected' );
			target = getTarget( option );
		}
		
		// if the element is a radio button we hide the targets for all options
		// then show the target for the currently select option
		if ( el.prop( 'tagName' ) === 'INPUT' && el.attr( 'type' ) === 'radio' ) {
			// hide all the targets for all options
			var radioName = el.attr( 'name' );
			hideTargets( $( "input[type='radio'][name='" + radioName + "']" ) );
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
			elementShown = doToggle( targetEl, showeffect, hideeffect );
		} else {
			window.setTimeout( function() {
				elementShown = doToggle( targetEl, showeffect, hideeffect );
			}, delay );
		}
		
		// if moving the window is allowed and the element is shown, move to the page anchor in the link href attribute
		var href = el.attr( "href" );
		if ( move && elementShown && href !== undefined && href.indexOf( '#' ) !== -1 ) {
			window.location.hash = href.split( '#' )[1];
		}
		
		// stop the event propagating
		return stopEvent( e );
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
			doHide( $( target1 ) );
			doShow( $( target2 ) );
		} else {
			doShow( $( target1 ) );
			doHide( $( target2 ) );
		}
		
		// stop the event propagating
		return stopEvent( e );
	},
	
	// resize an element
	size = function( e ) {
		var el = $(this);
		if (!el.length) {
			return true;
		}
		
		// get the target element(s)
		var targetEl = getTargetElement( el );
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
		return stopEvent( e );
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
		var target = getTarget( el );
		
		// if the element is a select list we hide the targets for all options
		// then show the target for the currently select option
		if ( el.prop( 'tagName' ) === 'SELECT' ) {
			// remove the class all the targets for all options
			removeClassFromTargets( el.find( 'option' ), className );
			var option = el.find( ':selected' );
			var optionTarget = getTarget( option );
			// if the option target is not set then use the target on the select list
			if ( optionTarget ) {
			    target = optionTarget;
			}
		}
        
        // if the element is a radio button we remove the class for all the targets for all options
		// then show the target for the currently select option
		if ( el.prop( 'tagName' ) === 'INPUT' && el.attr( 'type' ) === 'radio' ) {
			var radioName = el.attr( 'name' );
			removeClassFromTargets( $( "input[type='radio'][name='" + radioName + "']" ), className );
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
		return stopEvent( e );
	},
	
    // show a tab in a tab group
	tab = function( e ) {
		doShowOneOfGroup( this, '.tab', 'tabGroup', 'tab' );
		
		// stop the event propagating
		return stopEvent( e );
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
		doShowOneOfGroup( this, '.accordianitem', 'group', 'item', 'slidedown' );
		
		// stop the event propagating
		return stopEvent( e );
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
		doHide( looper.children() );
		doShow( defaultItem );
		var delay = looper.dataVar( 'delay', 0 );
		if ( delay > 0 ) {
			startLooperAnimation( looper );
		}
	},
	
	// starts the animation of the given looper 
	startLooperAnimation = function( looper ) {
		if ( ! looper.is( ':visible' ) ) {
			return;
		}
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
			doLoop( looper );
		}, delay * 1000 );
		looper.data( 'looperanim', animId );
	},
	
	// do a looper function
	loop = function( e ) {
		var el = $( this );
		if ( ! el.length ) {
			return true;
		}
		
		// get the target element(s)
		var targetEl = getTargetElement( el );
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
			startLooperAnimation( targetEl );
			return;
		}
		
		targetEl.data( 'currentitem', newIndex );
		doLoop( targetEl );
		
		// stop the event propagating
		return stopEvent( e );
	},
	
	// move a looper to the new item; the index is in the data('currentitem') property
	doLoop = function( looper ) {
		var showAndHideEffect = getShowAndHideEffects( looper, 'fadein' ),
			newIndex = looper.data( 'currentitem' ),
			items = looper.children();
		// do the show and hide
		doShowAndHide( looper, items.eq( newIndex ), items.not( ':eq(' + newIndex + ')' ), showAndHideEffect.showEffect, showAndHideEffect.hideEffect );
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
		doShowAndHide( pager, items.filter( '.page' + startpage ), items.not( '.page' + startpage ) );
		buildPagerNavigation( pager, {
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
		effects = getShowAndHideEffects( pagerList );
		elsToHide = $( '.pageelement', pagerEl );
		elsToShow = $( '.' + page, pagerEl );
		doShowAndHide( el, elsToShow, elsToHide, effects.showEffect, effects.hideEffect );
	},
	
	// focus on the given element
	focus = function( el ) {
		el.focus();
		el.addClass(defaults.focusserFocussedClass);
	},
	
	// stops a form being submitted more than once
	submitlocker = function( el ) {
		el.on( 'submit', function( e ) {
			var btns = $( "input[type='submit'],button[type='submit']", el );
			btns.prop( 'disabled', true );
			btns.addClass( defaults.submitlockerDisabled );
			e.preventDefault();
			return false;
		});
	},
	
	// morphs an element
	morph = function( e ) {
		var el = $( this );
		if ( !el.length ) {
			return true;
		}
		
		// get the target element(s)
		var targetEl = getTargetElements( el );
		if ( ! targetEl.length ) {
			return true;
		}
		
		// get the allowed properties to morph
		var props = ["lineHeight", "margin", "padding", "width", "height", "opacity", "fontSize", "borderWidth"];
		if (jQuery.Color){
			props.push("color");
			props.push("backgroundColor");
		}
		var params = setupMorphProperties( el, props );
		
		// get the delay for the morphing
		var delay = el.dataVar( 'delay', 0 ) * 1000;
		
		// get the duration for the morphing
		var duration = el.dataVar( 'duration', 0.3 ) * 1000;
		
		if ( delay === 0 ) {
			$( targetEl ).animate( params, duration )
		} else {
			window.setTimeout( function() {
				$( targetEl ).animate( params, duration )
			}, delay );
		}
		
		// stop the event propagating
		return stopEvent( e );
	},
	
	// setup the morphing properties
	setupMorphProperties = function( el, props ) {
		// initialise params
		var param, params, i, j;
		// loop properties, filling the output properties
		params = {};
		for ( i = 0, j = props.length; i < j; i++ ) {
			param = el.dataVar( props[i], false );
			if ( param !== false ) {
				if ( typeof param == 'string' ) {
					params[ props[ i ] ] = param.replace( 'px', '' );
				} else {
					params[ props[ i ] ] = param;
				}
			}
		}
		return params;
	},
	
	// fires a function when an event happens
	hook = function( e ) {
		var el = $( this );
		if ( !el.length ) {
			return true;
		}
		
		// get the function
		var func = el.dataVar( 'func', undefined );
		
		// get the delay for the morphing
		var delay = el.dataVar( 'delay', 0 ) * 1000;
		
		if ( delay === 0 ) {
			callFunc( func, el, e );
		} else {
			window.setTimeout( function() {
				callFunc( func, el, e );
			}, delay );
		}
	},
	
	// calls a user-defined function passing the calling element and event
	callFunc = function( func, el, e ) {
		// check the function exists
		if ( eval( 'typeof(' + func + ')' ) == 'function' ) {
			// execute the function, passing the element and event
			eval( func + '(el,e)' );
		}
	},
	
	// displays a popup window
	pop = function( e ) {
		var el = $( this );
		if ( !el.length ) {
			return true;
		}
		
		// only allow clicks and the enter key
		if ( ! isValidTrigger( e ) ) {
			return true;
		}
		
		// get the href from the data attribute
		var href = el.dataVar( 'href', undefined );
		
		// use the href attribute if there is one
		if ( ! href && el[0].href ) {
			href = el[0].href;
		}
		
		// if there's still no href we can't do anything
		if ( ! href ) {
			return true;
		}
		
		var targetName = el.dataVar( 'targetName', undefined );
		if ( ! targetName ) {
			targetName = 'popupwindow_' + Performer.nextCounter();
		}
		
		// get the options
		var options = el.dataVar( 'options', 'scrollbars=yes,toolbar=yes,menubar=yes,location=yes,status=yes,directories=yes' );
		
		// open the window
		var win = window.open( href, targetName, options );
		if ( window.focus ) { 
			win.focus();
		}
		
		// stop the event propagating
		return stopEvent( e );
	},
	
	// duplicates an element
	duplicate = function( e ) {
        var el = $( this );
		if ( !el.length ) {
			return true;
		}
		
		// get the source and target elements
		var source = $( el.dataVar( [ 'source', [ 'sourceElement', '#' ] ], undefined ) );
		var targetSelector = el.dataVar( [ 'target', [ 'targetElement', '#' ] ], undefined );
		var target = $( targetSelector );

		if ( ! source.length || ! target.length ) {
			return true;
		}
		
		var start = el.dataVar( 'start', 1 ) - 1;
		var counter = $( el.dataVar( [ 'counter', 'countElement' ], undefined ) );
		var items = start + 2;
		
		// clone the element and append it to the target
		var clonedElement = $( source[0].cloneNode( true ) );
		var newElement = target.append( clonedElement );
		
		// store the count of duplicated items
		if ( typeof( Performer.duplicators[ targetSelector ] ) == 'undefined' ) {
			Performer.duplicators[ targetSelector ] = items;
		} else {
			items = Performer.duplicators[ targetSelector ] + 1;
			Performer.duplicators[ targetSelector ] = items;
		}
		
		// do any string replacements
		clonedElement.html( clonedElement.html().replace( /_1/g, '_' + items ) );
        clonedElement.html( clonedElement.html().replace( /[1]/g, items ) );
        clonedElement[0].id = clonedElement[0].id.replace( /_1/g, '_' + items );

		var clonedElementClass = clonedElement.attr( 'class' );
		if ( clonedElementClass != '' ) {
			clonedElement.attr( 'class', clonedElementClass.replace( /_1/g, '_' + items ) );
        }
		
		// update the counter, if one is set
		if ( counter.length ) { 
			counter.val( items ); 
		}
		
		// stop the event propagating
		return stopEvent( e );
    },
	
	// sets the value of a form field
    set = function( e ) {
		var el = $( this );
		if ( !el.length ) {
			return true;
		}
		
		// get the target element(s)
		var targetEl = getTargetElement( el );
		if ( ! targetEl.length ) {
			return true;
		}
		
		// get the value
		var value = el.dataVar( 'value', undefined );
		if ( ! value ) {
			return true;
		}
		
		// get the value
		targetEl.val( value );
		
        // stop the event propagating
		return stopEvent( e );
    },
	
	// limit the amount of text in an input box or textarea
    limit = function( e ) {
		var el = $( this );
		if ( !el.length ) {
			return true;
		}
		
		// get the character limit
		var limit = el.dataVar( [ 'limit', 'lengthLimit' ], undefined );
		if ( ! limit ) {
			return true;
		}
		limit = parseInt( limit );
		
		// get the element that will show the remaining characters
		var notificationEl = getTargetElement( el );
		
		// get the notification messages
		var charsRemainingMessage = el.dataVar( 'remainingMsg', '# characters left' );
		var limitMessage = el.dataVar( 'limitMsg', 'Limit reached' );
		
		// get the current length
		var currentLength = el.val().length;
		
		// get the characters left, taking off an additional 1 as this fires *before the character has been inserted*
		var charsRemaining = limit - currentLength;
		
		if ( charsRemaining <= 0 ) {
			
			// update the message
			if ( notificationEl.length && charsRemaining == 0 ) {
				notificationEl.html( limitMessage );
			}
			
			// check if the key is an allowed one
			var key = keyCode( e );
			if ( key == 8 || key == 46 || key == 37 || key == 39 ) {
				return true;
			}
			
			// stop the event propagating
			e.stopPropagation();
			return stopEvent( e );
			
		}
		
		// update the message if needed
		if ( notificationEl.length ) {
			notificationEl.html( charsRemainingMessage.replace( '#', charsRemaining ) );
		}
		
		return true;
    },
	
	// set the prompt text for a text or textarea element
    setPrompt = function( el ) {
		var placeHolderSupport = ('placeholder' in document.createElement('input')),
			placeholder = el.attr(' placeholder' ),
			title = el.attr( 'title' );
		// if the browser supports the HTML5 placeholder attribute then use it
		// (from http://robertnyman.com/2010/06/17/adding-html5-placeholder-attribute-support-through-progressive-enhancement/)
		if ( placeHolderSupport ) {
			if( placeholder && placeholder.length ) {
				return;
			}
			el.attr( 'placeholder', title );
			return;
		}
		
		if ( el.val().length ) {
			return;
		}
		
		var form = el.parents( 'form' );
		if ( form.length ) {
			form.on( 'submit', function() {
				clearPrompt( el );
			});
		}
		
		el.val( title );
		el.addClass( 'performer-prompter' );
    },
	
    // remove a prompt
    removePrompt = function( e ) {
		var el = $( this );
		if ( !el.length ) {
			return true;
		}
		
		clearPrompt( el );
    },
	
    // clear the prompt
    clearPrompt = function( el ) {
		var title = el.attr( 'title' );
		
		if ( el.val() != title ) {
			return;
		}
		
		el.val( '' );
		el.removeClass( 'performer-prompter' );
    },
	
    // check a prompt is present
    checkPrompt = function( e ) {
		var el = $( this );
		if ( !el.length ) {
			return true;
		}
		
		var title = el.attr( 'title' );
		
		if ( el.val().length ) {
			return;
		}
		
		setPrompt( el );
    },
	
	// edit the contents of an element and send the results to a processing page
    edit = function( e ) {
        var el = $( this );
		if ( !el.length ) {
			return true;
		}
		
		// only allow clicks and the enter key
		if ( ! isValidTrigger( e ) ) {
			return true;
		}
		
		// if the click is on the unedit element then return, we catch this separately
		if ( $( e.target ).hasClass( 'uneditor' ) ) {
			return false;
		}
		
		// if the element already contains a form then we have to return here
		if ( $( 'form', el ).length ) {
			return;
		}
		
		var id = el.identify(),
			targetPage = el.dataVar( 'targetPage', [] ),
			targetElement = getTargetElement( el ),
			autosave = el.dataVar( 'autosave', false ),
			inputType = el.dataVar( 'inputType', 'input' );
			
		if ( ! targetPage.length || ! inputType.length ) {
			return;
		}
		
		// build the editing form
		el.html( buildEditForm( el, targetPage, inputType, autosave ) );
		
		// get the created elements
		var form = $( '#' + id + '-editor' ),
			valueEl = $( '#' + id + '-value' );
		
		// remove the listeners to prevent duplication problems
		el.off( 'click', edit );
		el.off( 'keypress', edit );
		
		// if autosaving save when the input/textbox is blurred
		if ( autosave ) {
			
			valueEl.on( 'blur', function( e ) {
				submitEditForm( id, form, form, targetPage);
			});
			
		// otherwise catch the form submission and overwrite the original value
		} else {
			
			form.on( 'submit', function( e ) {
				stopEvent( e );
				submitEditForm( id, form, valueEl, targetPage);
			});
			
		}
		
		valueEl.focus();
		//initElement( el );
    },
	
	submitEditForm = function( id, form, targetElement, targetPage ) {
		// get the params to send
		var params = $( form ).serialize();
		
		targetElement.addClass( 'performerloading' );
		
		$.ajax({ 
			method: 'post',
			url: targetPage,
			data: params
		})
		.done(function( response ) {
			if ( targetElement && targetElement.length ) {
				if ( targetElement.prop( 'tagName' ) === 'INPUT' ) {
					targetElement.val( response );
				} else {
					targetElement.html( response );
				}
			}
			hideEditForm( '#' + id, true );
		})
		.fail(function( jqXHR, textStatus ) {
			debugError( 'Submit edit form failed: ' + jqXHR.statusText );
		});
	},
	
    // build the element editing form
    buildEditForm = function( el, targetPage, inputType, autosave ) {
		if ( ! el.length || ! targetPage || ! targetPage.length || ! inputType || ! inputType.length ) {
			return;
		}
		
		var id = el.identify(),
			value = el.html(),
			editForm;
		
		editForm = '<form id="' + id + '-editor" class="performer-editor" action="' + targetPage + '" method="post">\n';
		
		if ( inputType == 'input' ) {
			editForm += '<input type="text" id="' + id + '-value" name="' + id + '" value="' + value + '" />\n';
		} else {
			editForm += '<textarea id="' + id + '-value" name="' + id + '" rows="6" cols="30">' + value + '</textarea>\n';
		}
		
		if ( ! autosave ) {
			editForm += '<input type="submit" id="' + id + '-save" name="' + id + '-save" value="Save" />\n'
			editForm += '<a href=\"#\" class="uneditor" data-targetEl="#' + id + '">Cancel</a>\n';
		}
		
		editForm += '</form>\n<span style="display:none" id="' + id + '-originaltext">' + value + '</span>';
		
		return editForm;
    },
	
    // hide an edit form and optionally set the text to the inputted value
    hideEditForm = function( idSelector, changeValue ) {
		var el = $( idSelector );
		if ( ! el.length ) {
			return;
		}
		
        if ( changeValue ) {
            el.html( $( idSelector + '-value' ).val() );
        } else {
            el.html( $( idSelector + '-originaltext' ).html() );
        }
		
		// fire the callback
		doCallback();
		
		// reattach the edit handlers
        el.on( 'click', edit );
        el.on( 'keypress', edit );
    },
	
    // cancel a Performer.Edit command and return the element to normal
    unEdit = function( e ) {
		var el = $( this );
		if ( !el.length ) {
			return true;
		}
		
		// only allow clicks and the enter key
		if ( ! isValidTrigger( e ) ) {
			return true;
		}
		
		var id = getTarget( el );
		
		hideEditForm( id, false );
		stopEvent( e );
    },
	
	// ========================================================================================
	// Visibility methods
		
	// shows one of a group of items; used by accordianer and tabber
	doShowOneOfGroup = function( initiator, itemSelector, groupId, itemId, showEffect ) {
		var el = getElement( initiator );
		
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
        
		doShowAndHide( el, targetItemEl, items, showEffect );
	},
	
	// shows and hides the given elements
	doShowAndHide = function( el, elsToShow, elsToHide, showEffect, hideeffect ) {
		// get the delay
		var delay = el.dataVar( 'delay', 0 ) * 1000;

        // toggle the tabs
        if ( delay === 0 ) {
			doHide( elsToHide, hideeffect );
            doShow( elsToShow, showEffect );
        } else {
            window.setTimeout( function() {
                doHide( elsToHide, hideeffect );
                doShow( elsToShow, showEffect );
            }, delay );
        }
	},
		
	// performs a toggle of the given element(s), returning true if the element has been shown and false if it has been hidden
	doToggle = function( el, showeffect, hideeffect ) {
		// hide the element(s)
		if ( el.is( ':visible' ) ){
			doHide( el, hideeffect );
			el.removeClass( defaults.togglerOpenClass );
			el.addClass( defaults.togglerClosedClass );
		
		// show the element(s)
		} else {
			
			// show the hidden parents of the element
			el.parents().show();
		
			// show the element itself
			doShow( el, showeffect );
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
		el.removeClass( defaults.hideClass );
		el.removeClass( defaults.hiderHidden );
		el.addClass( defaults.showClass );
		el.addClass( defaults.showerShown );
		return el;
	},
	
	// hides an element, using the optional given effect
	doHide = function( el, effect ) {
	
		// if the element is the one currently targeted with the hash then don't hide it
		if ( el.attr( 'id' ) !== undefined && el.attr( 'id' ) == hash ) {
			return;
		}
	
		// try to perform the effect
		if ( ! doEffect( el, effect ) ) {
			el.hide();
		}
		
		// toggle the classes
		el.removeClass( defaults.showClass );
		el.removeClass( defaults.showerShown );
		el.addClass( defaults.hideClass );
		el.addClass( defaults.hiderHidden );
		return el;
	},
	
	// gets the target from the given element(s) and hides it
	hideTargets = function( el ) {
		$.each( getTargets( el ), function( index, value ) {
			doHide( $( value ) );
		});
	},
	
	// ========================================================================================
	// Effect methods
	
	// triggers an effect on the given element
	doEffect = function( el, effect ) {
		if ( effect === undefined ) {
			return false;
		}
		var callback = Performer.callback;
		Performer.resetCallback();
		if ( effect == 'slideup' || effect == 'blindup' ) { 
			return el.slideUp( "normal", callback ); 
		}
		if ( effect == 'slidedown' || effect == 'blinddown' ) { 
			return el.slideDown( "normal", callback ); 
		}
		if ( effect == 'fadein' ) { 
			return el.fadeIn( "normal", callback ); 
		}
		if ( effect == 'fadeout' ) { 
			return el.fadeOut( "normal", callback ); 
		}
		return false;
	},
	
	// gets the show and hide effects from the given element
	getShowAndHideEffects = function( el, defaultShowEffect, defaultHideEffect ) {
		return {
			showEffect: el.dataVar( 'showeffect', defaultShowEffect ),
			hideEffect: el.dataVar( 'hideeffect', defaultHideEffect )
		};
	},
	
	// ========================================================================================
	// CSS class methods
	
	// gets the target from the given element(s) and removes the given class name from them
	removeClassFromTargets = function( el, className ) {
		var targets = getTargets( el );
		for ( var i = 0; i < targets.length; i++ ) {
			$( targets[i] ).removeClass( className );
		};
	},
	
	// ========================================================================================
	// Event methods
	
	// stops the default action of the given event
	stopEvent = function( e ) {
		e.preventDefault();
		return false;
	},
	
	// runs the callback function, if one is set
	doCallback = function() {
		if ( typeof Performer.callback == 'function' ) {
			Performer.callback();
		}
	},
	
	// resets the callback function
	resetCallback = function() {
		Performer.callback = function(){};
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
	
	// get the target element selector from the given elements data attribute or class parameter
	getTarget = function( el, compatibilityPrefix ) {
		if ( ! el.length ) {
			return false;
		}
		
		if ( compatibilityPrefix === undefined ) {
			compatibilityPrefix = '#';
		}
		
		return el.dataVar( [
			'target', // 2.0+ syntax, using data attributes
			'targetElement', // 2.0+ syntax, using data attributes
			['targetEl', compatibilityPrefix], // < v2.0 syntax, using class parameters
			['targetEement', compatibilityPrefix], // < v2.0 syntax, using class parameters
			['rel', compatibilityPrefix] // < v2.0 syntax, using the rel attribute
		], false );
	},
	
	// get the target element for the given element
	getTargetElement = function( el, compatibilityPrefix ) {
		var target = getTarget( el, compatibilityPrefix );
		if ( ! target ) {
			return $(undefined);
		}
		return $( target );
	},
		
	// gets the target selectors from the element(s) in the given collection
	getTargets = function( el, compatibilityPrefix ) {
		if ( ! el.length ) {
			return [];
		}
		// get the targets
		var targets = [];
		el.each( function( index ) {
			targets.push( getTarget( $( this ), compatibilityPrefix ) );
		});
		return $.unique( targets );
	},
	
	// get the targets element for the given elements
	getTargetElements = function( el, compatibilityPrefix ) {
		var targets = getTargets( el, compatibilityPrefix );
		if ( ! targets ) {
			return $(undefined);
		}
		return $( targets );
	},
	
	// ========================================================================================
	// Utility methods
	
	// increment the internal counter and return the number
	nextCounter = function() {
		Performer.counter = Performer.counter + 1;
		return Performer.counter;
	},
	
	// return the keycode for an event
    keyCode = function( e ) {
        if ( window.event ) {
            return window.event.keyCode;
        } else if ( e ) {
            return e.which;
        } else {
            return false;
        }
    },
	
	// returns a value indicating if the event was triggered by a click or valid triggering keypress
	isValidTrigger = function( e ) {
		// only allow clicks and the enter key
		if ( e.type != 'click' && keyCode( e ) != 13 ) {
			return false;
		}
		return true;
	};
	
	return {
		callback: callback,
		resetCallback: resetCallback,
		counter: counter,
		nextCounter: nextCounter,
		init: init,
		isInitialised: isInitialised,
		initialisationError: initialisationError,
		isDebugging: isDebugging,
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
            id = 'anonymous_element_' + Performer.nextCounter();
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
			val = this.getData( paramName );
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
			paramName = paramName.toLowerCase();
			return this.data( paramName );
		} else {
			var thisParamName = paramName[0].toLowerCase();
			return this.data( thisParamName );
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