/*
Performer JavaScript library (http://performerjs.org)
Created by Chris Taylor (http://www.stillbreathing.co.uk)
Additional work by kourge and Danny Linkov
Version 1.0.2

This work is released under any of the following licenses, please choose the one you wish to use:

- Creative Commons Attribution-ShareAlike 3.0 licence (http://creativecommons.org/licenses/by-sa/3.0/)
- Microsoft Public License (http://www.opensource.org/licenses/ms-pl.html)
- MIT License (http://www.opensource.org/licenses/mit-license.php)
- BSD License (http://www.opensource.org/licenses/bsd-license.php)
*/
var Performer =
{
    version: '1.0.2',
    Scriptaculous: false,
    Prototype: false,
    jQuery: false,
    MooTools: false,
    Counter: 0,
    Performer: function() {
        P.DetectLibrary();
        if (P.Scriptaculous || P.Prototype || P.jQuery || P.MooTools) { P.Start(); }
    },
    // detect the JavaScript Library in use
    DetectLibrary: function() {
        if (window.Scriptaculous && typeof window.Scriptaculous != 'undefined') {
            P.Scriptaculous = true;
        } else if (window.Prototype && typeof window.Prototype != 'undefined' && window.Prototype.Version) {
            P.Prototype = true;
        } else if (window.MooTools && typeof window.MooTools != 'undefined' && window.MooTools.version) {
            P.MooTools = true;
        } else if (window.jQuery && typeof window.jQuery != 'undefined') {
            P.jQuery = true;
        }
    },
    Start: function() {
        P.domLoaded(function() {
            // set debugging
            P.Debugging = false;
            P.Debug('Performer.Performer', 'function');
            // set up global variables
            P.Reloaders = [];
            P.Repeaters = [];
            P.Groups = null;
            P.Duplicators = [];
            P.TextValue = [];
            P.NewTextValue = [];
            P.Hash = parent.location.hash.replace(new RegExp('^[#]+', 'g'), '');
            P.Effects = ['slideup', 'slidedown', 'blinddown', 'blindup', 'fadein', 'fadeout'];
            // initialise the app
            P.Init();
        });
    },
    Init: function() {
        P.CheckDebug();
        P.Debug('Performer.Init', 'function');
        // do the transformations
        P.DoTransformers();
        // set up listeners
        P.DoListeners();
        // set the body class
        P.addClassName(P.$$('body')[0], 'performer-enabled');
    },
    ReInit: function(el) {
        P.Debug('Performer.ReInit', 'function');
        // do the transformations
        P.DoTransformers(el, true);
        // set up listeners
        P.DoListeners(el, true);
    },
    DoListeners: function(el, reinit) {
        if (reinit === undefined) { reinit = false; }
        if (el === undefined) { el = ''; }
        P.Listeners(el, 'form.formchecker', 'CheckForm', 'submit', reinit);
        P.Listeners(el, '.toggler', 'Toggle', 'click,keypress', reinit);
        P.Listeners(el, '.switcher', 'Switch', 'click,keypress', reinit);
        P.Listeners(el, '.loader', 'Load', 'click,keypress', reinit);
        P.Listeners(el, '.deleter', 'Delete', 'click,keypress', reinit);
        P.Listeners(el, '.toggleloader', 'ToggleLoad', 'click,keypress', reinit);
        P.Listeners(el, '.sizer', 'Size', 'click,keypress', reinit);
        P.Listeners(el, '.resizer', 'Resize', 'keypress', reinit);
        P.Listeners(el, '.tabber', 'Tab', 'click,keypress', reinit);
        P.Listeners(el, '.accordianer', 'Accordian', 'click,keypress', reinit);
        P.Listeners(el, '.selector', 'Select', 'change,keypress', reinit);
        P.Listeners(el, '.limiter', 'Limit', 'keyup,keydown', reinit);
        P.Listeners(el, '.editor', 'Edit', 'click,keypress', reinit);
        P.Listeners(el, '.uneditor', 'UnEdit', 'click,keypress', reinit);
        P.Listeners(el, '.setter', 'Set', 'click,keypress', reinit);
        P.Listeners(el, '.prompter', 'RemovePrompt', 'focus', reinit);
        P.Listeners(el, '.prompter', 'CheckPrompt', 'blur', reinit);
        P.Listeners(el, '.popper', 'Pop', 'click,keypress', reinit);
        P.Listeners(el, '.passwordchecker', 'CheckPassword', 'keyup', reinit);
        P.Listeners(el, '.matcher', 'Match', 'keyup', reinit);
        P.Listeners(el, '.grouptoggler', 'GroupToggle', 'click,keypress', reinit);
        P.Listeners(el, '.submitter', 'Submit', 'submit', reinit);
        P.Listeners(el, '.looperforward', 'Loop', 'click,keypress', reinit);
        P.Listeners(el, '.looperback', 'Loop', 'click,keypress', reinit);
        P.Listeners(el, '.looperfirst', 'Loop', 'click,keypress', reinit);
        P.Listeners(el, '.looperlast', 'Loop', 'click,keypress', reinit);
        P.Listeners(el, '.tooltipper', 'Tooltip', 'mouseover,focus', reinit);
        P.Listeners(el, '.popup', 'Tooltip', 'mouseover,focus', reinit);
        P.Listeners(el, '.modalwindower', 'ModalWindow', 'click,keypress', reinit);
        P.Listeners(el, '.modalwindowcloser', 'CloseModal', 'click,keypress', reinit);
        P.Listeners(el, '.contextmenuer', 'ContextMenu', 'contextMenu', reinit);
        P.Listeners(el, '.styler', 'Style', 'click,keypress', reinit);
        P.Listeners(el, '.duplicator', 'Duplicate', 'click,keypress', reinit);
		P.Listeners(el, '.morpher', 'Morph', 'click,keypress', reinit);
        P.Listeners(el, 'form.submitlocker', 'SubmitLock', 'submit', reinit);
        P.Listeners(el, 'a.toggle-performer-debug', 'ToggleDebug', 'click,keypress', reinit);
        // hooker listeners
        P.Listeners(el, '.hooker-click', 'Hooker', 'click,keypress', reinit);
        P.Listeners(el, '.hooker-keypress', 'Hooker', 'keypress', reinit);
        P.Listeners(el, '.hooker-change', 'Hooker', 'change', reinit);
        P.Listeners(el, '.hooker-mouseover', 'Hooker', 'mouseover', reinit);
        P.Listeners(el, '.hooker-mouseout', 'Hooker', 'mouseout', reinit);
        P.Listeners(el, '.hooker-submit', 'Hooker', 'submit', reinit);
        P.Listeners(el, '.hooker-focus', 'Hooker', 'focus', reinit);
        P.Listeners(el, '.hooker-blur', 'Hooker', 'blur', reinit);
    },
    DoTransformers: function(el, reinit) {
        if (reinit === undefined) { reinit = false; }
        if (el === undefined || el === 'performerjsdebugwrapper') { el = ''; }
        P.Transformers(el, '.hider', 'Hide', reinit);
        P.Transformers(el, '.shower', 'Show', reinit);
        P.Transformers(el, '.focusser', 'Focus', reinit);
        P.Transformers(el, '.limiter', 'LimitNotifier', reinit);
        P.Transformers(el, '.reloader', 'Reload', reinit);
        P.Transformers(el, '.preloader', 'Preload', reinit);
        P.Transformers(el, '.prompter', 'SetPrompt', reinit);
        P.Transformers(el, '.truncator', 'Truncate', reinit);
        P.Transformers(el, 'ul.looper,ol.looper', 'InitLoop', reinit);
        P.Transformers(el, '.tab', 'InitTabs', reinit);
        P.Transformers(el, '.contextmenuer', 'DisableContextMenu', reinit);
        P.Transformers(el, '.pager', 'Page', reinit);
        P.Transformers(el, '.loadmorpher', 'Morph', reinit);
		P.Transformers(el, '.loadtoggler', 'Toggle', reinit);
		P.Transformers(el, '.loadgrouptoggler', 'GroupToggle', reinit);
		P.Transformers(el, '.loadstyler', 'Style', reinit);
		P.Transformers(el, '.loadmodalwindower', 'ModalWindow', reinit);
    },
    // listen for the required classnames
    Listeners: function(el, classNames, f, event, reinit) {
		var b = P.bind;
		var n = P.nodeName;
		var fe = P.forEach;
		var d = P.$$;
		var dbg = P.Debug;
		var cls = classNames.split(',');
        fe(cls, function(className) {
            if (el !== undefined) { el = el + ' '; }
            var els = d('body ' + el + className);
            if (els) {
                dbg('Performer.Listeners(' + el + className + ') - ' + els.length + ' elements found', 'function');
                fe(els, function(element) {
                    if (n(element)) {
                        fe(event.split(','), function(event) {
                            b(element, event, P[f]);
                        });
                    }
                });
            }
        });
    },
    // transform the required classnames
    Transformers: function(el, classNames, f, reinit) {
		var n = P.nodeName;
		var fe = P.forEach;
		var d = P.$$;
		var dbg = P.Debug;
		var cls = classNames.split(',');
        fe(cls, function(className) {
            if (el !== undefined) { el = el + ' '; }
            var els = d('body ' + el + className);
            if (els) {
                dbg('Performer.Transformers(' + el + className + ') - ' + els.length + ' elements found', 'function');
                fe(els, function(element) {
                    if (n(element)) {
                        P[f](element);
                    }
                });
            }
        });
    },
    // check if the debug class is set
    CheckDebug: function() {
        P.Debug('Performer.CheckDebug', 'function');
        var d = P.$$('.performer-debug');
        if (d) {
            P.Debugging = true;
            P.PrepareDebug();
        }
    },
    // get a parameter from an array of class names
    classParam: function(classNames, paramName, defaultValue) {
        var cls = null;
        var val = defaultValue;
		var i = classNames.length;
        while(i--) {
            cls = classNames[i];
            if (cls && cls.substring(0, paramName.length + 1) == paramName + '-') { val = cls.replace(paramName + '-', ''); }
        }
        return val;
    },
    // runs a custom function on an event
    Hooker: function(e) {
        // get the event element
        var el = P.eventElement(e);
        // check the element has the required attributes
        if (el && P.getAttribute(el, 'id') && P.getAttribute(el, 'class')) {
            // get the event type
            var t = e.type;
            // get the classes
            var func = P.classParam(P.classNames(el), "func", null);
            // check the function exists
            if (eval('typeof(' + func + ')') == 'function') {
                // execute the function, passing the element and event
                eval(func + '(el,e)');
            }
        }
    },
    // paginate children of an element
    Page: function(el) {
        var elid = P.identify(el);
        el = P.$(elid);
        var cls = P.classNames(el);
        var selector = P.classParam(cls, "selector", "");
        var children;
        if (selector.length > 0) {
            children = P.children(el, "#" + elid + "-" + selector);
        } else {
            children = P.children(el);
        }
        var pagesize = P.classParam(cls, "pagesize", 10);
        var startpage = P.classParam(cls, "startpage", 1);
        if (children.length > pagesize) {
            var page = 1;
            var i = 0;
			var acn = P.addClassName;
			var h = P.Hide;
            P.forEach(children, function(el) {
                if (i < page * pagesize && i >= (page - 1) * pagesize) {
                    // do nothing
                } else {
                    page++;
                }
                acn(el, 'pageelement');
                acn(el, 'page' + page);
                h(el);
                i++;
            });
			var s = P.Show;
            P.forEach(P.$$("#" + elid + " .page" + startpage), function(el) {
                s(el);
            });
            var menu = P.BuildPageMenu(elid, page, startpage);
            P.insertAfter(el, menu);
            var links = P.$$("." + elid + "pagerlink");
			var b = P.bind;
            P.forEach(links, function(el) {
                b(el, "click", P.ShowPage);
                b(el, "keypress", P.ShowPage);
            });
        }
    },
    // build pagination menu
    BuildPageMenu: function(elid, page, startpage) {
        var menu = '<ul class="performer-pagination">';
        var currentpage = "";
        for (var x = 1; x <= page; x++) {
            if (x == startpage) { currentpage = " currentpage"; }
            menu += '<li><a href="#' + elid + '-page' + x + '" class="' + elid + 'pagerlink' + currentpage + '" id="' + elid + '-page' + x + '">' + x + '</a></li>';
            currentpage = "";
        }
        menu += '</ul>';
        return menu;
    },
    // show a pager page
    ShowPage: function(e) {
		var el = P.eventElement(e);
        var elid = P.identify(el);
        var parts = elid.split("-page");
		var fe = P.forEach;
        // hide all page elements
		var h = P.Hide;
        fe(P.$$("#" + parts[0] + " .pageelement"), function(el) {
            h(el);
        });
        // show this page
		var s = P.Show;
        fe(P.$$("#" + parts[0] + " .page" + parts[1]), function(el) {
            s(el);
        });
        // take off current page class
		var rcn = P.removeClassName;
        fe(P.$$("." + parts[0] + "pagerlink"), function(el) {
            rcn(el, "currentpage");
        });
        // add current page class
        P.addClassName(P.$(elid), "currentpage");
        P.stopEvent(e);
    },
    // shows a context menu when the mouse is right-clicked
    ContextMenu: function(e) {
        var el = P.eventElement(e);
        // hide any other context menus
		var h = P.Hide;
		var b = P.bind;
        P.forEach(P.$$(".performercontextmenu"), function(el) { h(el); });
        // check this is a right click
        if (el && ((e.which && e.which == 3) || (e.button && e.button == 3) || (e.rightClick))) {
            var targetEl = P.classParam(P.classNames(el), "targetEl", false);
            var position = P.cursorPosition(e);
            if (position && targetEl && P.$(targetEl)) {
                var id = P.identify(el);
                targetEl = P.$(targetEl);
                P.addClassName(targetEl, 'performercontextmenu');
                targetEl.style.position = 'absolute';
                targetEl.style.zIndex = '10000';
                targetEl.style.top = position[1] + 'px';
                targetEl.style.left = position[0] + 'px';
                P.Show(targetEl);
                e.preventDefault();
                // add the listener to remove the context menu
                b(P.$$('body')[0], 'click', P.HideContextMenu);
                b(P.$$('body')[0], 'keypress', P.HideContextMenu);
                P.stopEvent(e);
                return false;
            }
        }
		return false;
    },
    // disables context menu on an element
    DisableContextMenu: function(el) {
        // disable the default context menu
        P.disableContext(el);
    },
    // hides a context menu
    HideContextMenu: function(e) {
        var els = P.$$('.performercontextmenu');
		var rcn = P.removeClassName;
		var h = P.Hide;
        P.forEach(els, function(el) {
            rcn(el, 'performercontextmenu');
            h(el);
        });
    },
    // sets the value of a form field
    Set: function(e) {
        var el = P.eventElement(e);
        if (el && P.nodeName(el)) {
            var cls = P.classNames(el);
            var value = unescape(P.classParam(cls, "value", ""));
            var targetEl = P.classParam(cls, "targetEl", P.getAttribute(el, "rel"));
            P.setValue(P.$(targetEl), value);
            P.stopEvent(e);
        }
    },
    // initialises a loop by hiding all elements in a UL, OL or DL list except the first one or the first one with class 'looperdefault'
    InitLoop: function(elid) {
        P.Debug('Performer.InitLoop', 'function');
        var el = P.$(elid);
        var shown = 0;
        var i = 0;
		var n = P.nodeName;
		var h = P.Hide;
		var hcn = P.hasClassName;
		var id = P.identify;
		var hsh = P.Hash;
        P.forEach(P.children(el), function(child) {
            if (n(child)) {
                h(child);
                if (hcn(child, 'looperdefault') || hsh == id(child)) { shown = i; }
                i++;
            }
        });
        P.Show(P.children(el)[shown]);
    },
    // moves a looper element
    Loop: function(e) {
        r = false;
        var el = P.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigge;
        if (e.type == 'click' || P.keyCode(e) == 13) {
            var cls = P.classNames(el);
            var loop = P.classParam(cls, "targetEl", P.getAttribute(el, 'rel'));
            // check the loop can be found
            if (P.$(loop)) {
                var i = 0;
                var toshow = 0;
                var nowshowing = 0;
				var n = P.nodeName;
				var v = P.visible;
				var dbg = P.Debug;
				var h = P.Hide;
                P.forEach(P.children(P.$(loop)), function(child) {
                    if (n(child) && v(child)) {
                        dbg('- Currently showing item ' + i, 'subfunction');
                        nowshowing = i;
                    }
                    h(child);
                    i++;
                });
                if (P.hasClassName(el, 'looperback')) {
                    P.Debug('Performer.Loop (back)', 'function');
                    toshow = nowshowing - 1;
                    if (toshow < 0) { toshow = (P.children(P.$(loop)).length - 1); }
                } else if (P.hasClassName(el, 'looperforward')) {
                    P.Debug('Performer.Loop (forward)', 'function');
                    toshow = nowshowing + 1;
                    if (toshow >= P.children(P.$(loop)).length) { toshow = 0; }
                } else if (P.hasClassName(el, 'looperfirst')) {
                    P.Debug('Performer.Loop (first)', 'function');
                    toshow = 0;
                } else if (P.hasClassName(el, 'looperlast')) {
                    P.Debug('Performer.Loop (last)', 'function');
                    toshow = P.children(P.$(loop)).length - 1;
                }
                P.Debug('- Showing item ' + toshow, 'subfunction');
                P.Show(P.children(P.$(loop))[toshow], "fadein");
                P.stopEvent(e);
            }
        }
    },
    // show a tooltip when an element has mouseover or focus
    Tooltip: function(e, cssClass) {
        var el = P.eventElement(e);
        if (!cssClass) { cssClass = "performertooltip"; }
        var id = P.identify(el);
        if (el && P.nodeName(el) && !P.$(id + '_performertooltip')) {
            var cls = P.classNames(el);
            var text = false;
            var originaltext = "";
            if (P.getAttribute(el, "title") && P.getAttribute(el, "title") != "") {
                originaltext = P.getAttribute(el, "title");
                text = '<p>' + originaltext.replace(/\r/g, "<br />\n") + '</p>';
            } else {
                var targetEl = P.$(P.classParam(cls, "targetEl", false));
                if (targetEl) { text = targetEl.innerHTML; }
            }
            var position = false;
            // if this is a mouseover event, get the mouse position
            if (e.type == 'mouseover') {
                position = P.cursorPosition(e);
            } else {
                position = P.elementPosition(el);
                position[1] = position[1] + el.offsetHeight;
            }
            if (position && text) {
                var className = P.classParam(cls, "className", cssClass);
                var width = P.classParam(cls, "width", 300);
                var leftoffset = position[0] - (width / 2);
                var topoffset = position[1] + 16;
                if (leftoffset < 0) {
                    leftoffset = 25;
                }
                if (document.body.scrollWidth && ((leftoffset + width) > document.body.scrollWidth)) {
                    leftoffset = (document.body.scrollWidth - width - 25);
                }
                P.setAttribute(el, "title", "");
                P.setAttribute(el, "temptitle", originaltext);
                if (P.getAttribute(el, "alt")) {
                    P.setAttribute(el, "tempalt", originaltext);
                    P.setAttribute(el, "alt", "");
                }
                var parent = P.up(el, "");
                if (parent.getAttribute("title")) {
                    P.setAttribute(parent, "temptitle", originaltext);
                    P.setAttribute(parent, "title", "");
                }
                var tooltip = document.createElement('div');
                var tooltipinner = document.createElement('div');
                tooltipinner.className = cssClass + 'inner';
                tooltipinner.innerHTML = text;
                tooltip.id = id + '_performertooltip';
                tooltip.className = className;
                tooltip.style.position = 'absolute';
                tooltip.style.zIndex = '10000';
                tooltip.style.width = width + 'px';
                tooltip.style.top = topoffset + 'px';
                tooltip.style.left = leftoffset + 'px';
                tooltip.appendChild(tooltipinner);
                P.bind(el, 'mouseout', P.HideTooltip);
                P.bind(el, 'blur', P.HideTooltip);
                document.getElementsByTagName('body')[0].appendChild(tooltip);
            }
        }
    },
    // hide a tooltip
    HideTooltip: function(e) {
        var el = P.eventElement(e);
        var id = P.identify(el);
        if (el && P.$(id + '_performertooltip')) {
            P.remove(P.$(id + '_performertooltip'));
            var originaltext = P.getAttribute(el, "temptitle");
            P.setAttribute(el, "title", originaltext);
            P.removeAttribute(el, "temptitle");
            if (P.getAttribute(el, "tempalt")) {
                P.setAttribute(el, "alt", originaltext);
                P.removeAttribute(el, "tempalt");
            }
            var parent = P.up(el, "");
            if (parent.getAttribute("temptitle")) {
                P.setAttribute(parent, "title", originaltext);
                P.removeAttribute(parent, "temptitle");
            }
        }
    },
    // show a modal window
    ModalWindow: function(e) {
        var eve = P.eventOrElement(e);
		var el = eve.el;
        if (el) {
            var id = P.identify(el);
            var cls = P.classNames(el);
			var delay = P.classParam(cls, 'delay', 0)*1000;
            var outerClassName = P.classParam(cls, 'outerClassName', 'performermodalouter');
            var innerClassName = P.classParam(cls, 'innerClassName', 'performermodalinner');
            var lightBox = P.classParam(cls, 'lightBox', true);
            var closer = P.classParam(cls, 'closer', true);
            var targetPage = P.classParam(cls, 'targetPage', false);
            var horizontalPadding = P.classParam(cls, 'horizontalPadding', 100);
            var verticalPadding = P.classParam(cls, 'verticalPadding', 100);
            var screenDim = P.classParam(cls, 'screenDim', 6);
			if (delay === 0) {
				P.DoModalWindow(targetPage, lightBox, screenDim, outerClassName, innerClassName, horizontalPadding, verticalPadding, closer);
			} else {
				setTimeout(function(){
					P.DoModalWindow(targetPage, lightBox, screenDim, outerClassName, innerClassName, horizontalPadding, verticalPadding, closer);
				}, delay);
			}
			if(eve.stop) { P.stopEvent(e); }
        }
    },	
	DoModalWindow: function(targetPage, lightBox, screenDim, outerClassName, innerClassName, horizontalPadding, verticalPadding, closer) {
		if (P.createModal(targetPage, lightBox, screenDim, outerClassName, innerClassName, horizontalPadding, verticalPadding, closer)) {
			P.addClassName(P.$('performer_modal'), 'performerloading');
			P.DoLoad(targetPage, 'performer_modal', 'get', 'fillandinit');
		}
	},
    // create a modal window
    createModal: function(targetPage, lightBox, screenDim, outerClassName, innerClassName, horizontalPadding, verticalPadding, closer) {
        if (targetPage && !P.$('performer_modal')) {
            // if showing a lightbox, dim the page
			var lb = false;
            if (lightBox) {
                lb = document.createElement('div');
                lb.className = outerClassName;
                lb.style.zIndex = 100000;
                lb.style.position = 'fixed';
                lb.style.left = '0px';
                lb.style.right = '0px';
                lb.style.bottom = '0px';
                lb.style.top = '0px';
                lb.style.opacity = '0.' + screenDim;
                lb.style.filter = 'alpha(opacity=' + screenDim + '0)';
                lb.id = 'performer_modal_outer';
            }
            var inner = document.createElement('div');
            inner.className = innerClassName;
            inner.id = 'performer_modal';
            inner.style.overflow = 'auto';
            inner.style.zIndex = 100001;
            inner.style.position = 'fixed';
            inner.style.left = horizontalPadding + 'px';
            inner.style.right = horizontalPadding + 'px';
            inner.style.bottom = verticalPadding + 'px';
            inner.style.top = verticalPadding + 'px';
            // if showing a lightbox, append the inner to the lightbox
            if (lightBox) {
                document.getElementsByTagName('body')[0].appendChild(lb);
            }
            document.getElementsByTagName('body')[0].appendChild(inner);
            // create the closer
            if (closer) {
                var closelink = document.createElement('div');
                closelink.id = 'performer_modal_closer';
                closelink.style.zIndex = 100001;
                closelink.style.position = 'fixed';
                closelink.style.right = horizontalPadding + 'px';
                closelink.style.top = (verticalPadding - 20) + 'px';
                closelink.innerHTML = '<a href="#" class="modalwindowcloser">Close</a>';
                document.getElementsByTagName('body')[0].appendChild(closelink);
                P.bind(P.$$('a.modalwindowcloser')[0], 'keypress', P.CloseModal);
                P.bind(P.$$('a.modalwindowcloser')[0], 'click', P.CloseModal);
            }
            // add the listener for the escape key to close the modal window
            P.bind(document, 'keyup', P.CloseModal);
        }
        return true;
    },
    // close a modal window
    CloseModal: function(e) {
        var el = P.eventElement(e);
        if ((e.type == 'keyup' && P.keyCode(e) == 27) || (el && P.hasClassName(el, 'modalwindowcloser'))) {
            if (P.$('performer_modal_outer')) { document.getElementsByTagName('body')[0].removeChild(P.$('performer_modal_outer')); }
            if (P.$('performer_modal_closer')) { document.getElementsByTagName('body')[0].removeChild(P.$('performer_modal_closer')); }
            if (P.$('performer_modal')) { document.getElementsByTagName('body')[0].removeChild(P.$('performer_modal')); }
            P.stopEvent(e);
        }
    },
    // hide the remainder of an element contents after a certain number of characters
    // inspired by http://www.reindel.com/truncate/
    Truncate: function(el) {
        // get the class parameters
        var cls = P.classNames(el);
        var limit = P.classParam(cls, 'limit', 50);
        var openText = P.classParam(cls, 'openText', '...more');
        var closeText = P.classParam(cls, 'closeText', '...less');
        if (el && limit) {
            var c = el.innerHTML;
            var l = c.length;
            if (limit < l) {
                var id = P.identify(el);
                el.innerHTML = '<span id="' + id + '_truncated">' + c.substring(0, limit) + ' <a href="#" class="switcher targetEl1-' + id + '_truncated targetEl2-' + id + '_full">' + openText + '</a></span><span class="hider" id="' + id + '_full">' + c + ' <a href="#" class="switcher targetEl1-' + id + '_truncated targetEl2-' + id + '_full">' + closeText + '</a></span>';
                P.ReInit(id);
            }
        }
    },
    // duplicates an element
    Duplicate: function(e) {
        var el = P.eventElement(e);
        // get the class parameters
        var cls = P.classNames(el);
        var sourceEl = P.classParam(cls, "sourceElement", false);
        var sourceElement = P.$(sourceEl);
        var targetEl = P.classParam(cls, "targetElement", false);
        var targetElement = P.$(targetEl);
		var start = (parseInt(Performer.classParam(cls, "start", 1))) - 1;
        // if the parameters are set
        if (el && P.nodeName(el) && sourceElement && P.nodeName(sourceElement) && targetElement && P.nodeName(targetElement)) {
            var newel = targetElement.appendChild(sourceElement.cloneNode(true));
            if (typeof (P.Duplicators[targetEl]) === 'undefined') {
                P.Duplicators[targetEl] = (start + 1);
            }
            var items = P.Duplicators[targetEl] + 1;
            P.Duplicators[targetEl] = items;
            newel.innerHTML = newel.innerHTML.replace(/_1/g, '_' + items);
            newel.innerHTML = newel.innerHTML.replace(/[1]/g, items);
            newel.id = newel.id.replace(/_1/g, '_' + items);
            if (P.getAttribute(newel, 'class') != '') {
                P.setAttribute(newel, 'class', P.getAttribute(newel, 'class').replace(/_1/g, '_' + items));
            }
            var countEl = P.classParam(cls, "countElement", false);
            var countElement = P.$(countEl);
            if (countElement) { P.setValue(countElement, items); }
            P.stopEvent(e);
        }
    },
    // disables all submit buttons when a form is submitted
    SubmitLock: function(e) {
        var el = P.findEventElement(e, 'FORM');
        if (el) {
            // get unique fields in the form
            var fields = P.$F(el);
			var acn = P.addClassName;
            P.forEach(fields, function(input) {
                var field = P.$(P.identify(input));
                if (field.type.toLowerCase() == 'submit') {
                    field.disabled = true;
                    acn(field, 'performer-disabled');
                }
            });
        }
    },
    // submits a form to a page and fills an element with the results
    Submit: function(e) {
        var el = P.findEventElement(e, 'FORM');
        // get the class parameters
        var cls = P.classNames(el);
        var targetPage = P.classParam(cls, "targetPage", false);
        var targetEl = P.classParam(cls, "targetEl", P.classParam(cls, "targetElement", false));
        var targetElement = P.$(targetEl);
        // if the parameters are set
        if (targetPage && el && P.nodeName(el) && targetElement && P.nodeName(targetElement)) {
            var params = P.serialize(el);
            P.addClassName(targetElement, 'performerloading');
            P.Request(targetPage, 'POST', params, function(request) {
                var text = P.getRequestText(request);
                P.update(targetElement, text);
                P.removeClassName(targetElement, 'performerloading');
                P.Debug('-> Filled \'#' + targetEl + '\'', 'success');
            });
            P.stopEvent(e);
        }
    },
    // checks the values of fields in a form
    CheckForm: function(e) {
        P.Debug('Performer.CheckForm', 'function');
        var el = P.findEventElement(e, 'FORM');
        var fail = false;
        var radiogroups = [];
        // get unique fields in the form
        var fields = P.$F(el);
		var id = P.identify;
		var d = P.$;
		var hcn = P.hasClassName;
		var fn = P.FieldNotify;
		var fnr = P.FieldNotifyRemove;
		var gv = P.getValue;
        P.forEach(fields, function(input) {
            var identity = id(input);
            var field = d(identity);
			var val = gv(field);
            // field is required
            if (hcn(field, 'field-required')) {
                if (field.type != 'radio' &&
				((field.type == 'checkbox' && field.checked === false) || field.value == "")) {
                    fn(identity, 'error', 'This field is required');
                    fail = true;
                } else { fnr(identity); }
                // radio buttons
                if (field.type == 'radio' && radiogroups.PerformerIndexOf(field.name) == -1) {
                    radiogroups[radiogroups.length] = field.name;
                    var radiofail = true;
                    // get radio buttons for this field
                    var radiobuttons = el[field.name];
                    for (var i = 0; i < radiobuttons.length; i++) {
                        if (radiobuttons[i].checked) {
                            radiofail = false;
                            break;
                        }
                    }
                    var lastbutton = radiobuttons[radiobuttons.length - 1];
                    if (radiofail) {
                        fn(lastbutton, 'error', 'This field is required');
                        fail = true;
                    } else { fnr(lastbutton); }
                }
            }
            // field must be an email address
            if (hcn(field, 'field-required-email') || hcn(field, 'field-optional-email')) {
                var validemail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if ((hcn(field, 'field-required-email') && val == "") || (val != "" && !validemail.test(val))) {
                    fn(identity, 'error', 'This field must be a valid email address');
                    fail = true;
                } else { fnr(identity); }
            }
            // field must be a number
            if (hcn(field, 'field-required-number') || hcn(field, 'field-optional-number')) {
                var num = val.replace(",", "").replace("&pound;", "").replace("�", "");
                if ((hcn(field, 'field-required-number') && num == "") || (num != "" && isNaN(parseFloat(num)))) {
                    fn(identity, 'error', 'This field must be a number');
                    fail = true;
                } else {
                    // set the correct number value
                    if (num != "") { field.value = parseFloat(num); }
                    fnr(identity);
                }
            }
            // field must be a date (dd/mm/yyyy)
            if (hcn(field, 'field-required-date') || hcn(field, 'field-optional-date')) {
                var validdate = /^([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4})$/;
                if ((hcn(field, 'field-required-date') && val == "") || (val != "" && !validdate.test(val))) {
                    fn(identity, 'error', 'This field must be a date (dd/mm/yyyy)');
                    fail = true;
                } else { fnr(identity); }
            }
            P.Debug('-> Field ' + input.name, 'subfunction');
        });
        if (fail) {
            fn(P.identify(el), 'error', 'There are errors with some fields. Please check the form and try again.');
            P.stopEvent(e);
        }
    },
    // adds a notification to a field
    FieldNotify: function(field, messageclass, message) {
        if (!P.$(field + '-notification')) {
            P.insertAfter(P.$(field), '<span id="' + field + '-notification" class="performer-' + messageclass + '">' + message + '</span>');
        } else {
            P.$(field + '-notification').innerHTML = message;
            P.$(field + '-notification').className = 'performer-' + messageclass;
        }
    },
    // remove a field notification
    FieldNotifyRemove: function(field) {
        if (P.$(field + '-notification')) {
            P.$(field + '-notification').innerHTML = "";
            P.$(field + '-notification').className = "";
        }
    },
    // send a list selection to a remote page
    Select: function(e) {
        P.Debug('Performer.Select', 'function');
        var el = P.eventElement(e);
        // check the element has the required attributes
        if (el && P.nodeName(el) && P.getAttribute(el, 'id') && P.getAttribute(el, 'name') && P.getAttribute(el, 'class')) {
            // get the class parameters
            var cls = P.classNames(el);
            var targetPage = P.classParam(cls, "targetPage", false);
            var targetEl = P.classParam(cls, "targetEl", false);
            var targetValue = P.classParam(cls, "targetValue", false);
            // check we have a targetPage and targetEl and the target element can be found
            if (targetPage && P.$(targetEl)) {
                if (targetValue == 'true') {
                    P.DoLoad(targetPage + '?selection=' + P.getValue(el), targetEl, 'post', 'setvalueandinit');
                } else {
                    P.DoLoad(targetPage + '?selection=' + P.getValue(el), targetEl, 'post', 'fillandinit');
                }
            }
        }
    },
    // check the strength of a password
    CheckPassword: function(e) {
        P.Debug('Performer.CheckPassword', 'function');
        var el = P.eventElement(e);
        // check the element has the required attributes
        if (el && P.nodeName(el) && P.getAttribute(el, 'id') && P.getAttribute(el, 'name') && P.getAttribute(el, 'class')) {
            // get the class parameters
            var cls = P.classNames(el);
            var notifyEl = P.$(P.classParam(cls, "notifyEl", false));
            // check we have a notification element
            if (notifyEl) {
                P.Show(notifyEl);
                var val = el.value;
                // if the password is shorter than 6 characters
                if (val.length < 6) {
                    P.update(notifyEl, 'Your password must be at least 6 characters long');
                    P.className(notifyEl, 'password-weak');
                    // if the password has only letters
                } else {
                    P.update(notifyEl, '');
                    // if the password is just letters or just numbers less than 10 characters
                    if (val.match(/^([a-zA-Z]{6,10})$/) || val.match(/^([0-9]{6,10})$/)) {
                        P.update(notifyEl, 'Weak password');
                        P.className(notifyEl, 'password-weak');
                        // if the password is just letters or just numbers more than 10 characters
                    } else if (val.match(/^([a-zA-Z]{10,})$/) || val.match(/^([0-9]{10,})$/)) {
                        P.update(notifyEl, 'Acceptable password');
                        P.className(notifyEl, 'password-ok');
                        // if the password contains letters, numbers and characters it is strong
                    } else if (val.match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[^0-9a-zA-Z]).*$/)) {
                        P.update(notifyEl, 'Strong password');
                        P.className(notifyEl, 'password-strong');
                        // if the password has just letters and numbers, or just letters and characters, or just numbers and characters
                    } else if (val.match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/) || val.match(/^.*(?=.{6,})(?=.*[^0-9a-zA-Z])(?=.*[a-z]).*$/) || val.match(/^.*(?=.{6,})(?=.*[^0-9a-zA-Z])(?=.*\d).*$/)) {
                        P.update(notifyEl, 'Acceptable password');
                        P.className(notifyEl, 'password-ok');
                    }
                }
            }
        }
    },
    // match the values of two input boxes
    Match: function(e) {
        P.Debug('Performer.Match', 'function');
        var el = P.eventElement(e);
        // check the element has the required attributes
        if (el && P.nodeName(el) && P.getAttribute(el, 'id') && P.getAttribute(el, 'name') && P.getAttribute(el, 'class')) {
            // get the class parameters
            var cls = P.classNames(el);
            var notifyEl = P.$(P.classParam(cls, "notifyEl", false));
            var matchEl = P.$(P.classParam(cls, "matchEl", false));
            // check we have a match element and a notification element
            if (notifyEl && matchEl) {
                // show the notifyEl
                P.Show(notifyEl);
                // get the value
                var val1 = el.value;
                // get the value to be matched
                var val2 = matchEl.value;
                // if the values match
                if (val1 == val2) {
                    // hide the notifyEl
                    P.Hide(notifyEl);
                }
            }
        }
    },
    // toggle element
    Toggle: function(e, c) {
        var r = false;
        var eve = P.eventOrElement(e);
		var el = eve.el;
        if (!el) { el = P.findEventElement(e, 'A'); }
        // check the element has the required attribute and is a valid event trigger
        if (el && P.nodeName(el) && ((e.type == 'click' || P.keyCode(e) == 13 || P.keyCode(e) == 32) || !eve.stop)) {
            var cls = P.classNames(el);
            var showeffect = P.classParam(cls, 'showeffect', 'slidedown');
            var hideeffect = P.classParam(cls, 'hideeffect', 'slideup');
            var toggleid = P.classParam(cls, 'targetEl', P.getAttribute(el, 'rel'));
			if (!toggleid){ toggleid = P.identify(el); }
            var move = P.classParam(cls, 'move', false);
			var delay = P.classParam(cls, 'delay', 0)*1000;
            var targetEl = P.$(toggleid);
            // check the target element can be found
            if (targetEl && P.nodeName(targetEl)) {
				if (delay === 0) {
					r = P.DoToggle(toggleid, targetEl, el, showeffect, hideeffect);
				} else {
					setTimeout(function() {
		                r = P.DoToggle(toggleid, targetEl, el, showeffect, hideeffect);
					}, delay);
				}
				if (!move || !r) {
					if (P.nodeName(el).toLowerCase() == 'a' && eve.stop) { P.stopEvent(e); }
				} else {
					window.location.hash = P(el, "href").replace(new RegExp('^[#]+', 'g'), '');
				}
				return r;
            }
        }
    },
	DoToggle: function(toggleid, targetEl, el, showeffect, hideeffect) {
		// toggle the visibility
		if (!P.visible(targetEl)) {
			if (toggleid != 'performerjsdebugbox') { P.Debug('Performer.Toggle -> Show \'#' + toggleid + '\'', 'subfunction'); }
			P.addClassName(el, 'toggleropen');
			var n = P.nodeName;
			var s = P.Show;
			var v = P.visible;
			s(targetEl, showeffect);
			P.forEach(P.ancestors(P.$(targetEl)), function(ancestor) {
				if (ancestor.tagName != 'body' && ancestor.tagName != 'html' && n(ancestor) && !v(ancestor)) {
					s(ancestor);
				}
			});
			r = true;
		} else {
			if (toggleid != 'performerjsdebugbox') { P.Debug('Performer.Toggle -> Hide \'#' + toggleid + '\'', 'subfunction'); }
			P.removeClassName(el, 'toggleropen');
			P.Hide(targetEl, hideeffect);
			r = false;
		}
		if (P.nodeName(el).toLowerCase() == 'input' && el.type && el.type == 'checkbox') { el.checked = r; }
		return r;
	},
    // toggles the visibility of a group of elements
    GroupToggle: function(e, c) {
        var r = false;
		var eve = P.eventOrElement(e);
		var el = eve.el;
        if (!el) { el = P.findEventElement(e, 'A'); }
        // check the element has the required attribute and is a valid event trigger
        if (el && P.nodeName(el) && ((e.type == 'click' || P.keyCode(e) == 13 || P.keyCode(e) == 32) || !eve.stop)) {
            var cls = P.classNames(el);
            var targetClass = P.classParam(cls, 'targetClass', P.getAttribute(el, 'rel'));
            var showeffect = P.classParam(cls, 'showeffect', 'slidedown');
            var hideeffect = P.classParam(cls, 'hideeffect', 'slideup');
			var move = P.classParam(cls, 'move', false);
			var delay = P.classParam(cls, 'delay', 0)*1000;
			var foundEls = P.$$('.' + targetClass);
			P.Debug('Performer.GroupToggle -> Toggle ' + foundEls.length + ' elements with class ' + targetClass, 'subfunction');
			if (delay === 0) {
				r = P.DoGroupToggle(targetClass, foundEls, showeffect, hideeffect);
			} else {
				setTimeout(function() {
					r = P.DoGroupToggle(targetClass, foundEls, showeffect, hideeffect);
				}, delay);
			}
			if (P.nodeName(el).toLowerCase() == 'input' && el.type && el.type == 'checkbox') { el.checked = r; }
			if (!move || !r) {
				if (P.nodeName(el).toLowerCase() == 'a' && eve.stop) { P.stopEvent(e); }
			} else {
				window.location.hash = P(el, "href").replace(new RegExp('^[#]+', 'g'), '');
			}
			return r;
        }
    },
	DoGroupToggle: function(targetClass, foundEls, showeffect, hideeffect) {
		var acn = P.addClassName;
		var rcn = P.removeClassName;
		var s = P.Show;
		var h = P.Hide;
		var r = false;
		P.forEach(foundEls, function(element) {
			// toggle the visibility
			if (!P.visible(element)) {
				acn(element, 'toggleropen');
				s(element, showeffect);
				r = true;
			} else {
				rcn(element, 'toggleropen');
				h(element, hideeffect);
				r = false;
			}
		});
		return r;
	},
    // switch visibility of two element
    Switch: function(e, c) {
        P.Debug('Performer.Switch', 'function');
        var r = false;
        var el = P.eventElement(e);
        if (!el) { el = P.findEventElement(e, 'A'); }
        // check the element has the required attribute and is a valid event trigger
        if (el && P.nodeName(el) && (e.type == 'click' || e.keyCode == P.keyCode(e) == 13)) {
            var cls = P.classNames(el);
            var t1 = P.classParam(cls, 'targetEl1', P.getAttribute(el, 'rel'));
            var targetEl1 = P.$(t1);
            var t2 = P.classParam(cls, 'targetEl2', P.getAttribute(el, 'rev'));
            var targetEl2 = P.$(t2);
            // check the target elements can be found
            if (targetEl1 && targetEl2) {
                // toggle the visibility
                if (!P.visible(targetEl1)) {
                    P.Debug('-> Show \'#' + t1 + '\', hide \'#' + t2 + '\'', 'subfunction');
                    P.Show(targetEl1);
                    P.Hide(targetEl2);
                    r = true;
                } else {
                    P.Debug('-> Show \'#' + t2 + '\', hide \'#' + t1 + '\'', 'subfunction');
                    P.Show(targetEl2);
                    P.Hide(targetEl1);
                    r = false;
                }
            }
            if (!c && P.nodeName(el).toLowerCase() == 'a') { P.stopEvent(e); }
        }
        return r;
    },
    // focus the element
    Focus: function(e) {
        P.Debug('Performer.Focus', 'function');
        var el = P.$(e);
        if (el && P.nodeName(el)) {
            P.Debug('-> Focus on \'#' + P.identify(el) + '\'', 'subfunction');
            P.$(el).focus();
        }
    },
    // style an element
    Style: function(e) {
        P.Debug('Performer.Style', 'function');
		var eve = P.eventOrElement(e);
		var el = eve.el;
        if (!el) { el = P.findEventElement(e, 'A'); }
        // check the element has the required attribute and is a valid event trigger
        if (el && P.nodeName(el) && ((e.type == 'click' || P.keyCode(e) == 13) || !eve.stop)) {
			var cls = P.classNames(el);
			var delay = P.classParam(cls, 'delay', 0)*1000;
            var targetEl = P.$(P.classParam(cls, 'targetEl', P.getAttribute(el, 'rel')));
			if (!targetEl){ targetEl = el; }
            // check the target element can be found
            if (targetEl) {
				if (delay === 0) {
					P.DoStyle(targetEl, el, cls);
				} else {
					setTimeout(function(){
		                P.DoStyle(targetEl, el, cls);
					}, delay);
				}
                if (eve.stop) { P.stopEvent(e); }
            }
        }
    },
	DoStyle: function(targetEl, el, cls) {
		// set the new style
		var cssstyle = P.classParam(cls, "style", "");
		targetEl.className = cssstyle;
	},
    // resize an element
    Size: function(e) {
        P.Debug('Performer.Size', 'function');
        var el = P.findEventElement(e, 'a');
        // check the element has the required attribute and is a valid event trigger
        if (el && P.nodeName(el) && (e.type == 'click' || P.keyCode(e) == 13)) {
            var cls = P.classNames(el);
            var targetEl = P.$(P.classParam(cls, 'targetEl', P.getAttribute(el, 'rel')));
            // check the target element can be found
            if (targetEl) {
                // get the new size
                var sizes = P.classParam(cls, 'sizes', P.getAttribute(el, 'rev'));
                var sizeParts, height, width;
                // get the height/width values
                if (sizes.indexOf(',') >= 0) {
                    sizeParts = sizes.split(',');
                    height = sizeParts[0];
                    width = sizeParts[1];
                } else {
                    height = sizes;
                    width = 0;
                }
                if (height == '') { height = 0; }
                if (width == '') { width = 0; }
                // get current dimensions
                var dimensions = P.getDimensions(targetEl);
                var currentHeight = dimensions.height;
                var currentWidth = dimensions.width;
                // calculate the new dimensions and resize the element
                if (height !== 0) {
                    var newHeight = (parseFloat(height) + parseFloat(currentHeight)) + 'px';
                    P.Debug('-> Change height of \'#' + P.identify(targetEl) + '\' to ' + newHeight, 'subfunction');
                    P.setStyle(targetEl, { height: newHeight });
                }
                if (width !== 0) {
                    var newWidth = (parseFloat(width) + parseFloat(currentWidth)) + 'px';
                    P.Debug('-> Change width of \'#' + P.identify(targetEl) + '\' to ' + newWidth, 'subfunction');
                    P.setStyle(targetEl, { width: newWidth });
                }
                P.stopEvent(e);
            }
        }
    },
    // resize a textarea element when the cursor hits the bottom of the element
    Resize: function(e) {
        P.Debug('Performer.Resize', 'function');
        var el = P.eventElement(e);
        // check the element has the required attribute and is a valid event trigger
        if (el && P.nodeName(el)) {
            var cls = P.classNames(el);
            var m = P.classParam(cls, 'maxHeight', 500);
            var s = el.scrollHeight;
            var d = P.getDimensions(el);
            var h = d.height;
            if ((s + 5) > h && h < m) {
                el.style.height = (s + 10) + 'px';
            }
        }
    },
    // toggle an element and load data
    ToggleLoad: function(e) {
        P.Debug('Performer.ToggleLoad', 'function');
        var el = P.eventElement(e);
        var cls = P.classNames(el);
        var targetEl = P.classParam(cls, 'targetEl', P.getAttribute(el, 'rel'));
        var targetPage = P.classParam(cls, 'targetPage', P.getAttribute(el, 'rev'));
        // check the element has the required attribute and is a valid event trigger
        if (el && P.nodeName(el) && targetEl && targetPage && (e.type == 'click' || P.keyCode(e) == 13)) {
            if (P.Toggle(e)) {
                P.Debug('-> Loading content into \'#' + targetEl + '\'', 'subfunction');
                P.Load(e, true, false);
            }
            P.stopEvent(e);
        }
    },
    // initialise tabs
    InitTabs: function(el) {
        var elid = P.identify(el);
        el = P.$(P.identify(el));
        // if this is the tab in the hash, show it
        if (P.Hash == elid) {
            P.addClassName(P.getElementsByAttribute('a', 'rev', elid)[0], 'tabbercurrent');
            P.removeClassName(el, 'hider');
            P.Show(el);
        }
        // if this is not the tab in the hash, and it is set to be shown, hide it
        if (!P.hasClassName(el, 'hider') && P.Hash != '' && P.Hash != elid) {
            P.removeClassName(P.getElementsByAttribute('a', 'rev', elid)[0], 'tabbercurrent');
            P.addClassName(el, 'hider');
            P.Hide(el);
        }
    },
    // toggle tabs
    Tab: function(e) {
        P.Debug('Performer.Tab', 'function');
        // reset the hash
        P.Hash = '';
        var el = P.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigger
        if (el && P.nodeName(el) && (e.type == 'click' || P.keyCode(e) == 13)) {
            var cls = P.classNames(el);
            var tabGroup = P.classParam(cls, 'tabGroup', P.getAttribute(el, 'rel'));
            // check the tabgroup can be found
            if (tabGroup && P.$(tabGroup)) {
                var otab = P.classParam(cls, 'tab', P.getAttribute(el, 'rev'));
                var openTab = P.$(otab);
                var tablinks = P.$$('.tabber');
				var i = tablinks.length;
				var hcn = P.hasClassName;
				var ga = P.getAttribute;
				var rcn = P.removeClassName;
                while (i--) {
                    if (hcn(tablinks[i], 'tabGroup-' + tabGroup) || ga(el, 'rel') == tabGroup) {
                        rcn(tablinks[i], 'tabbercurrent');
                    }
                }
                // hide all the tabs
                var tabs = P.$$('#' + tabGroup + ' .tab');
				i = tabs.length;
				var h = P.Hide;
                while (i--) {
                    h(tabs[i]);
                }
                P.addClassName(el, 'tabbercurrent');
                // show the required tab
                P.Debug('-> Showing tab \'#' + otab + '\'', 'subfunction');
                P.Show(openTab, 'fadein');
                P.stopEvent(e);
            }
        }
    },
    // toggle an accordian element
    Accordian: function(e) {
        P.Debug('Performer.Accordian', 'function');
        // reset the hash
        P.Hash = '';
        var el = P.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigger
        if (el && P.nodeName(el) && (e.type == 'click' || P.keyCode(e) == 13)) {
            var cls = P.classNames(el);
            var accordianGroup = P.classParam(cls, "group", false);
            // check the accordian group can be found
            if (P.$(accordianGroup)) {
                var groupcls = P.classNames(el);
                var oitem = P.classParam(cls, "item", false);
                var openItem = P.$(oitem);
                var accordianlinks = P.$$('.accordianer');
				var i = accordianlinks.length;
				var ga = P.getAttribute;
				var rcn = P.removeClassName;
                while (i--) {
                    if (ga(accordianlinks[i], 'rel') == accordianGroup) { rcn(accordianlinks[i], 'accordiancurrent'); }
                }
                // hide all the accordian items
                var accordianitems = P.$$('#' + accordianGroup + ' .accordianitem');
				i = accordianitems.length;
				var h = P.Hide;
                while (i--) {
                    h(accordianitems[i]);
                }
                P.addClassName(el, 'accordiancurrent');
                // show the required accordian item
                P.Debug('-> Showing accordianitem \'#' + oitem + '\'', 'subfunction');
                P.Show(openItem, 'slidedown');
                P.stopEvent(e);
            }
        }
    },
    // load data into an element
    Load: function(e, c, s) {
        P.Debug('Performer.Load', 'function');
        var el = P.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigger
        if (el && P.nodeName(el) && (e.type == 'click' || P.keyCode(e) == 13)) {
            var cls = P.classNames(el);
            var targetEl = P.classParam(cls, 'targetEl', P.getAttribute(el, 'rel'));
            var rel = P.$(targetEl);
            var targetPage = P.classParam(cls, 'targetPage', P.getAttribute(el, 'rev'));
            // check the target element can be found
            if (targetEl && rel && P.nodeName(rel)) {
                P.Debug('-> Loading content into \'#' + targetEl + '\'', 'subfunction');
                if (!s) {
                    P.DoLoad(targetPage, targetEl, 'get', 'fillandinit');
                } else {
                    P.DoLoad(targetPage, targetEl, 'get', 'fill');
                }
            }
            if (!c) { P.stopEvent(e); }
        }
    },
    // delete an element
    Delete: function(e) {
        P.Debug('Performer.Delete', 'function');
        var el = P.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigger
        if (el && P.nodeName(el) && (e.type == 'click' || P.keyCode(e) == 13)) {
            var cls = P.classNames(el);
            var targetEl = P.classParam(cls, 'targetEl', P.getAttribute(el, 'rel'));
            var rel = P.$(targetEl);
            var targetPage = P.classParam(cls, 'targetPage', P.getAttribute(el, 'rev'));
            var confirmDelete = P.classParam(cls, "confirmDelete", false);
            // check the target element can be found
            if (targetEl && rel && P.nodeName(rel)) {
                P.Debug('-> Deleting \'#' + targetEl + '\'', 'subfunction');
                if ((confirmDelete && P.getAttribute(el, 'title') && confirm(P.getAttribute(el, 'title') + ' - are you sure?')) || !confirmDelete) {
                    P.DoLoad(targetPage, targetEl, 'get', 'deleteandreplace');
                }
            }
            P.stopEvent(e);
        }
    },
    // load some data
    DoLoad: function(targetPage, targetElement, requestMethod, onCompleteFunction) {
        P.Debug('Performer.DoLoad(' + targetPage + ' -> #' + targetElement + ')', 'function');
        var target = P.$(targetElement);
		var d = P.$;
		var rcn = P.removeClassName;
		var dbg = P.Debug;
		var ri = P.ReInit;
        if (targetPage && targetElement && target && P.nodeName(target)) {
            P.addClassName(d(targetElement), 'performerloading');
            P.Request(targetPage, requestMethod, '', function(request) {
                var text = P.getRequestText(request);
                if (onCompleteFunction == 'fill') {
                    d(targetElement).innerHTML = text;
                    rcn(d(targetElement), 'performerloading');
                    dbg('-> Filled \'#' + targetElement + '\'', 'success');
                }
                if (onCompleteFunction == 'fillandinit') {
                    d(targetElement).innerHTML = text;
                    rcn(d(targetElement), 'performerloading');
                    dbg('-> Filled \'#' + targetElement + '\'', 'success');
                    ri('#' + targetElement);
                }
                if (onCompleteFunction == 'deleteandreplace') {
                    P.insertAfter(d(targetElement), text);
                    P.remove(d(targetElement));
                }
                if (onCompleteFunction == 'setvalue') {
                    d(targetElement).value = text;
                    rcn(d(targetElement), 'performerloading');
                    dbg('-> Value set \'#' + targetElement + '\'', 'success');
                }
                if (onCompleteFunction == 'setvalueandinit') {
                    d(targetElement).value = text;
                    rcn(d(targetElement), 'performerloading');
                    dbg('-> Set value \'#' + targetElement + '\'', 'success');
                    ri('#' + targetElement);
                }
            });
        }
    },
    // load data into an element on a regular basis
    Reload: function(e) {
        var el = P.$(e);
        var elid = P.identify(el);
        // check this reloader isn't already initialised
        if (P.Reloaders.PerformerIndexOf(elid) == -1) {
            // get the class parameters
            var cls = P.classNames(el);
            var delay = P.classParam(cls, "delay", 0)*1000;
            var targetPage = P.classParam(cls, "targetPage", false);
            if (delay === 0) { delay = 60000; }
            // check the element has the required attributes
            if (el && P.nodeName(el) && delay && targetPage) {
                P.Reloaders[P.Reloaders.length] = elid;
                P.Debug('Performer.Reload -> Added \'#' + elid + '\' to Performer.Reloaders (now ' + P.Reloaders.length + ' items): ' + delay + ' seconds', 'subfunction');
                P.DoLoad(targetPage, elid, 'get', 'fillandinit');
                var func = function() {
                    var d = new Date();
                    var t = d.getTime();
                    if (targetPage.indexOf('?') != -1) { t = '&' + t; } else { t = '?' + t; }
                    P.DoLoad(targetPage + t, elid, 'get', 'fillandinit');
                };
                window.setInterval(func, delay);
            }
        }
    },
    // load data into an element when the page loads
    Preload: function(e) {
        P.Debug('Performer.Preload', 'function');
        var el = P.$(e);
        // get the class parameters
        var cls = P.classNames(el);
        var targetPage = P.classParam(cls, "targetPage", false);
        // check the element has the required attributes
        if (el && P.nodeName(el) && targetPage) {
            var elid = P.identify(el);
            P.Debug('-> Loading content into \'#' + elid + '\'', 'subfunction');
            P.DoLoad(targetPage, elid, 'get', 'fillandinit');
        }
    },
    // hide a hider element
    Hide: function(el, effect) {
        var elid = P.identify(el);
        if (el && P.nodeName(el)) {
            if (P.Hash != elid) {
                P.Debug('Performer.Hide -> Hiding \'#' + elid + '\' (effect: ' + effect + ')', 'subfunction');
                P.doHide(el, effect);
                if (!P.hasClassName(el, 'hider')) { P.addClassName(el, 'hider'); }
                if (P.hasClassName(el, 'shower')) { P.removeClassName(el, 'shower'); }
            } else {
                P.removeClassName(el, 'hider');
            }
        } else {
            P.Debug('Performer.Hide -> Could not hide \'#' + elid + '\'', 'subfunction');
        }
    },
    // show a shower element
    Show: function(el, effect) {
        var elid = P.identify(el);
        if (el && P.nodeName(el)) {
            P.doShow(el, effect);
            if (P.hasClassName(el, 'hider')) { P.removeClassName(el, 'hider'); }
            if (P.hasClassName(el, 'shower')) { P.removeClassName(el, 'shower'); }
            P.Debug('Performer.Show -> Showing \'#' + elid + '\' (effect: ' + effect + ')', 'subfunction');
        } else {
            P.Debug('Performer.Show -> Could not show \'#' + elid + '\'', 'subfunction');
        }
    },
    // limit the amount of text in an input box or textarea
    Limit: function(e) {
        P.Debug('Performer.Limit', 'function');
        var el = P.eventElement(e);
        // get the class parameters
        var cls = P.classNames(el);
        var lengthLimit = P.classParam(cls, "lengthLimit", false);
        var targetEl = P.$(P.classParam(cls, "targetEl", false));
        if (el && lengthLimit && targetEl) {
            var currentLength = P.getValue(el).length;
            // limit the length
            if (parseFloat(currentLength) >= parseFloat(lengthLimit)) {
                P.$(el).value = P.getValue(el).substr(0, lengthLimit);
                P.update(targetEl, "Limit reached");
                // if this is a character key, stop it being entered
                var key = P.keyCode(e) || e.code;
                if (key != 8 && key != 46 && key != 37 && key != 39) { P.stopEvent(e); }
            } else {
                P.update(P.$(targetEl), (lengthLimit - currentLength) + " characters left");
            }
        }
    },
    // show the length limit notification
    LimitNotifier: function(e) {
        P.Debug('Performer.LimitNotifier', 'function');
        var el = P.$(e);
        // check the element exists
        if (el && (P.nodeName(el) == 'input' || P.nodeName(el) == 'textarea')) {
            // get the class parameters
            var cls = P.classNames(el);
            var lengthLimit = P.classParam(cls, "lengthLimit", false);
            var targetEl = P.$(P.classParam(cls, "targetEl", false));
            // check this doesn't have prompt text in
            if (!P.hasClassName(el, 'prompter') && lengthLimit && targetEl) {
                var currentLength = P.getValue(el).length;
                P.update(targetEl, (lengthLimit - currentLength) + " characters left");
            }
        }
    },
    // edit the contents of an element and send the results to a processing page
    Edit: function(e) {
        P.Debug('Performer.Edit', 'function');
        var el = P.eventElement(e);
        // check the element has the required attributes and is a valid event trigger
        if (el && P.nodeName(el) && P.getAttribute(el, 'id') && P.classNames(el) && (e.type == 'click' || P.keyCode(e) == 13)) {
            P.removeClassName(el, 'editor');
            var cls = P.classNames(el);
            var targetPage = P.classParam(cls, "targetPage", false);
            var targetElement = P.classParam(cls, "targetElement", false);
            var inputType = P.classParam(cls, "inputType", "input");
            var autosave = P.classParam(cls, "autosave", false);
            if (targetPage && inputType) {
                var id = P.identify(el);
                // build the editing form
                el.innerHTML = P.BuildEditForm(el, targetPage, inputType, targetElement, autosave);
                // remove the listeners to prevent duplication problems
                P.unBind(el, 'click', P.Edit);
                P.unBind(el, 'keypress', P.Edit);
                // get the form
                var form = P.$(id + '-editor');
                // if autosaving when the textbox is blurred
                if (autosave !== false) {
                    // add the event listener for when the textbox is blurred
                    P.bind(P.$(id + '-value'), 'blur', function() {
                        // get the vars
                        var vars = P.serialize(form);
                        P.addClassName(P.$(id + '-value'), "performerloading");
                        P.Request(targetPage, 'post', vars, function() {
                            P.HideEditForm(el, true);
                        });
                    });
                } else {
                    // catch for submit and overwrite the original value
                    P.bind(form, 'submit', function(e) {
                        // get the vars
                        var vars = P.serialize(form);
                        P.addClassName(form, "performerloading");
                        P.$(id + '-originaltext').innerHTML = P.$(id + '-value').value;
                        P.Request(targetPage, 'post', vars, function() {
                            P.HideEditForm(el, true);
                        });
                        P.stopEvent(e);
                    });
                }
                P.$(id + '-value').focus();
                P.ReInit('#' + id);
            }
        }
    },
    // build the element editing form
    BuildEditForm: function(el, targetPage, inputType, targetElement, autosave) {
        P.Debug('Performer.BuildEditForm(' + targetPage + ')', 'function');
        if (el && P.nodeName(el) && P.$(el) && targetPage) {
            var id = P.identify(el);
            var value = P.$(el).innerHTML;
            var editForm;
            // if targetElement is set, we are using the Performer submitter function
            editForm = '<form id="' + id + '-editor" class="performer-editor" action="' + targetPage + '" method="post">\n';
            if (inputType == "" || inputType == "input") {
                editForm += '<input type="text" id="' + id + '-value" name="' + id + '" value="' + value + '" />\n';
            }
            if (inputType == "textarea") {
                editForm += '<textarea id="' + id + '-value" name="' + id + '" rows="6" cols="30">' + value + '</textarea>\n';
            }
            if (autosave === false) {
                editForm += '<input type="submit" id="' + id + '-save" name="' + id + '-save" value="Save" />\n<a href=\"#\" class="uneditor targetEl-' + id + '">Cancel</a>\n';
                if (targetElement != "") {
                    editForm += '<span id="' + targetElement + '"></span>\n';
                }
            }
            editForm += '</form>\n<span style="display:none" id="' + id + '-originaltext">' + value + '</span>';
            P.Debug('-> Built form with action: ' + targetPage, 'function');
            return editForm;
        }
    },
    // hide an edit form and optionally set the text to the inputted value
    HideEditForm: function(el, val) {
        P.Debug('Performer.HideEditForm', 'function');
        var id = P.identify(el);
        if (val) {
            el.innerHTML = P.$(id + '-value').value;
        } else {
            el.innerHTML = P.$(id + '-originaltext').innerHTML;
        }
        P.bind(P.$(id), 'click', P.Edit);
        P.bind(P.$(id), 'keypress', P.Edit);
    },
    // cancel a Performer.Edit command and return the element to normal
    UnEdit: function(e) {
        P.Debug('Performer.UnEdit', 'function');
        var el = P.eventElement(e);
        if (el && P.nodeName(el) && (e.type == 'click' || P.keyCode(e) == 13)) {
            var cls = P.classNames(el);
            var rel = P.classParam(cls, 'targetEl', false);
            var targetEl = P.$(rel);
            if (targetEl) {
                // add the listeners
                P.bind(targetEl, 'click', P.Edit);
                P.bind(targetEl, 'keypress', P.Edit);
                targetEl.innerHTML = P.$(rel + '-originaltext').innerHTML;
                P.stopEvent(e);
            }
        }
    },
    // set the prompt text for a text or textarea element
    SetPrompt: function(el) {
        P.Debug('Performer.SetPrompt', 'function');
		var placeHolderSupport = ('placeholder' in document.createElement('input'));
		var id = P.identify(el);
		var title = P.getAttribute(el, 'title');
		// if the browser does not support the HTML5 placeholder attribute (from http://robertnyman.com/2010/06/17/adding-html5-placeholder-attribute-support-through-progressive-enhancement/)
		if (!placeHolderSupport) {
	        if (el && P.nodeName(el) && title && el.value == "" && (el.type == 'textarea' || el.type == 'text')) {
	            P.Debug('-> Setting prompt: ' + title, 'function');
	            P.addClassName(el, "performer-prompter");
	            el.value = P.getAttribute(el, 'title');
	            // find the form containing this element
	            var form = P.up('#' + id, 'form');
	            if (form) {
	                // when the form is submitted, remove the prompt
	                P.bind(form, 'submit', function() {
	                    P.ClearPrompt(el);
	                }, false);
	            }
	        }
		} else {
			P.setAttribute(el, 'placeholder', title);
		}
    },
    // remove a prompt
    RemovePrompt: function(e) {
        P.Debug('Performer.RemovePrompt', 'function');
        var el = P.eventElement(e);
        if (el && P.nodeName(el)) { P.ClearPrompt(el); }
    },
    // clear the prompt
    ClearPrompt: function(el) {
        P.Debug('Performer.ClearPrompt', 'function');
        var title = P.getAttribute(el, "title");
        if (el && P.nodeName(el) && title && (el.value == title) && (el.type == 'textarea' || el.type == 'text')) {
            el.value = "";
            P.removeClassName(el, "performer-prompter");
        }
    },
    // check a prompt is present
    CheckPrompt: function(e) {
        P.Debug('Performer.CheckPrompt', 'function');
        var el = P.eventElement(e);
        var title = P.getAttribute(el, "title");
        var id = P.identify(el);
        if (el && P.nodeName(el) && title && (el.value == "") && (el.type == 'textarea' || el.type == 'text')) {
            P.SetPrompt(el);
            el.value = P.getAttribute(el, 'title');
        }
    },
    // open a popup window
    Pop: function(e) {
        P.Debug('Performer.Popper', 'function');
        var el = P.findEventElement(e, 'A');
        var cls = P.classNames(el);
        var targetName = P.classParam(cls, 'targetName', P.getAttribute(el, 'rel')) ? '' : 'popupwindow_' + P.increment();
        var pageOptions = P.classParam(cls, 'options', P.getAttribute(el, 'rev')) ? '' : 'scrollbars=yes,toolbar=yes,menubar=yes,location=yes,status=yes,directories=yes';
        // check the element has the required attributes and is a valid event trigger
        if (el && P.nodeName(el) && P.getAttribute(el, 'href') && (e.type == 'click' || P.keyCode(e) == 13)) {
            var targetURL = P.getAttribute(el, 'href');
            P.Debug('-> Opening: ' + targetURL + ' with ' + pageOptions, 'function');
            var win = window.open(targetURL, targetName, pageOptions);
            if (window.focus) { win.focus(); }
            P.stopEvent(e);
        }
    },
    // morph CSS properties
    Morph: function(e) {
        P.Debug('Performer.Morpher', 'function');
		var eve = P.eventOrElement(e);
		var el = eve.el;
        // get the class parameters
        var cls = P.classNames(el);
        // get the target element
        var targetEl = P.classParam(cls, 'targetEl', P.identify(el));
        if (el && targetEl && P.$(targetEl)) {
			// get the delay
			var delay = P.classParam(cls, 'delay', 0)*1000;
			setTimeout(function(){
				// set the duration
				var duration = P.classParam(cls, 'duration', 1);
				// set allowed properties
				var props = ["lineHeight", "margin", "padding", "width", "height", "opacity", "fontSize", "borderWidth", "color", "backgroundColor"];
				//set up properties
				params = P.setupMorphProperties(props, cls);
				// do the animation
				P.animate(targetEl, params, duration);
			}, delay);
			if (eve.stop) { P.stopEvent(e); }
        }
    },
    // debug Performer
    ToggleDebug: function(e) {
        if (!P.Debugging) {
            P.Debugging = true;
            P.PrepareDebug();
            P.Debug();
			P.stopEvent(e);
        } else {
            P.Debugging = false;
            P.remove(P.$('performerjsdebugwrapper'));
			P.stopEvent(e);
        }
    },
    // prepare the debug area
    PrepareDebug: function() {
        var bodyhtml = document.getElementsByTagName('body')[0].innerHTML;
        bodyhtml = bodyhtml + '<div style="position:fixed;bottom:0;right:0;left:0;margin-top:height:400px;" id="performerjsdebugwrapper">\n<p style="margin:0; padding: 0 0 4px 0;"><a href="#" class="toggler targetEl-performerjsdebugbox" style="background:#333;color:#FFF;padding:0.3em 0.6em;margin:0 0 0 1em;-moz-border-radius-topright:5px;-moz-border-radius-topleft:5px;-webkit-border-top-right-radius:5px;-webkit-border-top-left-radius:5px;border:0">Performer Debug</a></p>\n<div class="hider" style="background:#333;padding:0.5em" id="performerjsdebugbox"><div id="performerjsoutput" style="padding:0.3em;height:400px;overflow:auto;background:#FFF;">\n</div></div>';
		var body = document.getElementsByTagName('body')[0];
		var children = P.children(body);
		if(children.length){
			P.insertAfter(children[0], bodyhtml);
			P.DoListeners("#performerjsdebugwrapper");
		}
    },
    // debug
    Debug: function(str, status) {
        if (P.Debugging) {
            var col = '#000';
            if (status == 'function') {
                col = '#333';
            } else if (status == 'subfunction') {
                col = '#AAA';
            } else if (status == 'error') {
                col = '#900';
            } else if (status == 'success') {
                col = '#090';
            } else if (status == 'warning') {
                col = '#FFA800';
            } else if (status == 'ajax') {
                col = '#4937DF';
            }
            if (P.$('performerjsdebugbox')) {
                P.$('performerjsoutput').innerHTML += '<p style="margin:0.1em 0;padding:0;color:' + col + '">' + str + '</p>\n';
            }
        }
    },
	// Performer internal methods
	eventOrElement: function(e) {
		var o = {};
		o.stop = false;
		o.el = e;
		if (!e.innerHTML) {
			o.el = P.eventElement(e);
			o.stop = true;
		}
		return o;
	},
    // JavaScript library integration methods
    // check element has class name
    hasClassName: function(el, cls) {
        if (!el || typeof el == 'undefined') { return false; }
        if (P.jQuery) { return jQuery(el).hasClass(cls); }
    },
    // shortcut for getElementById (handles multiple elements)
    $: function(el) {
        if (typeof el == 'object') { return el; }
        if (typeof el == 'undefined') { return false; }
        if (P.jQuery) { return jQuery('#' + el)[0]; }
    },
    // shortcut for getElementByClassName (handles multiple elements)
    $$: function(cls) {
        var els;
        if (P.jQuery) { els = jQuery(cls); }
        if (els && els.length > 0) {
            return els;
        } else {
            return false;
        }
    },
    // gets all matching form elements
    $F: function(el) {
        var elid = P.identify(el);
        var fields;
        if (P.jQuery) { fields = jQuery('#' + elid + ' :input'); }
        return fields;
    },
    // return the node name of an element
    nodeName: function(el) {
        var nn = false;
        if (P.jQuery) { nn = el.tagName.toLowerCase(); }
        if (!nn || typeof nn == 'undefined' || nn == '#document') {
            return false;
        } else {
            return nn;
        }
    },
    // gets elements with a certain attribute
    getElementsByAttribute: function(type, attr, value) {
        var s;
        if (value) {
            s = type + "[" + attr + "='" + value + "']";
            if (P.jQuery) { return jQuery(s); }
        } else {
            s = type + "[" + attr + "]";
            if (P.jQuery) { return jQuery(s); }
        }
    },
    // get the value of a form field
    getValue: function(el) {
        if (P.jQuery) { return jQuery(el).val(); }
    },
    // set the value of a form field
    setValue: function(el, value) {
        if (P.jQuery) { return jQuery(el).val(value); }
    },
    // get the first parent matching the filter
    up: function(el, filter) {
        if (P.jQuery) { return jQuery(el).parent(filter)[0]; }
    },
    // serialise form fields
    serialize: function(el) {
        if (P.jQuery) { return jQuery(el).serialize(); }
    },
    // update the innerHTML of an element
    update: function(el, html) {
        if (P.jQuery) { return jQuery(el).html(html); }
    },
    // insert HTML after an element
    insertAfter: function(el, html) {
        if (P.jQuery) { return jQuery(el).after(html); }
    },
    // increment the counter
    increment: function() {
        P.Counter++;
        return P.Counter;
    },
    // get an elements id, or create one if it doesn't exist
    identify: function(el) {
        if (typeof (el) == 'string') { el = P.$(el); }
        var id = P.getAttribute(el, 'id');
        if (!id || id == '') {
            id = 'anonymous_element_' + P.increment();
            P.setAttribute(el, 'id', id);
        }
        return id;
    },
    // get an element attribute
    getAttribute: function(el, attr) {
        if (P.jQuery) { return jQuery(el).attr(attr); }
    },
    // set an element attribute
    setAttribute: function(el, attr, val) {
        if (P.jQuery) { return jQuery(el).attr(attr, val); }
    },
    // remove an element attribute
    removeAttribute: function(el, attr) {
        return el.removeAttribute(attr);
    },
    // remove an element completely
    remove: function(el) {
        if (P.jQuery) {
            jQuery(el).fadeOut("normal");
            return jQuery(el).remove();
        }
    },
    // get an elements children
    children: function(el, selector) {
        if (typeof selector != 'undefined') {
            selector = selector.replace('-', ' ');
            el = P.$$(selector);
        }
        if (P.jQuery) { return jQuery(el).children(); }
    },
    // get an elements ancestors
    ancestors: function(el) {
        if (P.jQuery) { return jQuery(el).parents(); }
    },
    // get array of classnames for an element
    classNames: function(el) {
        var cls = P.getAttribute(el, "class");
        if (cls && cls.length > 0) {
            var classes = [];
            var names = cls.split(/\s+/);
			var i = names.length;
            while (i--) {
                if (names[i].length > 0) {
                    classes[classes.length] = names[i];
                }
            }
            return classes;
        } else {
            return [];
        }
    },
    // is an element visible
    visible: function(el) {
        if (typeof (el) != 'object') { el = P.$(el); }
        if (P.jQuery) { return jQuery(el).is(":visible"); }
    },
    // add a class name
    addClassName: function(el, cls) {
        if (typeof (el) != 'object') { el = P.$(el); }
        if (P.jQuery) { return jQuery(el).addClass(cls); }
    },
    // remove a class name
    removeClassName: function(el, cls) {
        if (typeof (el) != 'object') { el = P.$(el); }
        if (P.jQuery) { return jQuery(el).removeClass(cls); }
    },
    // set the class name
    className: function(el, cls) {
        if (typeof (el) != 'object') { el = P.$(el); }
        el.className = cls;
    },
    // disable the context menu on an element
    disableContext: function(el) {
        if (P.jQuery) { P.bind(el, 'contextmenu', function(e) { return false; }); }
        if (P.MooTools) { return P.bind(el, 'contextmenu', function(e) { e.stop(); }); }
    },
    // hide an element, with an optional effect
    doHide: function(el, effect) {
        if (typeof (el) != 'object') { el = P.$(P.identify(el)); }
		if (P.jQuery) {
            if (!effect || P.Effects.PerformerIndexOf(effect) == -1) {
                return jQuery(el).hide();
            } else {
                if (effect == 'slideup' || effect == 'blindup') { return jQuery(el).slideUp("normal"); }
                if (effect == 'slidedown' || effect == 'blinddown') { return jQuery(el).slideDown("normal"); }
                if (effect == 'fadein') { return jQuery(el).fadeIn("normal"); }
                if (effect == 'fadeout') { return jQuery(el).fadeOut("normal"); }
            }
        }
        return false;
    },
    // show an element, with an optional effect
    doShow: function(el, effect) {
        if (typeof (el) != 'object') { el = P.$(P.identify(el)); }
		if (P.jQuery) {
            if (!effect || P.Effects.PerformerIndexOf(effect) == -1) {
                return jQuery(el).show();
            } else {
                if (effect == 'slideup' || effect == 'blindup') { return jQuery(el).slideUp("normal"); }
                if (effect == 'slidedown' || effect == 'blinddown') { return jQuery(el).slideDown("normal"); }
                if (effect == 'fadein') { return jQuery(el).fadeIn("normal"); }
                if (effect == 'fadeout') { return jQuery(el).fadeOut("normal"); }
            }
        }
        return false;
    },
    // do an AJAX request
    Request: function(targetPage, requestMethod, params, successFunction) {
        if (P.jQuery) { return jQuery.ajax({ type: requestMethod, url: targetPage, data: params, success: successFunction }); }
    },
    // get the response from an AJAX request
    getRequestText: function(request) {
        var text = request;
        if (request.responseText) { text = request.responseText; }
        return text;
    },
    // get the element which triggered an event
    eventElement: function(e) {
        var targ;
        if (!e) { e = window.event; }
        if (e.target) { targ = e.target; }
        else if (e.srcElement) { targ = e.srcElement; }
        if (targ.nodeType == 3) { return targ.parentNode; }
        return targ;
    },
    // find the first ancestor element of an element which triggered an event
    findEventElement: function(e, tag) {
        var target;
        if (P.jQuery) {
            target = P.eventElement(e);
            if (target && target.nodeName && target.nodeName.toLowerCase() == tag.toLowerCase()) {
                return target;
            } else {
                return jQuery(target).parents(tag)[0];
            }
        }
    },
    // bind an event on the document to a function
    domLoaded: function(func) {
        if (P.jQuery) { return jQuery(document).ready(func); }
    },
    // bind an event on an element to a function
    bind: function(el, event, func) {
        if (P.jQuery) { return jQuery(el).bind(event, func); }
    },
    // unbind a function from an event on an element
    unBind: function(el, event, func) {
        if (P.jQuery) { return jQuery(el).unbind(event, func); }
    },
    // stop the default action of an event firing, including bubbling and propigation
    stopEvent: function(e) {
        if (P.jQuery) { e.preventDefault(); e.stopPropagation(); return false; }
        return false;
    },
    // stop the event propagating upwards
    stopPropagation: function(e) {
        e.stopPropagation();
        return false;
    },
    // get the dimensions of an element
    getDimensions: function(el) {
        var size, getsize;
		size = {};
        if (P.jQuery) {
            size.height = jQuery(el).outerHeight();
            size.width = jQuery(el).outerWidth();
        }
        return size;
    },
    // set the css style of an element
    setStyle: function(el, style) {
        if (P.jQuery) { jQuery(el).css(style); }
    },
    //animate properties of an element
    animate: function(el, params, duration) {
        var elid = P.identify(el);
        if (typeof (el) != 'object') { el = P.$(elid); }
        if (P.jQuery) { 
			duration = duration * 1000;
            jQuery(el).animate(params, duration); 
        }
    },
	// set up the CSS properties for morphing
	setupMorphProperties: function(props, cls) {
		// initialise params
		var param, params, i, j;
		var cp = P.classParam;
		// loop properties, filling the output properties
			params = {};
			for (i = 0, j = props.length; i < j; i++) {
				param = cp(cls, props[i], false);
				if (param !== false) { params[props[i]] = param.replace("px", ""); }
			}
		return params;
	},
	// make sure CSS parameters with no size scale (px, em, pt) have px appended
	fixCSSParam: function(name, param) {
		if ((name == 'line-height' || name == 'border-width' || name == 'font-size' || name == 'padding' || name == 'margin') && typeof param == 'string') {
			var len = param.length;
			var last2 = param.substring(len-2).toLowerCase();
			if (last2 != 'px' && last2 != 'em' && last2 != 'pt') {
				return param + 'px';
			}
		}
		return param;
	},
    // return the keycode for this event
    keyCode: function(e) {
        if (window.event) {
            return window.event.keyCode;
        } else if (e) {
            return e.which;
        } else {
            return false;
        }
    },
    // return the mouse position
    // non-MooTools code from http://www.quirksmode.org/js/events_properties.html#position
    cursorPosition: function(e) {
            var posx = 0;
            var posy = 0;
            if (!e) { e = window.event; }
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            }
            else if (e.clientX || e.clientY) {
                var de = document.documentElement;
                var db = document.body;
                posx = e.clientX + db.scrollLeft + de.scrollLeft;
                posy = e.clientY + db.scrollTop + de.scrollTop;
            }
            return [posx, posy];
    },
    // return the position of an element
    // from http://www.quirksmode.org/js/findpos.html
    elementPosition: function(obj) {
        var curleft = 0;
		var curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curleft, curtop];
        }
    },
    // perform a function for each element in an object or array
    forEach: function(object, callback) {
        for (var i = 0, j = object.length; i < j; i++) {
            callback.call(object[i], object[i], object);
        }
    },
    // trim whitespace
    trim: function(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    },
    // debugging methods
    alertProperties: function(a) {
        var o = '';
		var name;
        for (name in a) {
            o += name + ': ' + a[name] + '\n';
        }
        P.createModal(true, true, 6, 'performermodalouter', 'performermodalinner', 100, 100, true);
        P.$('performer_modal').innerHTML = '<pre style="width: 100%; height: 100%">' + o + '</pre>';
    }
};
// use native browser JS 1.6 implementation if available
// from Prototype
if (typeof(Array.prototype.indexOf) == 'function') {
		Array.prototype.PerformerIndexOf = Array.prototype.indexOf;
	} else {
	    Array.prototype.PerformerIndexOf = function(item, i) {
		    i || (i = 0);
		    var length = this.length;
		    if (i < 0) { i = length + i; }
		    for (; i < length; i++) {
		        if (this[i] === item) { return i; }
		    }
		    return -1;
	};
}
// load Performer
var P = Performer;
P.Performer();
if (P.jQuery){
	/*
	 * jQuery Color Animations
	 * Copyright 2007 John Resig
	 * Released under the MIT and GPL licenses.
	 */
	(function(jQuery){
	// We override the animation for all of these color styles
	jQuery.each(['backgroundColor', 'color'], function(i, attr) {
	    jQuery.fx.step[attr] = function(fx) {
	        if (fx.state == 0) {
	            fx.start = getColor(fx.elem, attr);
	            fx.end = getRGB(fx.end);
	        }
	        fx.elem.style[attr] = "rgb(" + [
					Math.max(Math.min(parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0]), 255), 0),
					Math.max(Math.min(parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1]), 255), 0),
					Math.max(Math.min(parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2]), 255), 0)
				].join(",") + ")";
	    }
	});
	// Color Conversion functions from highlightFade
	// By Blair Mitchelmore
	// http://jquery.offput.ca/highlightFade/
	// Parse strings looking for color tuples [255,255,255]
	function getRGB(color) {
	    var result;
	    // Check if we're already dealing with an array of colors
	    if (color && color.constructor == Array && color.length == 3)
	        return color;
	    // Look for rgb(num,num,num)
	    if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color))
	        return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];
	    // Look for rgb(num%,num%,num%)
	    if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color))
	        return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];
	    // Look for #a0b1c2
	    if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color))
	        return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
	    // Look for #fff
	    if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color))
	        return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
	    // Otherwise, we're most likely dealing with a named color
	    return colors[P.trim(color).toLowerCase()];
	}
	function getColor(elem, attr) {
	    var color;
	    do {
	        color = jQuery.curCSS(elem, attr);
	        // Keep going until we find an element that has color, or we hit the body
	        if (color != '' && color != 'transparent' || jQuery.nodeName(elem, "body"))
	            break;
	        attr = "backgroundColor";
	    } while (elem = elem.parentNode);
	    return getRGB(color);
	};
	// Some named colors to work with
	// From Interface by Stefan Petre
	// http://interface.eyecon.ro/
	var colors = {
	    aqua: [0, 255, 255],
	    azure: [240, 255, 255],
	    beige: [245, 245, 220],
	    black: [0, 0, 0],
	    blue: [0, 0, 255],
	    brown: [165, 42, 42],
	    cyan: [0, 255, 255],
	    darkblue: [0, 0, 139],
	    darkcyan: [0, 139, 139],
	    darkgrey: [169, 169, 169],
	    darkgreen: [0, 100, 0],
	    darkkhaki: [189, 183, 107],
	    darkmagenta: [139, 0, 139],
	    darkolivegreen: [85, 107, 47],
	    darkorange: [255, 140, 0],
	    darkorchid: [153, 50, 204],
	    darkred: [139, 0, 0],
	    darksalmon: [233, 150, 122],
	    darkviolet: [148, 0, 211],
	    fuchsia: [255, 0, 255],
	    gold: [255, 215, 0],
	    green: [0, 128, 0],
	    indigo: [75, 0, 130],
	    khaki: [240, 230, 140],
	    lightblue: [173, 216, 230],
	    lightcyan: [224, 255, 255],
	    lightgreen: [144, 238, 144],
	    lightgrey: [211, 211, 211],
	    lightpink: [255, 182, 193],
	    lightyellow: [255, 255, 224],
	    lime: [0, 255, 0],
	    magenta: [255, 0, 255],
	    maroon: [128, 0, 0],
	    navy: [0, 0, 128],
	    olive: [128, 128, 0],
	    orange: [255, 165, 0],
	    pink: [255, 192, 203],
	    purple: [128, 0, 128],
	    violet: [128, 0, 128],
	    red: [255, 0, 0],
	    silver: [192, 192, 192],
	    white: [255, 255, 255],
	    yellow: [255, 255, 0]
	};
	})(jQuery);
}
// add Performer CSS classes
document.write('<style type="text/css">.hider { display: none; } .performertooltip { display: absolute; }.performerlightboxouter { position: fixed; z-index: 10000; top: 0px; right: 0px; bottom: 0px; left: 0px; background: #000; opacity: 0.6; } .performertooltip { background: #FFF;	padding: 6px; } .performertooltip div.performertooltipinner { border: 1px solid #000; background: #FFFCDF; padding: 1em; } .performermodalouter { background: #000; } .performermodalinner { background: #FFF; border: 1px solid #000; padding: 1em; } * html .performermodalinner { position: relative; } .performermenu:hover { display: absolute; } a.modalwindowcloser { background: #000; color: #FFF; padding: 0 2em; text-decoration: none; } .performerloading { background: #EFE4B3; } .performercontextmenu { background: #D4DBED; padding: 0.6em; list-style: none; border: 1px solid #CCC; } .password-weak { color: #C00; } .password-ok { color: #EFAD3B; }	.password-strong { color: #0C0; } .performer-pagination { text-align: right; } .performer-pagination li { display: inline; } .performer-pagination li a { padding: 0.3em; } .performer-pagination .currentpage { font-weight: bold; } .performer-error { color: #C00; }</style>');
