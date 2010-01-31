/*
Performer JavaScript library (http://performerjs.org)
Created by Chris Taylor (http://www.stillbreathing.co.uk)
Additional work by kourge
Based on the Prototype framework (http://www.prototypejs.org)

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
	Performer: function()
	{
		// set debugging
		Performer.Debugging = false;
		Performer.Debug('Performer.Performer', 'function');
		// set up global variables
		Performer.Reloaders = new Array();
		// initialise the app
		Performer.Init();
	},
	Init: function()
	{
		Performer.CheckDebug();
		Performer.Debug('Performer.Init', 'function');
		// set up global variables
		Performer.Groups;
		Performer.TextValue;
		Performer.FadeSteps = 8;
		Performer.CurrentFadeStep = 0;
		// do the transformations
		Performer.DoTransformers();
		// set up listeners
		Performer.DoListeners();
	},
	ReInit: function(el)
	{
		Performer.Debug('Performer.ReInit', 'function');
		// do the transformations
		Performer.DoTransformers(el);
		// set up listeners
		Performer.DoListeners(el);
	},
	DoListeners: function(el)
	{
		Performer.Debug('Performer.DoListeners', 'function');
		if (el == undefined) el = '';
		Performer.Listeners(el,'formchecker','CheckForm','submit');
		Performer.Listeners(el,'toggler','Toggle','mousedown,keypress');
		Performer.Listeners(el,'switcher','Switch','mousedown,keypress');
		Performer.Listeners(el,'loader','Load','mousedown,keypress');
		Performer.Listeners(el,'toggleloader','ToggleLoad','mousedown,keypress');
		Performer.Listeners(el,'sizer','Size','mousedown,keypress');
		Performer.Listeners(el,'tabber','Tab','mousedown,keypress');
		Performer.Listeners(el,'selector','Select','change,keypress');
		Performer.Listeners(el,'limiter','Limit','keyup');
		Performer.Listeners(el,'editor','Edit','mousedown,keypress');
		Performer.Listeners(el,'uneditor','UnEdit','mousedown,keypress');
		Performer.Listeners(el,'prompter','RemovePrompt','focus');
		Performer.Listeners(el,'prompter','CheckPrompt','blur');
		Performer.Listeners(el,'popper','Pop','mousedown,keypress');
		Performer.Listeners(el,'passwordchecker','CheckPassword','keyup');
		Performer.Listeners(el,'matcher','Match','keyup');
		Performer.Listeners(el,'grouptoggler','GroupToggle','mousedown,keypress');
	},
	DoTransformers: function(el)
	{
		if (el == undefined) el = '';
		Performer.Debug('Performer.DoTransformers', 'function');
		Performer.Transformers(el,'hider','Hide');
		Performer.Transformers(el,'shower','Show');
		Performer.Transformers(el,'focusser','Focus');
		Performer.Transformers(el,'limiter','LimitNotifier');
		Performer.Transformers(el,'reloader','Reload');
		Performer.Transformers(el,'preloader', 'Preload');
		Performer.Transformers(el,'prompter','SetPrompt');
		// fader requires scriptaculous
		Performer.Transformers(el,'fader','Fader');
	},
	// listen for the required classnames
	Listeners: function(el,className,f,event)
	{
		if (el != undefined) el = el + ' ';
		Performer.Debug('-> Performer.Listeners(' + el + '.' + className + ')', 'subfunction');
		$$(el + '.' + className).each(function(element)
		{
			event.split(',').each(function(event)
			{
				Event.observe(element, event, Performer[f], false);
			});
		});
	},
	// transform the required classnames
	Transformers: function(el,className,f)
	{
		Performer.Debug('-> Performer.Transformers(' + el + '.' + className + ')', 'subfunction');
		if (el != undefined) el = el + ' ';
		$$(el + '.' + className).each(function(element)
		{
			Performer[f](element);
		});
	},
	// check if the debug class is set
	CheckDebug: function()
	{
		Performer.Debug('Performer.CheckDebug', 'function');
		var debugs = document.getElementsByClassName('performer-debug');
		if (debugs && debugs.length) Performer.Debugging = true;
	},
	// runs a custom function on an event
	// checks the values of fields in a form
	CheckForm: function(e)
	{
		Performer.Debug('Performer.CheckForm', 'function');
		var el = e.element();
		var fail = false;
		var radiogroups = new Array();
		// get unique fields in the form
		var fields = new Array();
		fields = $A(Form.getElements(el));
		fields.each(function(input){
			var identity = input.identify();
			var field = $(identity);
			// field is required
			if (field.hasClassName('field-required'))
			{
				if (field.type != 'radio' &&
				((field.type == 'checkbox' && field.checked == false) ||
				Form.Element.getValue(field) == "")) {
					Performer.FieldNotify(identity, 'error', 'This field is required');
					fail = true;
				} else { Performer.FieldNotifyRemove(identity); }
				// radio buttons
				if (field.type == 'radio' && radiogroups.indexOf(field.name) == -1) {
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
					var lastbutton = radiobuttons[radiobuttons.length-1];
					if (radiofail) {
						Performer.FieldNotify(lastbutton, 'error', 'This field is required');
						fail = true;
					} else { Performer.FieldNotifyRemove(lastbutton); }
				}
			}
			// field must be an email address
			if (field.hasClassName('field-required-email') || field.hasClassName('field-optional-email'))
			{
				var validemail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if ((field.hasClassName('field-required-email') && Form.Element.getValue(field) == "") || (Form.Element.getValue(field) != "" && !validemail.test(Form.Element.getValue(field)))) {
					Performer.FieldNotify(identity, 'error', 'This field must be a valid email address');
					fail = true;
				} else { Performer.FieldNotifyRemove(identity); }
			}
			// field must be a number
			if (field.hasClassName('field-required-number') || field.hasClassName('field-optional-number'))
			{
			    var num = Form.Element.getValue(field).replace(",","").replace("&pound;","").replace("£","");
				if ((field.hasClassName('field-required-number') && num == "") || (num != "" && isNaN(parseFloat(num)))) {
					Performer.FieldNotify(identity, 'error', 'This field must be a number'); 
					fail = true;
				} else {
				    // set the correct number value
				    if (num != "") { field.value = parseFloat(num); }
				    Performer.FieldNotifyRemove(identity);
				}
			}
			// field must be a date (dd/mm/yyyy)
			if (field.hasClassName('field-optional-date') || field.hasClassName('field-optional-date'))
			{
				var validdate = /^([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4})$/;
				if ((field.hasClassName('field-required-date') && Form.Element.getValue(field) == "") || (Form.Element.getValue(field) != "" && !validdate.test(Form.Element.getValue(field)))) {
					Performer.FieldNotify(identity, 'error', 'This field must be a date (dd/mm/yyyy)'); 
					fail = true;
				} else { Performer.FieldNotifyRemove(identity); }
			}
			Performer.Debug('-> Field ' + input.name, 'subfunction');
		});
		if (fail)
		{
			Event.stop(e);
		}
	},
	// adds a notification to a field
	FieldNotify: function(field, messageclass, message)
	{
		if (!$(field + '-notification'))
		{
			new Insertion.After(field, '<span id="' + field + '-notification" class="performer-' + messageclass + '">' + message + '</span>');
		} else {
			$(field + '-notification').innerHTML = message;
			$(field + '-notification').className = 'performer-' + messageclass;
		}
	},
	// remove a field notification
	FieldNotifyRemove: function(field)
	{
		if ($(field + '-notification'))
		{
			$(field + '-notification').remove();
		}
	},
	// send a list selection to a remote page
	Select: function(e)
	{
		Performer.Debug('Performer.Select', 'function');
		var el = e.element();
		// check the element has the required attributes
		if (el.readAttribute && el.readAttribute('id') && el.readAttribute('name') && el.readAttribute('class'))
		{
			var targetPage = false;
			var targetEl = false;
			var targetValue = true;
			// get the classes
			el.classNames().each(function(cls)
			{
				// targetEl
				if (cls.match(/^targetEl-/)){ targetEl = cls.replace('targetEl-', ''); }
				// targetPage
				if (cls.match(/^targetPage-/)){ targetPage = cls.replace('targetPage-', ''); }
				// targetValue
				if (cls.match(/^targetValue-/)){ targetValue = cls.replace('targetValue-', ''); }
			});
			// check we have a targetPage and targetEl and the target element can be found
			if (targetPage && targetEl && $(targetEl))
			{
				if (targetValue == 'true')
				{
					Performer.DoLoad(targetPage + '?selection=' + el.getValue(), targetEl, 'post', 'setvalueandinit');
				} else {
					Performer.DoLoad(targetPage + '?selection=' + el.getValue(), targetEl, 'post', 'fillandinit');
				}
			}
		}
	},
	// check the strength of a password
	CheckPassword: function(e)
	{
		Performer.Debug('Performer.CheckPassword', 'function');
		var el = e.element();
		// check the element has the required attributes
		if (el.readAttribute && el.readAttribute('id') && el.readAttribute('name') && el.readAttribute('class'))
		{
			var notifyEl = false;
			// get the classes
			el.classNames().each(function(cls)
			{
				// notifyEl
				if (cls.match(/^notifyEl-/)){ notifyEl = cls.replace('notifyEl-', ''); }
			});
			// check we have a notification element
			if (notifyEl && $(notifyEl))
			{
				var val = el.value;
				// if the password is shorter than 6 characters
				if (val.length < 6)
				{
					$(notifyEl).innerHTML = 'Your password must be at least 6 characters long';
					$(notifyEl).className = 'password-fail';
					// if the password has only letters
				} else {
					$(notifyEl).innerHTML = '';
					$(notifyEl).className = '';
					// if the password is just letters or just numbers less than 10 characters
					if (val.match(/^([a-zA-Z]{6,10})$/) || val.match(/^([0-9]{6,10})$/)) {
						$(notifyEl).innerHTML = 'Weak password';
						$(notifyEl).className = 'password-weak';
					// if the password is just letters or just numbers more than 10 characters
					} else if (val.match(/^([a-zA-Z]{10,})$/) || val.match(/^([0-9]{10,})$/)) {
						$(notifyEl).innerHTML = 'Acceptable password';
						$(notifyEl).className = 'password-ok';
					// if the password contains letters, numbers and characters it is strong
					} else if (val.match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[^0-9a-zA-Z]).*$/)) {
						$(notifyEl).innerHTML = 'Strong password';
						$(notifyEl).className = 'password-strong';
					// if the password has just letters and numbers, or just letters and characters, or just numbers and characters
					} else if (val.match(/^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/) || val.match(/^.*(?=.{6,})(?=.*[^0-9a-zA-Z])(?=.*[a-z]).*$/) || val.match(/^.*(?=.{6,})(?=.*[^0-9a-zA-Z])(?=.*\d).*$/)) {
						$(notifyEl).innerHTML = 'Acceptable password';
						$(notifyEl).className = 'password-ok';
					}
				}
			}
		}
	},
	// match the values of two input boxes
	Match: function(e)
	{
		Performer.Debug('Performer.Match', 'function');
		var el = e.element();
		// check the element has the required attributes
		if (el.readAttribute && el.readAttribute('id') && el.readAttribute('name') && el.readAttribute('class'))
		{
			var notifyEl = false;
			var matchEl = false;
			// get the classes
			el.classNames().each(function(cls)
			{
				// notifyEl
				if (cls.match(/^notifyEl-/)){ notifyEl = cls.replace('notifyEl-', ''); }
				// matchEl
				if (cls.match(/^matchEl-/)){ matchEl = cls.replace('matchEl-', ''); }
			});
			// check we have a match element and a notification element
			if (notifyEl && $(notifyEl) && matchEl && $(matchEl))
			{
				// show the notifyEl
				$(notifyEl).show();
				// get the value
				var val1 = el.value;
				// get the value to be matched
				var val2 = $(matchEl).value;
				// if the values match
				if (val1 == val2)
				{
					// hide the notifyEl
					$(notifyEl).hide();
				}
			}
		}
	},
	// toggle element
	Toggle: function(e)
	{
		Performer.Debug('Performer.Toggle', 'function');
		r = false;
		var el = Event.findElement(e, 'A');
		// check the element has the required attribute and is a valid event trigger
		if (el.readAttribute && el.readAttribute('rel') && (Event.isLeftClick(e) || e.keyCode == Event.KEY_RETURN))
		{
			var targetEl = el.readAttribute('rel');
			// check the target element can be found
			if ($(targetEl))
			{
				// toggle the visibility
				if (!$(targetEl).visible())
				{
					Performer.Debug('-> Show ' + targetEl, 'subfunction');
					el.addClassName('toggleropen');
					Performer.Show(targetEl);
					r = true;
				} else {
					Performer.Debug('-> Hide ' + targetEl, 'subfunction');
					el.removeClassName('toggleropen');
					Performer.Hide(targetEl);
					r = false;
				}
			}
		}
		Event.stop(e);
		return r;
	},
	// toggles the visibility of a group of elements
	GroupToggle: function(e)
	{
		Performer.Debug('Performer.GroupToggle', 'function');
		r = false;
		var el = Event.findElement(e, 'A');
		// check the element has the required attribute and is a valid event trigger
		if (el.readAttribute && el.readAttribute('rel') && (Event.isLeftClick(e) || e.keyCode == Event.KEY_RETURN))
		{
			var targetClass = el.readAttribute('rel');
			Performer.Debug('-> Toggle elements with class ' + targetClass, 'subfunction');
			$$('.' + targetClass).each(function(element)
			{
				// toggle the visibility
				if (!element.visible())
				{
					el.addClassName('toggleropen');
					element.removeClassName('hider');
					element.show();
					r = true;
				} else {
					el.removeClassName('toggleropen');
					element.addClassName('hider');
					element.hide();
					r = false;
				}
			});
		}
		Event.stop(e);
	},
	// switch visibility of two element
	Switch: function(e)
	{
		Performer.Debug('Performer.Switch', 'function');
		r = false;
		var el = Event.findElement(e, 'A');
		// check the element has the required attribute and is a valid event trigger
		if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev') && (Event.isLeftClick(e) || e.keyCode == Event.KEY_RETURN))	
		{
			var targetEl1 = el.readAttribute('rel');
			var targetEl2 = el.readAttribute('rev');
			// check the target elements can be found
			if ($(targetEl1) && $(targetEl2))
			{
				// toggle the visibility
				if (!$(targetEl1).visible())
				{
					Performer.Debug('-> Show ' + targetEl1 + ', hide '+ targetEl2, 'subfunction');
					$(targetEl1).show();
					$(targetEl2).hide();
					r = true;
				} else {
					Performer.Debug('-> Show ' + targetEl2 + ', hide '+ targetEl1, 'subfunction');
					$(targetEl2).show();
					$(targetEl1).hide();
					r = false;
				}
			}
		}
		Event.stop(e);
		return r;
	},
	// focus the element
	Focus: function(e)
	{
		Performer.Debug('Performer.Focus', 'function');
		var el = $(e);
		if (el)
		{
			Performer.Debug('-> Focus on ' + el, 'subfunction');
			$(el).focus();
		}
	},
	// resize the element
	Size: function(e)
	{
		Performer.Debug('Performer.Size', 'function');
		var el = Event.findElement(e, 'A');
		// check the element has the required attribute and is a valid event trigger
		if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev') && (Event.isLeftClick(e) || e.keyCode == Event.KEY_RETURN))
		{
			var targetEl = el.readAttribute('rel');
			// check the target element can be found
			if ($(targetEl))
			{
				// get the new size
				var sizes = el.readAttribute('rev');
				// get the height/width values
				if (sizes.indexOf(',')>=0)
				{
					var sizeParts = sizes.split(',');
					var height = sizeParts[0];
					var width = sizeParts[1];
				} else {
					var height = sizes;
					var width = 0;
				}
				if (height==''){ height = 0; }
				if (width==''){ width = 0; }
				// get current dimensions
				var dimensions = $(targetEl).getDimensions();
				var currentHeight = dimensions.height;
				var currentWidth = dimensions.width;
				// calculate the new dimensions and resize the element
				if (height != 0){
					var newHeight = (parseFloat(height) + parseFloat(currentHeight)) + 'px';
					Performer.Debug('-> Change height of ' + targetEl + ' to ' + newHeight, 'subfunction');
				$(targetEl).setStyle({ height: newHeight });
				}
				if (width != 0)
				{
					var newWidth = (parseFloat(width) + parseFloat(currentWidth)) + 'px';
					Performer.Debug('-> Change width of ' + targetEl + ' to ' + newWidth, 'subfunction');
					$(targetEl).setStyle({ width: newWidth });
				}
			}
		}
		Event.stop(e);
		Performer.DoTransformers();
	},
	// toggle an element and load data
	ToggleLoad: function(e)
	{
		Performer.Debug('Performer.ToggleLoad', 'function');
		var el = e.element();
		// check the element has the required attribute and is a valid event trigger
		if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev') && (Event.isLeftClick(e) || e.keyCode == Event.KEY_RETURN))
		{ 
			var targetEl = el.getAttribute('rel');
			// check the target element can be found
			if ($(targetEl))
			{
				if (Performer.Toggle(e))
				{
					Performer.Debug('-> Loading content into ' + targetEl, 'subfunction');
					Performer.Load(e,true,false);
				}
			}
		}
		Event.stop(e);
	},
	// toggle tabs
	Tab: function(e)
	{
		Performer.Debug('Performer.Tab', 'function');
		var el = Event.findElement(e, 'A');
		// check the element has the required attribute and is a valid event trigger
		if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev') && (Event.isLeftClick(e) || e.keyCode == Event.KEY_RETURN))
		{
			var tabGroup = el.readAttribute('rel');
			var openTab = el.readAttribute('rev');
			var tablinks = $$(' .tabber');
			for (var i=0; i<tablinks.length; i++)
			{
				if ($(tablinks[i]).readAttribute && $(tablinks[i]).readAttribute('rel') == tabGroup)
				{
					$(tablinks[i]).removeClassName('tabbercurrent');
				}
			}
			// check the tabgroup can be found
			if ($(tabGroup))
			{
				// hide all the tabs
				var tabs = $$('#' + tabGroup + ' .tab');
				for (var i=0; i<tabs.length; i++)
				{
					Performer.Hide(tabs[i]);
				}
				el.addClassName('tabbercurrent');
				// show the required tab
				Performer.Debug('-> Showing tab ' + openTab, 'subfunction'); 
				Performer.Show(openTab);
			}
		}
		Event.stop(e);
	},
	// load data into an element
	Load: function(e,c,s)
	{
		Performer.Debug('Performer.Load', 'function');
		var el = Event.findElement(e, 'A');
		// check the element has the required attribute and is a valid event trigger
		if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev') && (Event.isLeftClick(e) || e.keyCode == Event.KEY_RETURN))
		{
			var targetEl = el.readAttribute('rel');
			var targetPage = el.readAttribute('rev');
			// check the target element can be found
			if ($(targetEl))
			{
				Performer.Debug('-> Loading content into ' + targetEl, 'subfunction'); 
				if(!s)
				{
					Performer.DoLoad(targetPage, targetEl, 'get', 'fillandinit');
				} else {
					Performer.DoLoad(targetPage, targetEl, 'get', 'fill');
				}
			}
		}
		if (!c) Event.stop(e);
	},
	// load some data
	DoLoad: function(targetPage, targetElement, requestMethod, onCompleteFunction)
	{
		Performer.Debug('Performer.DoLoad(' + targetPage + ' -> ' + targetElement + ')', 'function');
		$(targetElement).addClassName('loaderloading');
		new Ajax.Request(targetPage, { method: requestMethod, onSuccess: function(request){
			if ($(targetElement))
			{
				var text = request.responseText;
				if (onCompleteFunction == 'fill')
				{
					$(targetElement).innerHTML = text;
					$(targetElement).removeClassName('loaderloading');
					Performer.Debug('-> Filled \'' + targetElement + '\'', 'success');
				}
				if (onCompleteFunction == 'fillandinit')
				{
					$(targetElement).innerHTML = text;
					$(targetElement).removeClassName('loaderloading');
					Performer.Debug('-> Filled \'' + targetElement + '\'', 'success');
					Performer.ReInit('#' + targetElement);
				}
				if (onCompleteFunction == 'setvalue')
				{
					$(targetElement).value = text;
					$(targetElement).removeClassName('loaderloading');
					Performer.Debug('-> Value set \'' + targetElement + '\'', 'success');
				}
				if (onCompleteFunction == 'setvalueandinit')
				{
					$(targetElement).value = text;
					$(targetElement).removeClassName('loaderloading');
					Performer.Debug('-> Set value \'' + targetElement + '\'', 'success');
					Performer.ReInit('#' + targetElement);
				}
			}
		}
		});
	},
	// load data into an element on a regular basis
	Reload: function(e)
	{
		Performer.Debug('Performer.Reload');
		var el = $(e);
		// check this reloader isn't already initialised
		Performer.Debug('\'' + el.id + '\' exists in Performer.Reloaders = ' + Performer.Reloaders.indexOf(el.id));
		if (Performer.Reloaders.indexOf(el.id) == -1)
		{
			var delay = 0;
			var targetPage;
			// loop the classes, trying to get the delay and and targetPage
			el.classNames().each(function(cls)
			{
				// targetEl
				if (cls.match(/^delay-/)){ delay = cls.replace('delay-', ''); }		
				// targetPage
				if (cls.match(/^targetPage-/)){ targetPage = cls.replace('targetPage-', ''); }
			});
			if (delay == 0) { delay = 600; }
			// check the element has the required attributes
			if (el && delay && targetPage)
			{
				Performer.Reloaders[Performer.Reloaders.length] = el.id;
				Performer.Debug('-> Added \'' + el.id + '\' to Performer.Reloaders (now ' + Performer.Reloaders.length + ' items): ' + delay + ' seconds', 'subfunction');
				Performer.DoLoad(targetPage, el.id, 'get', 'fillandinit');
				var ex = new PeriodicalExecuter(function(){
					var d = new Date();
					var t = d.getTime();
					if (targetPage.indexOf('?') != -1){ t = '&' + t; } else { t = '?' + t; }
					Performer.DoLoad(targetPage + t, el.id, 'get', 'fillandinit');
				}, delay);
			}
		}
	},
	// load data into an element when the page loads
	Preload: function(e)
	{
		Performer.Debug('Performer.Preload', 'function');
		var el = $(e);
		var targetPage;
		// loop the classes, trying to get the targetPage
		el.classNames().each(function(cls){
			// targetPage
			if (cls.match(/^targetPage-/)){ targetPage = cls.replace('targetPage-', ''); }
		});
		// check the element has the required attributes
		if (el && targetPage)
		{
			Performer.Debug('-> Loading content into ' + el.id, 'subfunction'); 
			Performer.DoLoad(targetPage, el.id, 'get', 'fillandinit');
		}
	},
	// hide a hider element
	Hide: function(e)
	{
		Performer.Debug('Performer.Hide', 'function');
		var el = $(e);
		if (el)
		{
		    if ($(el).className.indexOf('hider') != -1){ el.addClassName('hider'); }
		    if ($(el).className.indexOf('shower') != -1){ el.removeClassName('shower'); }
			Performer.Debug('-> Hiding ' + el.id, 'subfunction'); 
			el.hide();
		}
	},
	// show a shower element
	Show: function(e)
	{
		Performer.Debug('Performer.Show', 'function');
		var el = $(e);
		if (el)
		{
		    if ($(el).className.indexOf('hider') != -1){ el.removeClassName('hider'); }
		    if ($(el).className.indexOf('shower') != -1){ el.removeClassName('shower'); }
			Performer.Debug('-> Showing ' + el.id, 'subfunction'); 
			el.show();
		}
	},
	// get the parameters for a limiter
	GetLimitParams: function(el)
	{
		Performer.Debug('Performer.GetLimitParams');
		// check the element has the required attributes and is an input or textarea
		if (el.readAttribute && el.readAttribute('id') && el.classNames() && (el.type == 'textarea' || el.type == 'text'))
		{
			var targetEl;
			var lengthLimit = 255;
			// loop the classes, trying to get the rev and rel
			el.classNames().each(function(cls)
			{
				// targetEl
				if (cls.match(/^targetEl-/)){ targetEl = cls.replace('targetEl-', ''); }
				// targetPage
				if (cls.match(/^lengthLimit-/)){ lengthLimit = cls.replace('lengthLimit-', ''); }
			});
			// check the target element can be found
			if (targetEl && $(targetEl))
			{
				var params = new Array();
				params["lengthLimit"] = lengthLimit;
				params["targetEl"] = targetEl;
				return params;
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	// limit the amount of text in an input box or textarea
	Limit: function(e)
	{
		Performer.Debug('Performer.Limit', 'function');
		var el = e.element();
		// get the parameters
		var params = Performer.GetLimitParams(el);
		if (params && params["lengthLimit"] && params["targetEl"])
		{
			var lengthLimit = params["lengthLimit"];
			var targetEl = params["targetEl"];
			var currentLength = $F(el).length;
			// limit the length
			if (parseFloat(currentLength) >= parseFloat(lengthLimit))
			{
				$(el).value = $F(el).substr(0,lengthLimit);
				$(targetEl).update("Limit reached");
			} else {
				$(targetEl).update((lengthLimit-currentLength) + " characters left");

			}
		}
	},
	// show the length limit notification
	LimitNotifier: function(e)
	{
		Performer.Debug('Performer.LimitNotifier', 'function');
		var el = $(e);
		// get the parameters
		var params = Performer.GetLimitParams(el);
		// check this doesn't have prompt text in
		if (!el.hasClassName('prompter'))
		{
			if (params && params["lengthLimit"] && params["targetEl"])
			{
				var currentLength = $F(el).length;
				$(params["targetEl"]).update((params["lengthLimit"]-currentLength) + " characters left");
			}
		} else {
			$(params["targetEl"]).update(params["lengthLimit"] + " characters left");
		}
	},
	// edit the contents of an element and send the results to a processing page
	Edit: function(e)
	{
		Performer.Debug('Performer.Edit', 'function');
		var el = e.element();
		// check the element has the required attributes and is a valid event trigger
		if (el.readAttribute && el.readAttribute('id') && el.classNames() && (Event.isLeftClick(e) || e.keyCode == Event.KEY_RETURN))
		{
			var targetPage;
			var inputType;
			// loop the classes
			el.classNames().each(function(cls)
			{
				// targetPage
				if (cls.match(/^targetPage-/)){ targetPage = cls.replace('targetPage-', ''); }
			})
			if (targetPage)
			{
				// build the editing form
				Performer.TextValue = $(el).innerHTML;
				el.innerHTML = Performer.BuildEditForm(el,targetPage);
				Performer.ReInit();
			}
		}
	},
	// build the element editing form
	BuildEditForm: function(el,targetPage)
	{
		Performer.Debug('Performer.BuildEditForm(' + targetPage + ')', 'function');
		if (el && $(el) && targetPage)
		{
			var value = $(el).innerHTML;
			var editForm;
			editForm = '<form id="' + $(el).id + '-editor" class="performer-editor" action="' + targetPage + '" method="post">\n';
			editForm += '<input type="text" id="' + $(el).id + '-value" name="' + $(el).id + '" value="' + value + '" />\n';
			editForm += '<input type="submit" id="' + $(el).id + '-save" name="' + $(el).id + '-save" value="Save" />\n';
			editForm += '<a href=\"#\" class="uneditor" rel="' + $(el).id + '">Cancel</a>\n';
			editForm += '</form>\n';
			Performer.Debug('-> Built form with action: ' + targetPage, 'function'); 
			return editForm;
		}
	},
	// cancel a Performer.Edit command and return the element to normal
	UnEdit: function(e)
	{
		Performer.Debug('Performer.UnEdit', 'function');
		var el = e.element();
		if (el.readAttribute && el.readAttribute('rel'))
		{
			var targetEl = el.readAttribute('rel');
			$(targetEl).innerHTML = Performer.TextValue;
		}
		Event.stop(e);
	},
	// checks if the element has focus and if so removes the content from it
	// when the element loses focus it checks if the element has no contents and adds the prompt back in
	SetPrompt: function(el)
	{
		Performer.Debug('Performer.SetPrompt', 'function');
		if (el.readAttribute && el.readAttribute('id') && el.readAttribute('title') && el.value == "" && (el.type == 'textarea' || el.type == 'text'))
		{
			Performer.Debug('-> Setting prompt: ' + el.readAttribute('title'), 'function'); 
			el.addClassName("performer-prompter");
			el.value = el.readAttribute('title');
		}
	},
	// remove a prompt
	RemovePrompt: function(e)
	{
		Performer.Debug('Performer.RemovePrompt', 'function');
		var el = e.element();
		if (el.readAttribute && el.readAttribute('id') && el.readAttribute("title")&& (el.value == el.readAttribute("title")) && (el.type == 'textarea' || el.type == 'text'))
		{
			el.value = "";
			el.removeClassName("performer-prompter");
		}
	},
	// check a prompt is present
	CheckPrompt: function(e)
	{
		Performer.Debug('Performer.CheckPrompt', 'function');
		var el = e.element();
		if (el.readAttribute && el.readAttribute('id') && el.readAttribute("title")&& (el.value == "") && (el.type == 'textarea' || el.type == 'text'))
		{
			Performer.SetPrompt(el);
		}
	},
	// open a popup window
	Pop: function(e)
	{
		Performer.Debug('Performer.Pop', 'function');
		var el = Event.findElement(e, 'A');
		// check the element has the required attributes and is a valid event trigger
		if (el.readAttribute && el.readAttribute('href') && el.readAttribute('rel') && el.readAttribute('rev') && (Event.isLeftClick(e) || e.keyCode == Event.KEY_RETURN))
		{
			var targetURL = el.readAttribute('href');
			var targetName = el.readAttribute('rel');
			var pageOptions = el.readAttribute('rev');
			Performer.Debug('-> Opening: ' + targetURL + ' with ' + pageOptions, 'function'); 
			var win = window.open(targetURL,targetName,pageOptions);
			if (window.focus) {win.focus()}
			Event.stop(e);
		}
	},
	// fade from one color to another - this relies on scriptaculous being used
	Fader: function(e)
	{
		Performer.Debug('Performer.Fader', 'function');
		var el = $(e);
		if (Effect && Effect.Highlight && el)
		{
			// get the end color
			var end_bg = Performer.GetColor(el.getStyle('backgroundColor'));
			var bg = '#FFEB8F';
			var dur = '3';
			var del = '1';
			// loop the classes
			el.classNames().each(function(cls)
			{
				// get the bg
				if (cls.match(/^bg-/)){ bg = cls.replace('bg-', ''); }
				// get the duration
				if (cls.match(/^duration-/)){ dur = cls.replace('duration-', ''); }
				// get the delay
				if (cls.match(/^delay-/)){ del = cls.replace('delay-', ''); }
			});
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
	GetColor: function(val)
	{
		Performer.Debug('Performer.GetColor(' + val + ')', 'function');
		if (val && val.length != 0)
		{
			val = val.toUpperCase();
			val = val.toLowerCase().replace(/#/g,'');
			if (val.length == 6)
			{
				color = '#' + val;
			}
			else if (val.length == 3)
			{
				color = val.substring(0, 1) + val.substring(0, 1);
				color = color + val.substring(1, 2) + val.substring(1, 2);
				color = color + val.substring(2, 3) + val.substring(2, 3);
				color = '#' + color;
			}
			else if (val.substring(0, 3) == 'rgb' && val.indexOf(',') != -1)
			{
				var vals = val.replace(/rgb\(|\)/g, "").split(",");
				r = parseInt(vals[0].replace(/ /g,''), 10).toString(16).toLowerCase();
				g = parseInt(vals[1].replace(/ /g,''), 10).toString(16).toLowerCase();
				b = parseInt(vals[2].replace(/ /g,''), 10).toString(16).toLowerCase();
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
	Debug: function(str, status)
	{
	    if (Performer.Debugging)
	    {
	        if ($('performerjsoutput') == null)
	        {
				var bodyhtml = document.getElementsByTagName('body')[0].innerHTML;
				bodyhtml = bodyhtml + '<div style="position:fixed;bottom:0;right:0;left:0;margin-top:height:400px"><p><a href="#" class="toggler" rel="performerjsbox" style="background:#333;color:#FFF;padding:0.3em 0.6em;margin-left:1em;-moz-border-radius-topright:5px;-moz-border-radius-topleft:5px;-webkit-border-top-right-radius:5px;-webkit-border-top-left-radius:5px;border:0;">Performer Debug Output</a></p><div class="hider" style="background:#333;" id="performerjsbox"><h3 style="border:0;font-family:Arial,sans-serif;padding:0.3em;margin:0;color:#FFF;">Performer Debug Output</h3><div id="performerjsoutput" style="padding:0.3em;margin:0.4em;height:400px;overflow:auto;background:#FFF;"></div></div>';
				document.getElementsByTagName('body')[0].innerHTML = bodyhtml;
	        }
	        var col = '#000';
	        if (status == 'function')
	        {
	            col = '#333';
	        } else if (status == 'subfunction')
	        {
	            col = '#AAA';
	        } else if (status == 'error')
	        {
	            col = '#900';
	        } else if (status == 'success')
	        {
	            col = '#090';
	        } else if (status == 'warning')
	        {
	            col = '#FFA800';
	        }
	        $('performerjsoutput').innerHTML += '<p style="margin:0.1em 0;padding:0;color:' + col + '">' + str + '</p>';
	    }
	}
}
// load Performer
Event.observe(window, 'load', Performer.Performer, false);
// hide .hider elements
document.write('<style type="text/css">.hider { display: none; }</style>');