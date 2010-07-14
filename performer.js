/*
Performer JavaScript library (http://performerjs.org)
Created by Chris Taylor (http://www.stillbreathing.co.uk)
Additional work by kourge and Danny Linkov
Version 0.9

This work is released under a Creative Commons Attribution-ShareAlike 3.0 licence

You are free:

* to Share — to copy, distribute and transmit the work
* to Remix — to adapt the work

Under the following conditions:

* Attribution. You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
* Share Alike. If you alter, transform, or build upon this work, you may distribute the resulting work only under the same, similar or a compatible license.
* For any reuse or distribution, you must make clear to others the license terms of this work. The best way to do this is with a link to this web page: http://performerjs.org.
* Any of the above conditions can be waived if you get permission from the copyright holder.
* Nothing in this license impairs or restricts the author's moral rights.
*/
var Performer =
{
    version: '0.9',
    Scriptaculous: false,
    Prototype: false,
    jQuery: false,
    MooTools: false,
    Counter: 0,
    Performer: function() {
        Performer.DetectLibrary();
        if (Performer.Scriptaculous || Performer.Prototype || Performer.jQuery || Performer.MooTools) { Performer.Start(); }
    },
    // detect the JavaScript Library in use
    DetectLibrary: function() {
        if (window.Scriptaculous && typeof window.Scriptaculous != 'undefined') {
            Performer.Scriptaculous = true;
        } else if (window.Prototype && typeof window.Prototype != 'undefined' && window.Prototype.Version) {
            Performer.Prototype = true;
        } else if (window.MooTools && typeof window.MooTools != 'undefined' && window.MooTools.version) {
            Performer.MooTools = true;
        } else if (window.jQuery && typeof window.jQuery != 'undefined') {
            Performer.jQuery = true;
        }
    },
    Start: function() {
        Performer.domLoaded(function() {
            // set debugging
            Performer.Debugging = false;
            Performer.Debug('Performer.Performer', 'function');
            // set up global variables
            Performer.Reloaders = new Array();
            Performer.Repeaters = new Array();
            Performer.Groups;
            Performer.Duplicators = new Array();
            Performer.TextValue = new Array();
            Performer.NewTextValue = new Array();
            Performer.FadeSteps = 8;
            Performer.CurrentFadeStep = 0;
            Performer.Hash = parent.location.hash.replace(new RegExp('^[#]+', 'g'), '');
            Performer.Effects = new Array('slideup', 'slidedown', 'blinddown', 'blindup', 'fadein', 'fadeout');
            // initialise the app
            Performer.Init();
        });
    },
    Init: function() {
        Performer.CheckDebug();
        Performer.Debug('Performer.Init', 'function');
        // do the transformations
        Performer.DoTransformers();
        // set up listeners
        Performer.DoListeners();
        // set the body class
        Performer.addClassName(Performer.$$('body')[0], 'performer-enabled');
    },
    ReInit: function(el) {
        Performer.Debug('Performer.ReInit', 'function');
        // do the transformations
        Performer.DoTransformers(el, true);
        // set up listeners
        Performer.DoListeners(el, true);
    },
    DoListeners: function(el, reinit) {
        if (reinit == undefined) reinit = false;
        if (el == undefined || el == 'performerjsdebugwrapper') el = '';
        Performer.Listeners(el, 'form.formchecker', 'CheckForm', 'submit', reinit);
        Performer.Listeners(el, '.toggler', 'Toggle', 'click,keypress', reinit);
        Performer.Listeners(el, '.switcher', 'Switch', 'click,keypress', reinit);
        Performer.Listeners(el, '.loader', 'Load', 'click,keypress', reinit);
        Performer.Listeners(el, '.deleter', 'Delete', 'click,keypress', reinit);
        Performer.Listeners(el, '.toggleloader', 'ToggleLoad', 'click,keypress', reinit);
        Performer.Listeners(el, '.sizer', 'Size', 'click,keypress', reinit);
        Performer.Listeners(el, '.resizer', 'Resize', 'keypress', reinit);
        Performer.Listeners(el, '.tabber', 'Tab', 'click,keypress', reinit);
        Performer.Listeners(el, '.accordianer', 'Accordian', 'click,keypress', reinit);
        Performer.Listeners(el, '.selector', 'Select', 'change,keypress', reinit);
        Performer.Listeners(el, '.limiter', 'Limit', 'keyup,keydown', reinit);
        Performer.Listeners(el, '.editor', 'Edit', 'click,keypress', reinit);
        Performer.Listeners(el, '.uneditor', 'UnEdit', 'click,keypress', reinit);
        Performer.Listeners(el, '.setter', 'Set', 'click,keypress', reinit);
        Performer.Listeners(el, '.prompter', 'RemovePrompt', 'focus', reinit);
        Performer.Listeners(el, '.prompter', 'CheckPrompt', 'blur', reinit);
        Performer.Listeners(el, '.popper', 'Pop', 'click,keypress', reinit);
        Performer.Listeners(el, '.passwordchecker', 'CheckPassword', 'keyup', reinit);
        Performer.Listeners(el, '.matcher', 'Match', 'keyup', reinit);
        Performer.Listeners(el, '.grouptoggler', 'GroupToggle', 'click,keypress', reinit);
        Performer.Listeners(el, '.submitter', 'Submit', 'submit', reinit);
        Performer.Listeners(el, '.looperforward', 'Loop', 'click,keypress', reinit);
        Performer.Listeners(el, '.looperback', 'Loop', 'click,keypress', reinit);
        Performer.Listeners(el, '.looperfirst', 'Loop', 'click,keypress', reinit);
        Performer.Listeners(el, '.looperlast', 'Loop', 'click,keypress', reinit);
        Performer.Listeners(el, '.tooltipper', 'Tooltip', 'mouseover,focus', reinit);
        Performer.Listeners(el, '.popup', 'Tooltip', 'mouseover,focus', reinit);
        Performer.Listeners(el, '.modalwindower', 'ModalWindow', 'click,keypress', reinit);
        Performer.Listeners(el, '.modalwindowcloser', 'CloseModal', 'click,keypress', reinit);
        Performer.Listeners(el, '.contextmenuer', 'ContextMenu', 'mouseup', reinit);
        Performer.Listeners(el, '.styler', 'Style', 'click,keypress', reinit);
        Performer.Listeners(el, '.duplicator', 'Duplicate', 'click,keypress', reinit);
        Performer.Listeners(el, 'form.submitlocker', 'SubmitLock', 'submit', reinit);
        Performer.Listeners(el, 'a.toggle-performer-debug', 'ToggleDebug', 'click,keypress', reinit);
        // hooker listeners
        Performer.Listeners(el, '.hooker-click', 'Hooker', 'click,keypress', reinit);
        Performer.Listeners(el, '.hooker-keypress', 'Hooker', 'keypress', reinit);
        Performer.Listeners(el, '.hooker-change', 'Hooker', 'change', reinit);
        Performer.Listeners(el, '.hooker-mouseover', 'Hooker', 'mouseover', reinit);
        Performer.Listeners(el, '.hooker-mouseout', 'Hooker', 'mouseout', reinit);
        Performer.Listeners(el, '.hooker-submit', 'Hooker', 'submit', reinit);
        Performer.Listeners(el, '.hooker-focus', 'Hooker', 'focus', reinit);
        Performer.Listeners(el, '.hooker-blur', 'Hooker', 'blur', reinit);
    },
    DoTransformers: function(el, reinit) {
        if (reinit == undefined) reinit = false;
        if (el == undefined || el == 'performerjsdebugwrapper') el = '';
        Performer.Transformers(el, '.hider', 'Hide', reinit);
        Performer.Transformers(el, '.shower', 'Show', reinit);
        Performer.Transformers(el, '.focusser', 'Focus', reinit);
        Performer.Transformers(el, '.limiter', 'LimitNotifier', reinit);
        Performer.Transformers(el, '.reloader', 'Reload', reinit);
        Performer.Transformers(el, '.preloader', 'Preload', reinit);
        Performer.Transformers(el, '.prompter', 'SetPrompt', reinit);
        Performer.Transformers(el, '.truncator', 'Truncate', reinit);
        Performer.Transformers(el, 'ul.looper,ol.looper', 'InitLoop', reinit);
        Performer.Transformers(el, '.tab', 'InitTabs', reinit);
        Performer.Transformers(el, '.contextmenuer', 'DisableContextMenu', reinit);
        Performer.Transformers(el, '.pager', 'Page', reinit);
        // fader requires scriptaculous
        Performer.Transformers(el, '.fader', 'Fader', reinit);
    },
    // listen for the required classnames
    Listeners: function(el, classNames, f, event, reinit) {
        Performer.forEach(classNames.split(','), function(className) {
            if (el != undefined) el = el + ' ';
            var foundEls = Performer.$$('body ' + el + className);
            if (foundEls) {
                Performer.Debug('Performer.Listeners(' + el + className + ') - ' + foundEls.length + ' elements found', 'function');
                Performer.forEach(foundEls, function(element) {
                    if (Performer.nodeName(element)) {
                        Performer.forEach(event.split(','), function(event) {
                            Performer.bind(element, event, Performer[f]);
                        });
                    }
                });
            }
        });
    },
    // transform the required classnames
    Transformers: function(el, classNames, f, reinit) {
        Performer.forEach(classNames.split(','), function(className) {
            if (el != undefined) el = el + ' ';
            var foundEls = Performer.$$('body ' + el + className);
            if (foundEls) {
                Performer.Debug('Performer.Transformers(' + el + className + ') - ' + foundEls.length + ' elements found', 'function');
                Performer.forEach(foundEls, function(element) {
                    if (Performer.nodeName(element)) {
                        Performer[f](element);
                    }
                });
            }
        });
    },
    // check if the debug class is set
    CheckDebug: function() {
        Performer.Debug('Performer.CheckDebug', 'function');
        var debugs = Performer.$$('.performer-debug');
        if (debugs) {
            Performer.Debugging = true;
            Performer.PrepareDebug();
        }
    },
    // get a parameter from an array of class names
    classParam: function(classNames, paramName, defaultValue) {
        var cls = null;
        var val = defaultValue;
        for (var i = 0; i <= classNames.length; i++) {
            cls = classNames[i];
            if (cls && cls.substring(0, paramName.length + 1) == paramName + '-') { val = cls.replace(paramName + '-', ''); }
        }
        return val;
    },
    // runs a custom function on an event
    Hooker: function(e) {
        // get the event element
        var el = Performer.eventElement(e);
        // check the element has the required attributes
        if (el && Performer.getAttribute(el, 'id') && Performer.getAttribute(el, 'class')) {
            // get the event type
            var t = e.type;
            // get the classes
            var func = Performer.classParam(Performer.classNames(el), "func", null);
            // check the function exists
            if (eval('typeof(' + func + ')') == 'function') {
                // execute the function, passing the element and event
                eval(func + '(el,e)');
            }
        }
    },
    // paginate children of an element
    Page: function(el) {
        var elid = Performer.identify(el);
        el = Performer.$(elid);
        var cls = Performer.classNames(el);
        var selector = Performer.classParam(cls, "selector", "");
        var children;
        if (selector.length > 0) {
            children = Performer.children(el, "#" + elid + "-" + selector);
        } else {
            children = Performer.children(el);
        }
        var pagesize = Performer.classParam(cls, "pagesize", 10);
        var startpage = Performer.classParam(cls, "startpage", 1);
        if (children.length > pagesize) {
            var page = 1;
            var i = 0;
            Performer.forEach(children, function(el) {
                if (i < page * pagesize && i >= (page - 1) * pagesize) {
                    // do nothing
                } else {
                    page++;
                }
                Performer.addClassName(el, 'pageelement');
                Performer.addClassName(el, 'page' + page);
                Performer.Hide(el);
                i++;
            });
            Performer.forEach(Performer.$$("#" + elid + " .page" + startpage), function(el) {
                Performer.Show(el);
            });
            var menu = Performer.BuildPageMenu(elid, page, startpage);
            Performer.addClassName(Performer.$(elid + '-page' + page), "currentpage");
            Performer.insertAfter(el, menu);
            var links = Performer.$$("." + elid + "pagerlink");
            Performer.forEach(links, function(el) {
                Performer.bind(el, "click", Performer.ShowPage);
                Performer.bind(el, "keypress", Performer.ShowPage);
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
        var el = Performer.eventElement(e);
        var elid = Performer.identify(el);
        var parts = elid.split("-page");
        // hide all page elements
        Performer.forEach(Performer.$$("#" + parts[0] + " .pageelement"), function(el) {
            Performer.Hide(el);
        });
        // show this page
        Performer.forEach(Performer.$$("#" + parts[0] + " .page" + parts[1]), function(el) {
            Performer.Show(el);
        });
        // take off current page class
        Performer.forEach(Performer.$$("." + parts[0] + "pagerlink"), function(el) {
            Performer.removeClassName(el, "currentpage");
        });
        // add current page class
        Performer.addClassName(Performer.$(elid), "currentpage");
        Performer.stopEvent(e);
    },
    // shows a context menu when the mouse is right-clicked
    ContextMenu: function(e) {
        var el = Performer.eventElement(e);
        // hide any other context menus
        Performer.forEach(Performer.$$(".performercontextmenu"), function(el) { Performer.Hide(el); });
        // check this is a right click
        if (el && ((e.which && e.which == 3) || (e.button && e.button == 3) || (e.rightClick))) {
            var targetEl = Performer.classParam(Performer.classNames(el), "targetEl", false);
            var position = Performer.cursorPosition(e);
            if (position && targetEl && Performer.$(targetEl)) {
                var id = Performer.identify(el);
                targetEl = Performer.$(targetEl);
                Performer.addClassName(targetEl, 'performercontextmenu');
                targetEl.style.position = 'absolute';
                targetEl.style.zIndex = '10000';
                targetEl.style.top = position[1] + 'px';
                targetEl.style.left = position[0] + 'px';
                Performer.Show(targetEl);
                e.preventDefault();
                // add the listener to remove the context menu
                Performer.bind(Performer.$$('body')[0], 'click', Performer.HideContextMenu);
                Performer.bind(Performer.$$('body')[0], 'keypress', Performer.HideContextMenu);
                Performer.stopEvent(e);
                return false;
            }
        }
    },
    // disables context menu on an element
    DisableContextMenu: function(el) {
        // disable the default context menu
        Performer.disableContext(el);
    },
    // hides a context menu
    HideContextMenu: function(e) {
        var els = Performer.$$('.performercontextmenu');
        Performer.forEach(els, function(el) {
            Performer.removeClassName(el, 'performercontextmenu');
            Performer.Hide(el);
        }
		);
    },
    // sets the value of a form field
    Set: function(e) {
        var el = Performer.eventElement(e);
        if (el && Performer.nodeName(el)) {
            var cls = Performer.classNames(el);
            var value = unescape(Performer.classParam(cls, "value", ""));
            var targetEl = Performer.classParam(cls, "targetEl", Performer.getAttribute(el, "rel"));
            Performer.setValue(Performer.$(targetEl), value);
            Performer.stopEvent(e);
        }
    },
    // initialises a loop by hiding all elements in a UL, OL or DL list except the first one or the first one with class 'looperdefault'
    InitLoop: function(elid) {
        Performer.Debug('Performer.InitLoop', 'function');
        var el = Performer.$(elid);
        var shown = 0;
        var i = 0;
        Performer.forEach(Performer.children(el), function(child) {
            if (Performer.nodeName(child)) {
                Performer.Hide(child);
                if (Performer.hasClassName(child, 'looperdefault') || Performer.Hash == Performer.identify(child)) shown = i;
                i++;
            }
        });
        Performer.Show(Performer.children(el)[shown]);
    },
    // moves a looper element
    Loop: function(e) {
        r = false;
        var el = Performer.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigge;
        if (e.type == 'click' || Performer.keyCode(e) == 13) {
            var cls = Performer.classNames(el);
            var loop = Performer.classParam(cls, "targetEl", Performer.getAttribute(el, 'rel'));
            // check the loop can be found
            if (Performer.$(loop)) {
                var i = 0;
                var toshow = 0;
                var nowshowing = 0;
                Performer.forEach(Performer.children(Performer.$(loop)), function(child) {
                    if (Performer.nodeName(child) && Performer.visible(child)) {
                        Performer.Debug('- Currently showing item ' + i, 'subfunction');
                        nowshowing = i;
                    }
                    Performer.Hide(child);
                    i++;
                });
                if (Performer.hasClassName(el, 'looperback')) {
                    Performer.Debug('Performer.Loop (back)', 'function');
                    toshow = nowshowing - 1;
                    if (toshow < 0) toshow = (Performer.children(Performer.$(loop)).length - 1);
                } else if (Performer.hasClassName(el, 'looperforward')) {
                    Performer.Debug('Performer.Loop (forward)', 'function');
                    toshow = nowshowing + 1;
                    if (toshow >= Performer.children(Performer.$(loop)).length) toshow = 0;
                } else if (Performer.hasClassName(el, 'looperfirst')) {
                    Performer.Debug('Performer.Loop (first)', 'function');
                    toshow = 0;
                } else if (Performer.hasClassName(el, 'looperlast')) {
                    Performer.Debug('Performer.Loop (last)', 'function');
                    toshow = Performer.children(Performer.$(loop)).length - 1;
                }
                Performer.Debug('- Showing item ' + toshow, 'subfunction');
                Performer.Show(Performer.children(Performer.$(loop))[toshow], "fadein");
                Performer.stopEvent(e);
            }
        }
    },
    // show a tooltip when an element has mouseover or focus
    Tooltip: function(e, cssClass) {
        var el = Performer.eventElement(e);
        if (!cssClass) cssClass = "performertooltip";
        var id = Performer.identify(el);
        if (el && Performer.nodeName(el) && !Performer.$(id + '_performertooltip')) {
            var cls = Performer.classNames(el);
            var text = false;
            var originaltext = "";
            if (Performer.getAttribute(el, "title") && Performer.getAttribute(el, "title") != "") {
                originaltext = Performer.getAttribute(el, "title");
                text = '<p>' + originaltext.replace(/\r/g, "<br />\n") + '</p>';
            } else {
                var targetEl = Performer.$(Performer.classParam(cls, "targetEl", false));
                if (targetEl) text = targetEl.innerHTML;
            }
            var position = false;
            // if this is a mouseover event, get the mouse position
            if (e.type == 'mouseover') {
                position = Performer.cursorPosition(e);
            } else {
                position = Performer.elementPosition(el);
                position[1] = position[1] + el.offsetHeight;
            }
            if (position && text) {
                var className = Performer.classParam(cls, "className", cssClass);
                var width = Performer.classParam(cls, "width", 300);
                var leftoffset = position[0] - (width / 2);
                var topoffset = position[1] + 16;
                if (leftoffset < 0) {
                    leftoffset = 25;
                }
                if (document.body.scrollWidth && ((leftoffset + width) > document.body.scrollWidth)) {
                    leftoffset = (document.body.scrollWidth - width - 25);
                }
                Performer.setAttribute(el, "title", "");
                Performer.setAttribute(el, "temptitle", originaltext);
                if (Performer.getAttribute(el, "alt")) {
                    Performer.setAttribute(el, "tempalt", originaltext);
                    Performer.setAttribute(el, "alt", "");
                }
                var parent = Performer.up(el, "");
                if (parent.getAttribute("title")) {
                    Performer.setAttribute(parent, "temptitle", originaltext);
                    Performer.setAttribute(parent, "title", "");
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
                Performer.bind(el, 'mouseout', Performer.HideTooltip);
                Performer.bind(el, 'blur', Performer.HideTooltip);
                document.getElementsByTagName('body')[0].appendChild(tooltip);
            }
        }
    },
    // hide a tooltip
    HideTooltip: function(e) {
        var el = Performer.eventElement(e);
        var id = Performer.identify(el);
        if (el && Performer.$(id + '_performertooltip')) {
            Performer.remove(Performer.$(id + '_performertooltip'));
            var originaltext = Performer.getAttribute(el, "temptitle");
            Performer.setAttribute(el, "title", originaltext);
            Performer.removeAttribute(el, "temptitle");
            if (Performer.getAttribute(el, "tempalt")) {
                Performer.setAttribute(el, "alt", originaltext);
                Performer.removeAttribute(el, "tempalt");
            }
            var parent = Performer.up(el, "");
            if (parent.getAttribute("temptitle")) {
                Performer.setAttribute(parent, "title", originaltext);
                Performer.removeAttribute(parent, "temptitle");
            }
        }
    },
    // show a modal window
    ModalWindow: function(e) {
        var el = Performer.eventElement(e);
        if (el) {
            var id = Performer.identify(el);
            var cls = Performer.classNames(el);
            var outerClassName = Performer.classParam(cls, 'outerClassName', 'performermodalouter');
            var innerClassName = Performer.classParam(cls, 'innerClassName', 'performermodalinner');
            var lightBox = Performer.classParam(cls, 'lightBox', true);
            var closer = Performer.classParam(cls, 'closer', true);
            var targetPage = Performer.classParam(cls, 'targetPage', false);
            var horizontalPadding = Performer.classParam(cls, 'horizontalPadding', 100);
            var verticalPadding = Performer.classParam(cls, 'verticalPadding', 100);
            var screenDim = Performer.classParam(cls, 'screenDim', 6);
            if (Performer.createModal(targetPage, lightBox, screenDim, outerClassName, innerClassName, horizontalPadding, verticalPadding, closer)) {
                Performer.addClassName(Performer.$('performer_modal'), 'performerloading');
                Performer.DoLoad(targetPage, 'performer_modal', 'get', 'fillandinit');
                Performer.stopEvent(e);
            }
        }
    },
    // create a modal window
    createModal: function(targetPage, lightBox, screenDim, outerClassName, innerClassName, horizontalPadding, verticalPadding, closer) {
        if (targetPage && !Performer.$('performer_modal')) {
            // if showing a lightbox, dim the page
            if (lightBox) {
                var lightbox = document.createElement('div');
                lightbox.className = outerClassName;
                lightbox.style.zIndex = 100000;
                lightbox.style.position = 'fixed';
                lightbox.style.left = '0px';
                lightbox.style.right = '0px';
                lightbox.style.bottom = '0px';
                lightbox.style.top = '0px';
                lightbox.style.opacity = '0.' + screenDim;
                lightbox.style.filter = 'alpha(opacity=' + screenDim + '0)';
                lightbox.id = 'performer_modal_outer';
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
                document.getElementsByTagName('body')[0].appendChild(lightbox);
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
                Performer.bind(Performer.$$('a.modalwindowcloser')[0], 'keypress', Performer.CloseModal);
                Performer.bind(Performer.$$('a.modalwindowcloser')[0], 'click', Performer.CloseModal);
            }
            // add the listener for the escape key to close the modal window
            Performer.bind(document, 'keyup', Performer.CloseModal);
        }
        return true;
    },
    // close a modal window
    CloseModal: function(e) {
        var el = Performer.eventElement(e);
        if ((e.type == 'keyup' && Performer.keyCode(e) == 27) || (el && Performer.hasClassName(el, 'modalwindowcloser'))) {
            if (Performer.$('performer_modal_outer')) document.getElementsByTagName('body')[0].removeChild(Performer.$('performer_modal_outer'));
            if (Performer.$('performer_modal_closer')) document.getElementsByTagName('body')[0].removeChild(Performer.$('performer_modal_closer'));
            if (Performer.$('performer_modal')) document.getElementsByTagName('body')[0].removeChild(Performer.$('performer_modal'));
            Performer.stopEvent(e);
        }
    },
    // hide the remainder of an element contents after a certain number of characters
    // inspired by http://www.reindel.com/truncate/
    Truncate: function(el) {
        // get the class parameters
        var cls = Performer.classNames(el);
        var limit = Performer.classParam(cls, 'limit', 50);
        var openText = Performer.classParam(cls, 'openText', '...more');
        var closeText = Performer.classParam(cls, 'closeText', '...less');
        if (el && limit) {
            var c = el.innerHTML;
            var l = c.length;
            if (limit < l) {
                var id = Performer.identify(el);
                el.innerHTML = '<span id="' + id + '_truncated">' + c.substring(0, limit) + ' <a href="#" class="switcher targetEl1-' + id + '_truncated targetEl2-' + id + '_full">' + openText + '</a></span><span class="hider" id="' + id + '_full">' + c + ' <a href="#" class="switcher targetEl1-' + id + '_truncated targetEl2-' + id + '_full">' + closeText + '</a></span>';
                Performer.ReInit(id);
            }
        }
    },
    // duplicates an element
    Duplicate: function(e) {
        var el = Performer.eventElement(e);
        // get the class parameters
        var cls = Performer.classNames(el);
        var sourceEl = Performer.classParam(cls, "sourceElement", false);
        var sourceElement = Performer.$(sourceEl);
        var targetEl = Performer.classParam(cls, "targetElement", false);
        var targetElement = Performer.$(targetEl);
        // if the parameters are set
        if (el && Performer.nodeName(el) && sourceElement && Performer.nodeName(sourceElement) && targetElement && Performer.nodeName(targetElement)) {
            targetElement.innerHTML = targetElement.innerHTML + '\n';
            var newel = targetElement.appendChild(sourceElement.cloneNode(true));
            if (typeof (Performer.Duplicators[targetEl]) === 'undefined') {
                Performer.Duplicators[targetEl] = 1;
            }
            var items = Performer.Duplicators[targetEl] + 1;
            Performer.Duplicators[targetEl] = items;
            newel.innerHTML = newel.innerHTML.replace(/_1/g, '_' + items);
            newel.innerHTML = newel.innerHTML.replace(/[1]/g, items);
            newel.id = newel.id.replace(/_1/g, '_' + items);
            if (Performer.getAttribute(newel, 'class') != '') {
                Performer.setAttribute(newel, 'class', Performer.getAttribute(newel, 'class').replace(/_1/g, '_' + items));
            }
            var countEl = Performer.classParam(cls, "countElement", false);
            var countElement = Performer.$(countEl);
            if (countElement) Performer.setValue(countElement, items);
            Performer.stopEvent(e);
        }
    },
    // disables all submit buttons when a form is submitted
    SubmitLock: function(e) {
        var el = Performer.findEventElement(e, 'FORM');
        if (el) {
            // get unique fields in the form
            var fields = Performer.$F(el);
            Performer.forEach(fields, function(input) {
                var field = Performer.$(Performer.identify(input));
                if (field.type.toLowerCase() == 'submit') {
                    field.disabled = true;
                    Performer.addClassName(field, 'performer-disabled');
                }
            });
        }
    },
    // submits a form to a page and fills an element with the results
    Submit: function(e) {
        var el = Performer.findEventElement(e, 'FORM');
        // get the class parameters
        var cls = Performer.classNames(el);
        var targetPage = Performer.classParam(cls, "targetPage", false);
        var targetEl = Performer.classParam(cls, "targetEl", Performer.classParam(cls, "targetElement", false));
        var targetElement = Performer.$(targetEl);
        // if the parameters are set
        if (targetPage && el && Performer.nodeName(el) && targetElement && Performer.nodeName(targetElement)) {
            var params = Performer.serialize(el);
            Performer.addClassName(targetElement, 'performerloading');
            Performer.Request(targetPage, 'POST', params, function(request) {
                var text = Performer.getRequestText(request);
                Performer.update(targetElement, text);
                Performer.removeClassName(targetElement, 'performerloading');
                Performer.Debug('-> Filled \'#' + targetEl + '\'', 'success');
            });
            Performer.stopEvent(e);
        }
    },
    // checks the values of fields in a form
    CheckForm: function(e) {
        Performer.Debug('Performer.CheckForm', 'function');
        var el = Performer.findEventElement(e, 'FORM');
        var fail = false;
        var radiogroups = new Array();
        // get unique fields in the form
        var fields = Performer.$F(el);
        Performer.forEach(fields, function(input) {
            var identity = Performer.identify(input);
            var field = Performer.$(identity);
            // field is required
            if (Performer.hasClassName(field, 'field-required')) {
                if (field.type != 'radio' &&
				((field.type == 'checkbox' && field.checked == false) || field.value == "")) {
                    Performer.FieldNotify(identity, 'error', 'This field is required');
                    fail = true;
                } else { Performer.FieldNotifyRemove(identity); }
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
                        Performer.FieldNotify(lastbutton, 'error', 'This field is required');
                        fail = true;
                    } else { Performer.FieldNotifyRemove(lastbutton); }
                }
            }
            // field must be an email address
            if (Performer.hasClassName(field, 'field-required-email') || Performer.hasClassName(field, 'field-optional-email')) {
                var validemail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if ((Performer.hasClassName(field, 'field-required-email') && Performer.getValue(field) == "") || (Performer.getValue(field) != "" && !validemail.test(Performer.getValue(field)))) {
                    Performer.FieldNotify(identity, 'error', 'This field must be a valid email address');
                    fail = true;
                } else { Performer.FieldNotifyRemove(identity); }
            }
            // field must be a number
            if (Performer.hasClassName(field, 'field-required-number') || Performer.hasClassName(field, 'field-optional-number')) {
                var num = Performer.getValue(field).replace(",", "").replace("&pound;", "").replace("£", "");
                if ((Performer.hasClassName(field, 'field-required-number') && num == "") || (num != "" && isNaN(parseFloat(num)))) {
                    Performer.FieldNotify(identity, 'error', 'This field must be a number');
                    fail = true;
                } else {
                    // set the correct number value
                    if (num != "") { field.value = parseFloat(num); }
                    Performer.FieldNotifyRemove(identity);
                }
            }
            // field must be a date (dd/mm/yyyy)
            if (Performer.hasClassName(field, 'field-required-date') || Performer.hasClassName(field, 'field-optional-date')) {
                var validdate = /^([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4})$/;
                if ((Performer.hasClassName(field, 'field-required-date') && Performer.getValue(field) == "") || (Performer.getValue(field) != "" && !validdate.test(Performer.getValue(field)))) {
                    Performer.FieldNotify(identity, 'error', 'This field must be a date (dd/mm/yyyy)');
                    fail = true;
                } else { Performer.FieldNotifyRemove(identity); }
            }
            Performer.Debug('-> Field ' + input.name, 'subfunction');
        });
        if (fail) {
            Performer.FieldNotify(Performer.identify(el), 'error', 'There are errors with some fields. Please check the form and try again.');
            Performer.stopEvent(e);
        }
    },
    // adds a notification to a field
    FieldNotify: function(field, messageclass, message) {
        if (!Performer.$(field + '-notification')) {
            Performer.insertAfter(Performer.$(field), '<span id="' + field + '-notification" class="performer-' + messageclass + '">' + message + '</span>');
        } else {
            Performer.$(field + '-notification').innerHTML = message;
            Performer.$(field + '-notification').className = 'performer-' + messageclass;
        }
    },
    // remove a field notification
    FieldNotifyRemove: function(field) {
        if (Performer.$(field + '-notification')) {
            Performer.$(field + '-notification').innerHTML = "";
            Performer.$(field + '-notification').className = "";
        }
    },
    // send a list selection to a remote page
    Select: function(e) {
        Performer.Debug('Performer.Select', 'function');
        var el = Performer.eventElement(e);
        // check the element has the required attributes
        if (el && Performer.nodeName(el) && Performer.getAttribute(el, 'id') && Performer.getAttribute(el, 'name') && Performer.getAttribute(el, 'class')) {
            // get the class parameters
            var cls = Performer.classNames(el);
            var targetPage = Performer.classParam(cls, "targetPage", false);
            var targetEl = Performer.$(Performer.classParam(cls, "targetEl", false));
            var targetValue = Performer.classParam(cls, "targetValue", false);
            // check we have a targetPage and targetEl and the target element can be found
            if (targetPage && targetEl) {
                if (targetValue == 'true') {
                    Performer.DoLoad(targetPage + '?selection=' + Performer.getValue(el), targetEl, 'post', 'setvalueandinit');
                } else {
                    Performer.DoLoad(targetPage + '?selection=' + Performer.getValue(el), targetEl, 'post', 'fillandinit');
                }
            }
        }
    },
    // check the strength of a password
    CheckPassword: function(e) {
        Performer.Debug('Performer.CheckPassword', 'function');
        var el = Performer.eventElement(e);
        // check the element has the required attributes
        if (el && Performer.nodeName(el) && Performer.getAttribute(el, 'id') && Performer.getAttribute(el, 'name') && Performer.getAttribute(el, 'class')) {
            // get the class parameters
            var cls = Performer.classNames(el);
            var notifyEl = Performer.$(Performer.classParam(cls, "notifyEl", false));
            // check we have a notification element
            if (notifyEl) {
                Performer.Show(notifyEl);
                var val = el.value;
                // if the password is shorter than 6 characters
                if (val.length < 6) {
                    Performer.update(notifyEl, 'Your password must be at least 6 characters long');
                    Performer.className(notifyEl, 'password-weak');
                    // if the password has only letters
                } else {
                    Performer.update(notifyEl, '');
                    // if the password is just letters or just numbers less than 10 characters
                    if (val.match(/^([a-zA-Z]{6,10})$/) || val.match(/^([0-9]{6,10})$/)) {
                        Performer.update(notifyEl, 'Weak password');
                        Performer.className(notifyEl, 'password-weak');
                        // if the password is just letters or just numbers more than 10 characters
                    } else if (val.match(/^([a-zA-Z]{10,})$/) || val.match(/^([0-9]{10,})$/)) {
                        Performer.update(notifyEl, 'Acceptable password');
                        Performer.className(notifyEl, 'password-ok');
                        // if the password contains letters, numbers and characters it is strong
                    } else if (val.match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[^0-9a-zA-Z]).*$/)) {
                        Performer.update(notifyEl, 'Strong password');
                        Performer.className(notifyEl, 'password-strong');
                        // if the password has just letters and numbers, or just letters and characters, or just numbers and characters
                    } else if (val.match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/) || val.match(/^.*(?=.{6,})(?=.*[^0-9a-zA-Z])(?=.*[a-z]).*$/) || val.match(/^.*(?=.{6,})(?=.*[^0-9a-zA-Z])(?=.*\d).*$/)) {
                        Performer.update(notifyEl, 'Acceptable password');
                        Performer.className(notifyEl, 'password-ok');
                    }
                }
            }
        }
    },
    // match the values of two input boxes
    Match: function(e) {
        Performer.Debug('Performer.Match', 'function');
        var el = Performer.eventElement(e);
        // check the element has the required attributes
        if (el && Performer.nodeName(el) && Performer.getAttribute(el, 'id') && Performer.getAttribute(el, 'name') && Performer.getAttribute(el, 'class')) {
            // get the class parameters
            var cls = Performer.classNames(el);
            var notifyEl = Performer.$(Performer.classParam(cls, "notifyEl", false));
            var matchEl = Performer.$(Performer.classParam(cls, "matchEl", false));
            // check we have a match element and a notification element
            if (notifyEl && matchEl) {
                // show the notifyEl
                Performer.Show(notifyEl);
                // get the value
                var val1 = el.value;
                // get the value to be matched
                var val2 = matchEl.value;
                // if the values match
                if (val1 == val2) {
                    // hide the notifyEl
                    Performer.Hide(notifyEl);
                }
            }
        }
    },
    // toggle element
    Toggle: function(e, c) {
        // reset the hash
        Performer.Hash = '';
        r = false;
        var el = Performer.eventElement(e);
        if (!el) el = Performer.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigger
        if (el && Performer.nodeName(el) && (e.type == 'click' || Performer.keyCode(e) == 13 || Performer.keyCode(e) == 32)) {
            var cls = Performer.classNames(el);
            var showeffect = Performer.classParam(cls, 'showeffect', 'slidedown');
            var hideeffect = Performer.classParam(cls, 'hideeffect', 'slideup');
            var toggleid = Performer.classParam(cls, 'targetEl', Performer.getAttribute(el, 'rel'));
            var targetEl = Performer.$(toggleid);
            // check the target element can be found
            if (targetEl && Performer.nodeName(targetEl)) {
                // toggle the visibility
                if (!Performer.visible(targetEl)) {
                    if (toggleid != 'performerjsdebugbox') Performer.Debug('Performer.Toggle -> Show \'#' + toggleid + '\'', 'subfunction');
                    Performer.addClassName(el, 'toggleropen');
                    Performer.Show(targetEl, showeffect);
                    Performer.forEach(Performer.ancestors(Performer.$(targetEl)), function(ancestor) {
                        if (ancestor.tagName != 'body' && ancestor.tagName != 'html' && Performer.nodeName(ancestor) && !Performer.visible(ancestor)) {
                            Performer.Show(ancestor);
                        }
                    });
                    r = true;
                } else {
                    if (toggleid != 'performerjsdebugbox') Performer.Debug('Performer.Toggle -> Hide \'#' + toggleid + '\'', 'subfunction');
                    Performer.removeClassName(el, 'toggleropen');
                    Performer.Hide(targetEl, hideeffect);
                    r = false;
                }
                if (Performer.nodeName(el).toLowerCase() == 'a') Performer.stopEvent(e);
            }
        }
    },
    // toggles the visibility of a group of elements
    GroupToggle: function(e, c) {
        r = false;
        var el = Performer.eventElement(e);
        if (!el) el = Performer.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigger
        if (el && Performer.nodeName(el) && (e.type == 'click' || Performer.keyCode(e) == 13 || Performer.keyCode(e) == 32)) {
            var cls = Performer.classNames(el);
            var targetClass = Performer.classParam(cls, 'targetClass', Performer.getAttribute(el, 'rel'));
            var foundEls = Performer.$$('.' + targetClass);
            Performer.Debug('Performer.GroupToggle -> Toggle ' + foundEls.length + ' elements with class ' + targetClass, 'subfunction');
            Performer.forEach(foundEls, function(element) {
                // toggle the visibility
                if (!Performer.visible(element)) {
                    Performer.addClassName(element, 'toggleropen');
                    Performer.Show(element);
                    r = true;
                } else {
                    Performer.removeClassName(element, 'toggleropen');
                    Performer.Hide(element);
                    r = false;
                }
            });
            if (!c && Performer.nodeName(el).toLowerCase() == 'a') Performer.stopEvent(e);
        }
    },
    // switch visibility of two element
    Switch: function(e, c) {
        Performer.Debug('Performer.Switch', 'function');
        r = false;
        var el = Performer.eventElement(e);
        if (!el) el = Performer.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigger
        if (el && Performer.nodeName(el) && (e.type == 'click' || e.keyCode == Performer.keyCode(e) == 13)) {
            var cls = Performer.classNames(el);
            var t1 = Performer.classParam(cls, 'targetEl1', Performer.getAttribute(el, 'rel'));
            var targetEl1 = Performer.$(t1);
            var t2 = Performer.classParam(cls, 'targetEl2', Performer.getAttribute(el, 'rev'));
            var targetEl2 = Performer.$(t2);
            // check the target elements can be found
            if (targetEl1 && targetEl2) {
                // toggle the visibility
                if (!Performer.visible(targetEl1)) {
                    Performer.Debug('-> Show \'#' + t1 + '\', hide \'#' + t2 + '\'', 'subfunction');
                    Performer.Show(targetEl1);
                    Performer.Hide(targetEl2);
                    r = true;
                } else {
                    Performer.Debug('-> Show \'#' + t2 + '\', hide \'#' + t1 + '\'', 'subfunction');
                    Performer.Show(targetEl2);
                    Performer.Hide(targetEl1);
                    r = false;
                }
            }
            if (!c && Performer.nodeName(el).toLowerCase() == 'a') Performer.stopEvent(e);
        }
        return r;
    },
    // focus the element
    Focus: function(e) {
        Performer.Debug('Performer.Focus', 'function');
        var el = Performer.$(e);
        if (el && Performer.nodeName(el)) {
            Performer.Debug('-> Focus on \'#' + Performer.identify(el) + '\'', 'subfunction');
            Performer.$(el).focus();
        }
    },
    // style an element
    Style: function(e) {
        Performer.Debug('Performer.Style', 'function');
        var el = Performer.findEventElement(e, 'a');
        // check the element has the required attribute and is a valid event trigger
        if (el && Performer.nodeName(el) && (e.type == 'click' || Performer.keyCode(e) == 13)) {
            var targetEl = Performer.$(Performer.classParam(cls, 'targetEl', Performer.getAttribute(el, 'rel')));
            // check the target element can be found
            if (targetEl) {
                // set the new style
                var cls = Performer.classNames(el);
                var cssstyle = Performer.classParam(cls, "style", "");
                targetEl.className = cssstyle;
                Performer.stopEvent(e);
            }
        }
    },
    // resize an element
    Size: function(e) {
        Performer.Debug('Performer.Size', 'function');
        var el = Performer.findEventElement(e, 'a');
        // check the element has the required attribute and is a valid event trigger
        if (el && Performer.nodeName(el) && (e.type == 'click' || Performer.keyCode(e) == 13)) {
            var cls = Performer.classNames(el);
            var targetEl = Performer.$(Performer.classParam(cls, 'targetEl', Performer.getAttribute(el, 'rel')));
            // check the target element can be found
            if (targetEl) {
                // get the new size
                var sizes = Performer.classParam(cls, 'sizes', Performer.getAttribute(el, 'rev'));
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
                var dimensions = Performer.getDimensions(targetEl);
                var currentHeight = dimensions.height;
                var currentWidth = dimensions.width;
                // calculate the new dimensions and resize the element
                if (height != 0) {
                    var newHeight = (parseFloat(height) + parseFloat(currentHeight)) + 'px';
                    Performer.Debug('-> Change height of \'#' + Performer.identify(targetEl) + '\' to ' + newHeight, 'subfunction');
                    Performer.setStyle(targetEl, { height: newHeight });
                }
                if (width != 0) {
                    var newWidth = (parseFloat(width) + parseFloat(currentWidth)) + 'px';
                    Performer.Debug('-> Change width of \'#' + Performer.identify(targetEl) + '\' to ' + newWidth, 'subfunction');
                    Performer.setStyle(targetEl, { width: newWidth });
                }
                Performer.stopEvent(e);
            }
        }
    },
    // resize a textarea element when the cursor hits the bottom of the element
    Resize: function(e) {
        Performer.Debug('Performer.Resize', 'function');
        var el = Performer.eventElement(e);
        // check the element has the required attribute and is a valid event trigger
        if (el && Performer.nodeName(el)) {
            var cls = Performer.classNames(el);
            var m = Performer.classParam(cls, 'maxHeight', 500);
            var s = el.scrollHeight;
            var d = Performer.getDimensions(el);
            var h = d.height;
            if ((s + 5) > h && h < m) {
                el.style.height = (s + 10) + 'px';
            }
        }
    },
    // toggle an element and load data
    ToggleLoad: function(e) {
        Performer.Debug('Performer.ToggleLoad', 'function');
        var el = Performer.eventElement(e);
        var cls = Performer.classNames(el);
        var targetEl = Performer.classParam(cls, 'targetEl', Performer.getAttribute(el, 'rel'));
        var targetPage = Performer.classParam(cls, 'targetPage', Performer.getAttribute(el, 'rev'));
        // check the element has the required attribute and is a valid event trigger
        if (el && Performer.nodeName(el) && targetEl && targetPage && (e.type == 'click' || Performer.keyCode(e) == 13)) {
            if (Performer.Toggle(e)) {
                Performer.Debug('-> Loading content into \'#' + targetEl + '\'', 'subfunction');
                Performer.Load(e, true, false);
            }
            Performer.stopEvent(e);
        }
    },
    // initialise tabs
    InitTabs: function(el) {
        var elid = Performer.identify(el);
        el = Performer.$(Performer.identify(el));
        // if this is the tab in the hash, show it
        if (Performer.Hash == elid) {
            Performer.addClassName(Performer.getElementsByAttribute('a', 'rev', elid)[0], 'tabbercurrent');
            Performer.removeClassName(el, 'hider');
            Performer.Show(el);
        }
        // if this is not the tab in the hash, and it is set to be shown, hide it
        if (!Performer.hasClassName(el, 'hider') && Performer.Hash != '' && Performer.Hash != elid) {
            Performer.removeClassName(Performer.getElementsByAttribute('a', 'rev', elid)[0], 'tabbercurrent');
            Performer.addClassName(el, 'hider');
            Performer.Hide(el);
        }
    },
    // toggle tabs
    Tab: function(e) {
        Performer.Debug('Performer.Tab', 'function');
        // reset the hash
        Performer.Hash = '';
        var el = Performer.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigger
        if (el && Performer.nodeName(el) && (e.type == 'click' || Performer.keyCode(e) == 13)) {
            var cls = Performer.classNames(el);
            var tabGroup = Performer.classParam(cls, 'tabGroup', Performer.getAttribute(el, 'rel'));
            // check the tabgroup can be found
            if (tabGroup && Performer.$(tabGroup)) {
                var otab = Performer.classParam(cls, 'tab', Performer.getAttribute(el, 'rev'));
                var openTab = Performer.$(otab);
                var tablinks = Performer.$$('.tabber');
                for (var i = 0; i < tablinks.length; i++) {
                    if (Performer.hasClassName(tablinks[i], 'tabGroup-' + tabGroup) || Performer.getAttribute(el, 'rel') == tabGroup) {
                        Performer.removeClassName(tablinks[i], 'tabbercurrent');
                    }
                }
                // hide all the tabs
                var tabs = Performer.$$('#' + tabGroup + ' .tab');
                for (var i = 0; i < tabs.length; i++) {
                    Performer.Hide(tabs[i]);
                }
                Performer.addClassName(el, 'tabbercurrent');
                // show the required tab
                Performer.Debug('-> Showing tab \'#' + otab + '\'', 'subfunction');
                Performer.Show(openTab, 'fadein');
                Performer.stopEvent(e);
            }
        }
    },
    // toggle an accordian element
    Accordian: function(e) {
        Performer.Debug('Performer.Accordian', 'function');
        // reset the hash
        Performer.Hash = '';
        var el = Performer.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigger
        if (el && Performer.nodeName(el) && (e.type == 'click' || Performer.keyCode(e) == 13)) {
            var cls = Performer.classNames(el);
            var accordianGroup = Performer.classParam(cls, "group", false);
            // check the accordian group can be found
            if (Performer.$(accordianGroup)) {
                var groupcls = Performer.classNames(el);
                var oitem = Performer.classParam(cls, "item", false);
                var openItem = Performer.$(oitem);
                var accordianlinks = Performer.$$('.accordianer');
                for (var i = 0; i < accordianlinks.length; i++) {
                    if (Performer.getAttribute(accordianlinks[i], 'rel') == accordianGroup)
                        Performer.removeClassName(accordianlinks[i], 'accordiancurrent');
                }
                // hide all the accordian items
                var accordianitems = Performer.$$('#' + accordianGroup + ' .accordianitem');
                for (var i = 0; i < accordianitems.length; i++) {
                    Performer.Hide(accordianitems[i]);
                }
                Performer.addClassName(el, 'accordiancurrent');
                // show the required accordian item
                Performer.Debug('-> Showing accordianitem \'#' + oitem + '\'', 'subfunction');
                Performer.Show(openItem, 'slidedown');
                Performer.stopEvent(e);
            }
        }
    },
    // load data into an element
    Load: function(e, c, s) {
        Performer.Debug('Performer.Load', 'function');
        var el = Performer.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigger
        if (el && Performer.nodeName(el) && (e.type == 'click' || Performer.keyCode(e) == 13)) {
            var cls = Performer.classNames(el);
            var targetEl = Performer.classParam(cls, 'targetEl', Performer.getAttribute(el, 'rel'));
            var rel = Performer.$(targetEl);
            var targetPage = Performer.classParam(cls, 'targetPage', Performer.getAttribute(el, 'rev'));
            // check the target element can be found
            if (targetEl && rel && Performer.nodeName(rel)) {
                Performer.Debug('-> Loading content into \'#' + targetEl + '\'', 'subfunction');
                if (!s) {
                    Performer.DoLoad(targetPage, targetEl, 'get', 'fillandinit');
                } else {
                    Performer.DoLoad(targetPage, targetEl, 'get', 'fill');
                }
            }
            if (!c) Performer.stopEvent(e);
        }
    },
    // delete an element
    Delete: function(e) {
        Performer.Debug('Performer.Delete', 'function');
        var el = Performer.findEventElement(e, 'A');
        // check the element has the required attribute and is a valid event trigger
        if (el && Performer.nodeName(el) && (e.type == 'click' || Performer.keyCode(e) == 13)) {
            var cls = Performer.classNames(el);
            var targetEl = Performer.classParam(cls, 'targetEl', Performer.getAttribute(el, 'rel'));
            var rel = Performer.$(targetEl);
            var targetPage = Performer.classParam(cls, 'targetPage', Performer.getAttribute(el, 'rev'));
            var confirmDelete = Performer.classParam(cls, "confirmDelete", false);
            // check the target element can be found
            if (targetEl && rel && Performer.nodeName(rel)) {
                Performer.Debug('-> Deleting \'#' + targetEl + '\'', 'subfunction');
                if ((confirmDelete && Performer.getAttribute(el, 'title') && confirm(Performer.getAttribute(el, 'title') + ' - are you sure?')) || !confirmDelete) {
                    Performer.DoLoad(targetPage, targetEl, 'get', 'deleteandreplace');
                }
            }
            Performer.stopEvent(e);
        }
    },
    // load some data
    DoLoad: function(targetPage, targetElement, requestMethod, onCompleteFunction) {
        Performer.Debug('Performer.DoLoad(' + targetPage + ' -> #' + targetElement + ')', 'function');
        var target = Performer.$(targetElement);
        if (targetPage && targetElement && target && Performer.nodeName(target)) {
            Performer.addClassName(Performer.$(targetElement), 'performerloading');
            Performer.Request(targetPage, requestMethod, '', function(request) {
                var text = Performer.getRequestText(request);
                if (onCompleteFunction == 'fill') {
                    Performer.$(targetElement).innerHTML = text;
                    Performer.removeClassName(Performer.$(targetElement), 'performerloading');
                    Performer.Debug('-> Filled \'#' + targetElement + '\'', 'success');
                }
                if (onCompleteFunction == 'fillandinit') {
                    Performer.$(targetElement).innerHTML = text;
                    Performer.removeClassName(Performer.$(targetElement), 'performerloading');
                    Performer.Debug('-> Filled \'#' + targetElement + '\'', 'success');
                    Performer.ReInit('#' + targetElement);
                }
                if (onCompleteFunction == 'deleteandreplace') {
                    Performer.insertAfter(Performer.$(targetElement), text);
                    Performer.remove(Performer.$(targetElement));
                }
                if (onCompleteFunction == 'setvalue') {
                    Performer.$(targetElement).value = text;
                    Performer.removeClassName(Performer.$(targetElement), 'performerloading');
                    Performer.Debug('-> Value set \'#' + targetElement + '\'', 'success');
                }
                if (onCompleteFunction == 'setvalueandinit') {
                    Performer.$(targetElement).value = text;
                    Performer.removeClassName(Performer.$(targetElement), 'performerloading');
                    Performer.Debug('-> Set value \'#' + targetElement + '\'', 'success');
                    Performer.ReInit('#' + targetElement);
                }
            });
        }
    },
    // load data into an element on a regular basis
    Reload: function(e) {
        var el = Performer.$(e);
        var elid = Performer.identify(el);
        // check this reloader isn't already initialised
        if (Performer.Reloaders.PerformerIndexOf(elid) == -1) {
            // get the class parameters
            var cls = Performer.classNames(el);
            var delay = Performer.classParam(cls, "delay", 0);
            var targetPage = Performer.classParam(cls, "targetPage", false);
            if (delay == 0) { delay = 600; }
            // check the element has the required attributes
            if (el && Performer.nodeName(el) && delay && targetPage) {
                Performer.Reloaders[Performer.Reloaders.length] = elid;
                Performer.Debug('Performer.Reload -> Added \'#' + elid + '\' to Performer.Reloaders (now ' + Performer.Reloaders.length + ' items): ' + delay + ' seconds', 'subfunction');
                Performer.DoLoad(targetPage, elid, 'get', 'fillandinit');
                var func = function() {
                    var d = new Date();
                    var t = d.getTime();
                    if (targetPage.indexOf('?') != -1) { t = '&' + t; } else { t = '?' + t; }
                    Performer.DoLoad(targetPage + t, elid, 'get', 'fillandinit');
                }
                window.setInterval(func, delay * 1000);
            }
        }
    },
    // load data into an element when the page loads
    Preload: function(e) {
        Performer.Debug('Performer.Preload', 'function');
        var el = Performer.$(e);
        // get the class parameters
        var cls = Performer.classNames(el);
        var targetPage = Performer.classParam(cls, "targetPage", false);
        // check the element has the required attributes
        if (el && Performer.nodeName(el) && targetPage) {
            var elid = Performer.identify(el);
            Performer.Debug('-> Loading content into \'#' + elid + '\'', 'subfunction');
            Performer.DoLoad(targetPage, elid, 'get', 'fillandinit');
        }
    },
    // hide a hider element
    Hide: function(el, effect) {
        var elid = Performer.identify(el);
        if (el && Performer.nodeName(el)) {
            if (Performer.Hash != elid) {
                Performer.Debug('Performer.Hide -> Hiding \'#' + elid + '\' (effect: ' + effect + ')', 'subfunction');
                Performer.doHide(el, effect);
                if (!Performer.hasClassName(el, 'hider')) { Performer.addClassName(el, 'hider'); }
                if (Performer.hasClassName(el, 'shower')) { Performer.removeClassName(el, 'shower'); }
            } else {
                Performer.removeClassName(el, 'hider');
            }
        } else {
            Performer.Debug('Performer.Hide -> Could not hide \'#' + elid + '\'', 'subfunction');
        }
    },
    // show a shower element
    Show: function(el, effect) {
        var elid = Performer.identify(el);
        if (el && Performer.nodeName(el)) {
            Performer.doShow(el, effect);
            if (Performer.hasClassName(el, 'hider')) { Performer.removeClassName(el, 'hider'); }
            if (Performer.hasClassName(el, 'shower')) { Performer.removeClassName(el, 'shower'); }
            Performer.Debug('Performer.Show -> Showing \'#' + elid + '\' (effect: ' + effect + ')', 'subfunction');
        } else {
            Performer.Debug('Performer.Show -> Could not show \'#' + elid + '\'', 'subfunction');
        }
    },
    // limit the amount of text in an input box or textarea
    Limit: function(e) {
        Performer.Debug('Performer.Limit', 'function');
        var el = Performer.eventElement(e);
        // get the class parameters
        var cls = Performer.classNames(el);
        var lengthLimit = Performer.classParam(cls, "lengthLimit", false);
        var targetEl = Performer.$(Performer.classParam(cls, "targetEl", false));
        if (el && lengthLimit && targetEl) {
            var currentLength = Performer.getValue(el).length;
            // limit the length
            if (parseFloat(currentLength) >= parseFloat(lengthLimit)) {
                Performer.$(el).value = Performer.getValue(el).substr(0, lengthLimit);
                Performer.update(targetEl, "Limit reached");
                // if this is a character key, stop it being entered
                var key = Performer.keyCode(e) || e.code;
                if (key != 8 && key != 46 && key != 37 && key != 39) Performer.stopEvent(e);
            } else {
                Performer.update(Performer.$(targetEl), (lengthLimit - currentLength) + " characters left");

            }
        }
    },
    // show the length limit notification
    LimitNotifier: function(e) {
        Performer.Debug('Performer.LimitNotifier', 'function');
        var el = Performer.$(e);
        // check the element exists
        if (el && (Performer.nodeName(el) == 'input' || Performer.nodeName(el) == 'textarea')) {
            // get the class parameters
            var cls = Performer.classNames(el);
            var lengthLimit = Performer.classParam(cls, "lengthLimit", false);
            var targetEl = Performer.$(Performer.classParam(cls, "targetEl", false));
            // check this doesn't have prompt text in
            if (!Performer.hasClassName(el, 'prompter') && lengthLimit && targetEl) {
                var currentLength = Performer.getValue(el).length;
                Performer.update(targetEl, (lengthLimit - currentLength) + " characters left");
            }
        }
    },
    // edit the contents of an element and send the results to a processing page
    Edit: function(e) {
        Performer.Debug('Performer.Edit', 'function');
        var el = Performer.eventElement(e);
        // check the element has the required attributes and is a valid event trigger
        if (el && Performer.nodeName(el) && Performer.getAttribute(el, 'id') && Performer.classNames(el) && (e.type == 'click' || Performer.keyCode(e) == 13)) {
            Performer.removeClassName(el, 'editor');
            var cls = Performer.classNames(el);
            var targetPage = Performer.classParam(cls, "targetPage", false);
            var targetElement = Performer.classParam(cls, "targetElement", false);
            var inputType = Performer.classParam(cls, "inputType", "input");
            var autosave = Performer.classParam(cls, "autosave", false);
            if (targetPage && inputType) {
                var id = Performer.identify(el);
                // build the editing form
                el.innerHTML = Performer.BuildEditForm(el, targetPage, inputType, targetElement, autosave);
                // remove the listeners to prevent duplication problems
                Performer.unBind(el, 'click', Performer.Edit);
                Performer.unBind(el, 'keypress', Performer.Edit);
                // get the form
                var form = Performer.$(id + '-editor');
                // if autosaving when the textbox is blurred
                if (autosave !== false) {
                    // add the event listener for when the textbox is blurred
                    Performer.bind(Performer.$(id + '-value'), 'blur', function() {
                        // get the vars
                        var vars = Performer.serialize(form);
                        Performer.addClassName(Performer.$(id + '-value'), "performerloading");
                        Performer.Request(targetPage, 'post', vars, function() {
                            Performer.HideEditForm(el, true);
                        });
                    });
                } else {
                    // catch for submit and overwrite the original value
                    Performer.bind(form, 'submit', function(e) {
                        // get the vars
                        var vars = Performer.serialize(form);
                        Performer.addClassName(form, "performerloading");
                        Performer.$(id + '-originaltext').innerHTML = Performer.$(id + '-value').value;
                        Performer.Request(targetPage, 'post', vars, function() {
                            Performer.HideEditForm(el, true);
                        });
                        Performer.stopEvent(e);
                    });
                }
                Performer.$(id + '-value').focus();
                Performer.ReInit('#' + id);
            }
        }
    },
    // build the element editing form
    BuildEditForm: function(el, targetPage, inputType, targetElement, autosave) {
        Performer.Debug('Performer.BuildEditForm(' + targetPage + ')', 'function');
        if (el && Performer.nodeName(el) && Performer.$(el) && targetPage) {
            var id = Performer.identify(el);
            var value = Performer.$(el).innerHTML;
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
                editForm += '<input type="submit" id="' + id + '-save" name="' + id + '-save" value="Save" />\n';
                editForm += '<a href=\"#\" class="uneditor targetEl-' + id + '">Cancel</a>\n';
                if (targetElement != "") {
                    editForm += '<span id="' + targetElement + '"></span>\n';
                }
            }
            editForm += '</form>\n';
            editForm += '<span style="display:none" id="' + id + '-originaltext">' + value + '</span>';
            Performer.Debug('-> Built form with action: ' + targetPage, 'function');
            return editForm;
        }
    },
    // hide an edit form and optionally set the text to the inputted value
    HideEditForm: function(el, val) {
        Performer.Debug('Performer.HideEditForm', 'function');
        var id = Performer.identify(el);
        if (val) {
            el.innerHTML = Performer.$(id + '-value').value;
        } else {
            el.innerHTML = Performer.$(id + '-originaltext').innerHTML;
        }
        Performer.bind(Performer.$(id), 'click', Performer['Edit']);
        Performer.bind(Performer.$(id), 'keypress', Performer['Edit']);
    },
    // cancel a Performer.Edit command and return the element to normal
    UnEdit: function(e) {
        Performer.Debug('Performer.UnEdit', 'function');
        var el = Performer.eventElement(e);
        if (el && Performer.nodeName(el) && (e.type == 'click' || Performer.keyCode(e) == 13)) {
            var cls = Performer.classNames(el);
            var rel = Performer.classParam(cls, 'targetEl', false);
            var targetEl = Performer.$(rel);
            if (targetEl) {
                // add the listeners
                Performer.bind(targetEl, 'click', Performer['Edit']);
                Performer.bind(targetEl, 'keypress', Performer['Edit']);
                targetEl.innerHTML = Performer.$(rel + '-originaltext').innerHTML;
                Performer.stopEvent(e);
            }
        }
    },
    // set the prompt text for a text or textarea element
    SetPrompt: function(el) {
        Performer.Debug('Performer.SetPrompt', 'function');
        var id = Performer.identify(el);
        var title = Performer.getAttribute(el, 'title');
        if (el && Performer.nodeName(el) && title && el.value == "" && (el.type == 'textarea' || el.type == 'text')) {
            Performer.Debug('-> Setting prompt: ' + title, 'function');
            Performer.addClassName(el, "performer-prompter");
            el.value = Performer.getAttribute(el, 'title');
            // find the form containing this element
            var form = Performer.up(el, 'form');
            if (form) {
                // when the form is submitted, remove the prompt
                Performer.bind(form, 'submit', function() {
                    Performer.ClearPrompt(el);
                }, false);
            }
        }
    },
    // remove a prompt
    RemovePrompt: function(e) {
        Performer.Debug('Performer.RemovePrompt', 'function');
        var el = Performer.eventElement(e);
        if (el && Performer.nodeName(el)) Performer.ClearPrompt(el);
    },
    // clear the prompt
    ClearPrompt: function(el) {
        Performer.Debug('Performer.ClearPrompt', 'function');
        var title = Performer.getAttribute(el, "title");
        if (el && Performer.nodeName(el) && title && (el.value == title) && (el.type == 'textarea' || el.type == 'text')) {
            el.value = "";
            Performer.removeClassName(el, "performer-prompter");
        }
    },
    // check a prompt is present
    CheckPrompt: function(e) {
        Performer.Debug('Performer.CheckPrompt', 'function');
        var el = Performer.eventElement(e);
        var title = Performer.getAttribute(el, "title");
        var id = Performer.identify(el);
        if (el && Performer.nodeName(el) && title && (el.value == "") && (el.type == 'textarea' || el.type == 'text')) {
            Performer.SetPrompt(el);
            el.value = Performer.getAttribute(el, 'title');
        }
    },
    // open a popup window
    Pop: function(e) {
        Performer.Debug('Performer.Pop', 'function');
        var el = Performer.findEventElement(e, 'A');
        var cls = Performer.classNames(el);
        var targetName = Performer.classParam(cls, 'targetName', Performer.getAttribute(el, 'rel')) ? '' : 'popupwindow_' + Performer.increment();
        var pageOptions = Performer.classParam(cls, 'options', Performer.getAttribute(el, 'rev')) ? '' : 'scrollbars=yes,toolbar=yes,menubar=yes,location=yes,status=yes,directories=yes';
        // check the element has the required attributes and is a valid event trigger
        if (el && Performer.nodeName(el) && Performer.getAttribute(el, 'href') && (e.type == 'click' || Performer.keyCode(e) == 13)) {
            var targetURL = Performer.getAttribute(el, 'href');
            Performer.Debug('-> Opening: ' + targetURL + ' with ' + pageOptions, 'function');
            var win = window.open(targetURL, targetName, pageOptions);
            if (window.focus) { win.focus(); }
            Performer.stopEvent(e);
        }
    },
    // fade from one color to another - this relies on scriptaculous being used
    Fader: function(e) {
        Performer.Debug('Performer.Fader', 'function');
        var el = Performer.$(e);
        if (Effect && Effect.Highlight && el) {
            // get the end color
            var end_bg = Performer.GetColor(el.getStyle('backgroundColor'));
            // get the class parameters
            var cls = Performer.classNames(el);
            var bg = Performer.classParam(cls, "bg", "#FFEB8F");
            var dur = Performer.classParam(cls, "dur", 3);
            var del = Performer.classParam(cls, "del", 1);
            // get the initial fade color
            var start_bg = Performer.GetColor(bg);
            // set the initial color
            el.setStyle({ backgroundColor: start_bg });
            // start the fade
            Performer.Debug('-> Fader background color: ' + start_bg + ' -> ' + end_bg + '', 'subfunction');
            new Effect.Highlight(el, { startcolor: start_bg, endcolor: end_bg, restorecolor: end_bg, duration: dur, delay: del });
        }
    },
    // get HEX from color, either HEX or RGB string
    GetColor: function(val) {
        Performer.Debug('Performer.GetColor(' + val + ')', 'function');
        if (val && val.length != 0) {
            val = val.toUpperCase();
            val = val.toLowerCase().replace(/#/g, '');
            if (val.length == 6) {
                color = '#' + val;
            }
            else if (val.length == 3) {
                color = val.substring(0, 1) + val.substring(0, 1);
                color = color + val.substring(1, 2) + val.substring(1, 2);
                color = color + val.substring(2, 3) + val.substring(2, 3);
                color = '#' + color;
            }
            else if (val.toLowerCase().substring(0, 3) == 'rgb' && val.indexOf(',') != -1) {
                var vals = val.replace(/rgb\(|\)/g, "").split(",");
                r = parseInt(vals[0].replace(/ /g, ''), 10).toString(16).toLowerCase();
                g = parseInt(vals[1].replace(/ /g, ''), 10).toString(16).toLowerCase();
                b = parseInt(vals[2].replace(/ /g, ''), 10).toString(16).toLowerCase();
                color = '#' + r + g + b;
            } else {
                color = '#FFFFFF';
            }
            Performer.Debug('-> Color: ' + color.toUpperCase(), 'function');
        }
        return color.toUpperCase();
        //Array(color["red"], color["green"], color["blue"]);
    },
    // debug Performer
    ToggleDebug: function(e) {
        if (!Performer.Debugging) {
            Performer.Debugging = true;
            Performer.PrepareDebug();
            Performer.Debug();
        } else {
            Performer.Debugging = false;
            Performer.remove(Performer.$('performerjsdebugwrapper'));
        }
        Performer.stopEvent(e);
    },
    // prepare the debug area
    PrepareDebug: function() {
        var bodyhtml = document.getElementsByTagName('body')[0].innerHTML;
        bodyhtml = bodyhtml + '<div style="position:fixed;bottom:0;right:0;left:0;margin-top:height:400px;" id="performerjsdebugwrapper">\n';
        bodyhtml = bodyhtml + '<p style="margin:0; padding: 0 0 4px 0;"><a href="#" class="toggler targetEl-performerjsdebugbox" style="background:#333;color:#FFF;padding:0.3em 0.6em;margin:0 0 0 1em;-moz-border-radius-topright:5px;-moz-border-radius-topleft:5px;-webkit-border-top-right-radius:5px;-webkit-border-top-left-radius:5px;border:0">Performer Debug</a></p>\n';
        bodyhtml = bodyhtml + '<div class="hider" style="background:#333;padding:0.5em" id="performerjsdebugbox"><div id="performerjsoutput" style="padding:0.3em;height:400px;overflow:auto;background:#FFF;">\n</div></div>';
        document.getElementsByTagName('body')[0].innerHTML = bodyhtml;
        Performer.DoListeners('performerjsdebugwrapper');
    },
    // debug
    Debug: function(str, status) {
        if (Performer.Debugging) {
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
            if (Performer.$('performerjsdebugbox')) {
                Performer.$('performerjsoutput').innerHTML += '<p style="margin:0.1em 0;padding:0;color:' + col + '">' + str + '</p>\n';
            }
        }
    },
    // JavaScript library integration methods
    // check element has class name
    hasClassName: function(el, cls) {
        if (!el || typeof el == 'undefined') return false;
        if (Performer.Prototype || Performer.Scriptaculous) return el.hasClassName(cls);
        if (Performer.jQuery) return jQuery(el).hasClass(cls);
        if (Performer.MooTools) return $(el).hasClass(cls);
    },
    // shortcut for getElementById (handles multiple elements)
    $: function(el) {
        if (typeof el == 'object') return el;
        if (typeof el == 'undefined') return false;
        if (Performer.Prototype || Performer.Scriptaculous || Performer.MooTools) return $(el);
        if (Performer.jQuery) return jQuery('#' + el)[0];
    },
    // shortcut for getElementByClassName (handles multiple elements)
    $$: function(cls) {
        var els;
        if (Performer.Prototype || Performer.Scriptaculous || Performer.MooTools) els = $$(cls);
        if (Performer.jQuery) els = jQuery(cls);
        if (els && els.length > 0) {
            return els;
        } else {
            return false;
        }
    },
    // gets all matching form elements
    $F: function(el) {
        var elid = Performer.identify(el);
        var fields;
        if (Performer.Prototype || Performer.Scriptaculous) fields = el.getElements();
        if (Performer.jQuery) fields = jQuery('#' + elid + ' :input');
        if (Performer.MooTools) fields = $$("#" + elid + " input", "#" + elid + " textarea", "#" + elid + " select", "#" + elid + " button");
        return fields;
    },
    // return the node name of an element
    nodeName: function(el) {
        var nn = false;
        if (Performer.Prototype || Performer.Scriptaculous || Performer.MooTools) nn = el.nodeName.toLowerCase();
        if (Performer.jQuery) nn = el.tagName.toLowerCase();
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
            if (Performer.Prototype || Performer.Scriptaculous) return document.getElementsBySelector(s);
            if (Performer.jQuery) return jQuery(s);
            if (Performer.MooTools) return document.getElements(s);
        } else {
            s = type + "[" + attr + "]";
            if (Performer.Prototype || Performer.Scriptaculous) return document.getElementsBySelector(s);
            if (Performer.jQuery) return jQuery(s);
            if (Performer.MooTools) return document.getElements(s);
        }
    },
    // get the value of a form field
    getValue: function(el) {
        if (Performer.Prototype || Performer.Scriptaculous) return el.getValue();
        if (Performer.jQuery) return jQuery(el).val();
        if (Performer.MooTools) return el.get('value');
    },
    // set the value of a form field
    setValue: function(el, value) {
        if (Performer.Prototype || Performer.Scriptaculous) return el.value = value;
        if (Performer.jQuery) return jQuery(el).val(value);
        if (Performer.MooTools) return el.set('value', value);
    },
    // get the first parent matching the filter
    up: function(el, filter) {
        if (Performer.Prototype || Performer.Scriptaculous) return el.up(filter);
        if (Performer.jQuery) return jQuery(el).parent(filter)[0];
        if (Performer.MooTools) return el.getParent(filter);
    },
    // serialise form fields
    serialize: function(el) {
        if (Performer.Prototype || Performer.Scriptaculous) return el.serialize(true);
        if (Performer.jQuery) return jQuery(el).serialize();
        if (Performer.MooTools) return el.toQueryString();
    },
    // update the innerHTML of an element
    update: function(el, html) {
        if (Performer.Prototype || Performer.Scriptaculous) return el.update(html);
        if (Performer.jQuery) return jQuery(el).html(html);
        if (Performer.MooTools) return el.set('text', html);
    },
    // insert HTML after an element
    insertAfter: function(el, html) {
        if (Performer.Prototype || Performer.Scriptaculous) return new Insertion.After(el, html);
        if (Performer.jQuery) return jQuery(el).after(html);
        if (Performer.MooTools) {
            if (html.trim().substr(0, 1) !== '<') html = '<span>' + html + '</span>';
            var i = new Element('div', { 'html': html });
            return i.inject(el, 'after');
        }
    },
    // increment the counter
    increment: function() {
        Performer.Counter++;
        return Performer.Counter;
    },
    // get an elements id, or create one if it doesn't exist
    identify: function(el) {
        if (typeof (el) == 'string') el = Performer.$(el);
        var id = Performer.getAttribute(el, 'id');
        if (!id || id == '') {
            id = 'anonymous_element_' + Performer.increment();
            Performer.setAttribute(el, 'id', id);
        }
        return id;
    },
    // get an element attribute
    getAttribute: function(el, attr) {
        if (Performer.Prototype || Performer.Scriptaculous) return el.readAttribute(attr);
        if (Performer.jQuery) return jQuery(el).attr(attr);
        if (Performer.MooTools) return el.get(attr);
    },
    // set an element attribute
    setAttribute: function(el, attr, val) {
        if (Performer.Prototype || Performer.Scriptaculous) return el.writeAttribute(attr, val);
        if (Performer.jQuery) return jQuery(el).attr(attr, val);
        if (Performer.MooTools) return el.set(attr, val);
    },
    // remove an element attribute
    removeAttribute: function(el, attr) {
        return el.removeAttribute(attr);
    },
    // remove an element completely
    remove: function(el) {
        if (Performer.Scriptaculous) {
            Effect.Fade(el, { duration: 0.5 });
        }
        if (Performer.Prototype || Performer.Scriptaculous) {
            return el.remove();
        }
        if (Performer.jQuery) {
            jQuery(el).fadeOut("normal");
            return jQuery(el).remove();
        }
        if (Performer.MooTools) {
            el.fade('out');
            return el.destroy();
        }
    },
    // get an elements children
    children: function(el, selector) {
        if (typeof selector != 'undefined') {
            selector = selector.replace('-', ' ');
            el = Performer.$$(selector);
        }
        if (Performer.Prototype || Performer.Scriptaculous) return el.children();
        if (Performer.jQuery) return jQuery(el).children();
        if (Performer.MooTools) return el.getChildren();
    },
    // get an elements ancestors
    ancestors: function(el) {
        if (Performer.Prototype || Performer.Scriptaculous) return el.ancestors();
        if (Performer.jQuery) return jQuery(el).parents();
        if (Performer.MooTools) return el.getParents();
    },
    // get array of classnames for an element
    classNames: function(el) {
        var cls = Performer.getAttribute(el, "class");
        if (cls && cls.length > 0) {
            var classes = new Array();
            var names = cls.split(/\s+/);
            for (var i = 0; i < names.length; i++) {
                if (names[i].length > 0) {
                    classes[classes.length] = names[i];
                }
            }
            return classes;
        } else {
            return new Array();
        }
    },
    // is an element visible
    visible: function(el) {
        if (typeof (el) != 'object') el = Performer.$(el);
        if (Performer.Prototype || Performer.Scriptaculous) return el.visible();
        if (Performer.jQuery) return jQuery(el).is(":visible");
        if (Performer.MooTools) { if (el.getStyle('display') == 'none') { return false; } else { return true; } }
    },
    // add a class name
    addClassName: function(el, cls) {
        if (typeof (el) != 'object') el = Performer.$(el);
        if (Performer.Prototype || Performer.Scriptaculous) return el.addClassName(cls);
        if (Performer.jQuery) return jQuery(el).addClass(cls);
        if (Performer.MooTools) return $(el).addClass(cls);
    },
    // remove a class name
    removeClassName: function(el, cls) {
        if (typeof (el) != 'object') el = Performer.$(el);
        if (Performer.Prototype || Performer.Scriptaculous) return el.removeClassName(cls);
        if (Performer.jQuery) return jQuery(el).removeClass(cls);
        if (Performer.MooTools) return $(el).removeClass(cls);
    },
    // set the class name
    className: function(el, cls) {
        if (typeof (el) != 'object') el = Performer.$(el);
        el.className = cls;
    },
    // disable the context menu on an element
    disableContext: function(el) {
        if (Performer.Prototype || Performer.Scriptaculous) Performer.bind(el, 'contextmenu', function(e) { e.stop(); });
        if (Performer.jQuery) Performer.bind(el, 'contextmenu', function(e) { return false; });
        if (Performer.MooTools) return Performer.bind(el, 'contextmenu', function(e) { e.stop(); });
    },
    // hide an element, with an optional effect
    doHide: function(el, effect) {
        if (typeof (el) != 'object') el = Performer.$(Performer.identify(el));
        if (Performer.Prototype) {
            return el.hide();
        } else if (Performer.Scriptaculous) {
            if (!effect || Performer.Effects.PerformerIndexOf(effect) == -1) {
                return el.hide();
            } else {
                if (effect == 'slideup') return Effect.Fade(el, { duration: 0.5 }); // SlideUp causes errors
                if (effect == 'slidedown') return Effect.Appear(el, { duration: 0.5 }); // SlideDown causes errors
                if (effect == 'blinddown') return Effect.BlindDown(el, { duration: 0.5 });
                if (effect == 'blindup') return Effect.BlindUp(el, { duration: 0.5 });
                if (effect == 'fadein') return Effect.Appear(el, { duration: 0.5 });
                if (effect == 'fadeout') return Effect.Fade(el, { duration: 0.5 });
            }
        } else if (Performer.jQuery) {
            if (!effect || Performer.Effects.PerformerIndexOf(effect) == -1) {
                return jQuery(el).hide();
            } else {
                if (effect == 'slideup') return jQuery(el).slideUp("normal");
                if (effect == 'slidedown') return jQuery(el).slideDown("normal");
                if (effect == 'blinddown') return jQuery(el).slideDown("normal");
                if (effect == 'blindup') return jQuery(el).slideUp("normal");
                if (effect == 'fadein') return jQuery(el).fadeIn("normal");
                if (effect == 'fadeout') return jQuery(el).fadeOut("normal");
            }
        } else if (Performer.MooTools) {
            el.fade('out');
            el.setStyle('display', 'none');
            return el;
        }
        return false;
    },
    // show an element, with an optional effect
    doShow: function(el, effect) {
        if (typeof (el) != 'object') el = Performer.$(Performer.identify(el));
        if (Performer.Prototype) {
            return el.show();
        } else if (Performer.Scriptaculous) {
            if (!effect || Performer.Effects.PerformerIndexOf(effect) == -1) {
                return el.show();
            } else {
                if (effect == 'slideup') return Effect.Fade(el, { duration: 0.5 }); // SlideUp causes errors
                if (effect == 'slidedown') return Effect.Appear(el, { duration: 0.5 }); // SlideDown causes errors
                if (effect == 'blinddown') return Effect.BlindDown(el, { duration: 0.5 });
                if (effect == 'blindup') return Effect.BlindUp(el, { duration: 0.5 });
                if (effect == 'fadein') return Effect.Appear(el, { duration: 0.5 });
                if (effect == 'fadeout') return Effect.Fade(el, { duration: 0.5 });
            }
        } else if (Performer.jQuery) {
            if (!effect || Performer.Effects.PerformerIndexOf(effect) == -1) {
                return jQuery(el).show();
            } else {
                if (effect == 'slideup') return jQuery(el).slideUp("normal");
                if (effect == 'slidedown') return jQuery(el).slideDown("normal");
                if (effect == 'blinddown') return jQuery(el).slideDown("normal");
                if (effect == 'blindup') return jQuery(el).slideUp("normal");
                if (effect == 'fadein') return jQuery(el).fadeIn("normal");
                if (effect == 'fadeout') return jQuery(el).fadeOut("normal");
            }
        } else if (Performer.MooTools) {
            el.setStyle('display', 'block');
            el.fade('in');
            return el;
        }
        return false;
    },
    // do an AJAX request
    Request: function(targetPage, requestMethod, params, successFunction) {
        if (Performer.Prototype || Performer.Scriptaculous) {
            new Ajax.Request(targetPage, { method: requestMethod, parameters: params, onSuccess: successFunction });
        }
        if (Performer.jQuery) {
            return jQuery.ajax({ type: requestMethod, url: targetPage, data: params, success: successFunction });
        }
        if (Performer.MooTools) {
            var myRequest = new Request({ method: requestMethod, url: targetPage, data: params, onSuccess: successFunction });
            myRequest.send();
            return myRequest;
        }
    },
    // get the response from an AJAX request
    getRequestText: function(request) {
        var text = request;
        if (request.responseText) text = request.responseText;
        return text;
    },
    // get the element which triggered an event
    eventElement: function(e) {
        //if (Performer.Prototype || Performer.Scriptaculous) return Event.element(e);
        //if (Performer.jQuery) alert(e.target); return jQuery(e.target)[0];
        var targ;
        if (!e) e = window.event;
        if (e.target) targ = e.target;
        else if (e.srcElement) targ = e.srcElement;
        if (targ.nodeType == 3) return targ.parentNode;
        return targ;
    },
    // find the first ancestor element of an element which triggered an event
    findEventElement: function(e, tag) {
        var target;
        if (Performer.Prototype || Performer.Scriptaculous) return Event.findElement(e, tag);
        if (Performer.jQuery) {
            target = Performer.eventElement(e);
            if (target && target.nodeName && target.nodeName.toLowerCase() == tag.toLowerCase()) {
                return target;
            } else {
                return jQuery(target).parents(tag)[0];
            }
        }
        if (Performer.MooTools) {
            target = Performer.eventElement(e);
            if (target && target.nodeName && target.nodeName.toLowerCase() == tag.toLowerCase()) {
                return target;
            } else {
                return $(target).getParent(tag);
            }
        }
    },
    // bind an event on the document to a function
    domLoaded: function(func) {
        if (Performer.Prototype || Performer.Scriptaculous) { Performer.bind(document, "dom:loaded", func); }
        if (Performer.jQuery) { return jQuery(document).ready(func); }
        if (Performer.MooTools) { return Performer.bind(window, 'domready', func); }
    },
    // bind an event on an element to a function
    bind: function(el, event, func) {
        if (Performer.Prototype || Performer.Scriptaculous) { Event.observe(el, event, func); }
        if (Performer.jQuery) { return jQuery(el).bind(event, func); }
        if (Performer.MooTools) { return $(el).addEvent(event, func); }
    },
    // unbind a function from an event on an element
    unBind: function(el, event, func) {
        if (Performer.Prototype || Performer.Scriptaculous) { Event.stopObserving(el, event, func); }
        if (Performer.jQuery) { return jQuery(el).unbind(event, func); }
        if (Performer.MooTools) { return $(el).removeEvent(event, func); }
    },
    // stop the default action of an event firing, including bubbling and propigation
    stopEvent: function(e) {
        if (Performer.Prototype || Performer.Scriptaculous) { e.preventDefault(); e.stopPropagation(); Event.stop(e); return false; }
        if (Performer.jQuery) { e.preventDefault(); e.stopPropagation(); return false; }
        if (Performer.MooTools) { e.stop(); return false; }
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
        if (Performer.Prototype || Performer.Scriptaculous) return el.getDimensions();
        if (Performer.jQuery) {
            size = new Object;
            size.height = jQuery(el).outerHeight();
            size.width = jQuery(el).outerWidth();
        }
        if (Performer.MooTools) {
            getsize = el.getSize();
            size = new Object;
            size.height = getsize.y;
            size.width = getsize.x;
        }
        return size;
    },
    // set the css style of an element
    setStyle: function(el, style) {
        if (Performer.Prototype || Performer.Scriptaculous) return el.setStyle(style);
        if (Performer.jQuery) { jQuery(el).css(style); }
        if (Performer.MooTools) { $(el).setStyles(style); }
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
        if (Performer.MooTools) {
            var event = new Event(e);
            return [event.page.x, event.page.y];
        } else {
            var posx = 0;
            var posy = 0;
            if (!e) e = window.event;
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
        }

    },
    // return the position of an element
    // from http://www.quirksmode.org/js/findpos.html
    elementPosition: function(obj) {
        var curleft = curtop = 0;
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
    // debugging methods
    alertProperties: function(a) {
        var o = '';
        for (var name in a) {
            o += name + ': ' + a[name] + '\n';
        }
        Performer.createModal(true, true, 6, 'performermodalouter', 'performermodalinner', 100, 100, true);
        Performer.$('performer_modal').innerHTML = '<pre style="width: 100%; height: 100%">' + o + '</pre>';
    }
}
// use native browser JS 1.6 implementation if available
// from Prototype
if (typeof(Array.prototype.indexOf) == 'function')
{
	Array.prototype.PerformerIndexOf = Array.prototype.indexOf;
} else {
    Array.prototype.PerformerIndexOf = function(item, i) {
    i || (i = 0);
    var length = this.length;
    if (i < 0) i = length + i;
    for (; i < length; i++) {
        if (this[i] === item) { return i; }
    }
    return -1;
};
}
// load Performer
Performer.Performer();
// add Performer CSS classes
document.write('<style type="text/css">.hider { display: none; } .performertooltip { display: absolute; }.performerlightboxouter { position: fixed; z-index: 10000; top: 0px; right: 0px; bottom: 0px; left: 0px; background: #000; opacity: 0.6; } .performertooltip { background: #FFF;	padding: 6px; } .performertooltip div.performertooltipinner { border: 1px solid #000; background: #FFFCDF; padding: 1em; } .performermodalouter { background: #000; } .performermodalinner { background: #FFF; border: 1px solid #000; padding: 1em; } * html .performermodalinner { position: relative; } .performermenu:hover { display: absolute; } a.modalwindowcloser { background: #000; color: #FFF; padding: 0 2em; text-decoration: none; } .performerloading { background: #EFE4B3; } .performercontextmenu { background: #D4DBED; padding: 0.6em; list-style: none; border: 1px solid #CCC; } .password-weak { color: #C00; } .password-ok { color: #EFAD3B; }	.password-strong { color: #0C0; } .performer-pagination { text-align: right; } .performer-pagination li { display: inline; } .performer-pagination li a { padding; 0.6em; } .performer-pagination .currentpage { font-weight: bold; }</style>');
