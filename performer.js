/*

Performer JavaScript library
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
* For any reuse or distribution, you must make clear to others the license terms of this work. The best way to do this is with a link to this web page.
* Any of the above conditions can be waived if you get permission from the copyright holder.
* Nothing in this license impairs or restricts the author's moral rights.

*/
var Performer =
{
	Init: function()
	{
		// do the transformations
		Performer.DoTransformers();
		// set up listeners
		Performer.DoListeners();
		// set up global variables
		Performer.FillerElement;
		Performer.TextValue;
	},
	DoListeners: function()
	{
		Performer.Listeners('toggler','Toggle','click');
		Performer.Listeners('switcher','Switch','click');
		Performer.Listeners('loader','Load','click');
		Performer.Listeners('toggleloader','ToggleLoad','click');
		Performer.Listeners('sizer','Size','click');
		Performer.Listeners('tabber','Tab','click');
		Performer.Listeners('selector','Select','change,keyup');
		Performer.Listeners('limiter','Limit','keyup');
		Performer.Listeners('editor','Edit','click,keyup');
		Performer.Listeners('uneditor','UnEdit','click,keyup');
		Performer.Listeners('prompter','RemovePrompt','focus');
		Performer.Listeners('prompter','CheckPrompt','blur');
		Performer.Listeners('popper','Pop','click,keyup');
		Performer.Listeners('passwordchecker','CheckPassword','keyup');
		Performer.Listeners('matcher','Match','keyup');
	},
	DoTransformers: function()
	{
		Performer.Transformers('hider','Hide');
		Performer.Transformers('shower','Show');
		Performer.Transformers('focusser','Focus');
		Performer.Transformers('limiter','LimitNotifier');
		Performer.Transformers('reloader','Reload');
		Performer.Transformers('preloader', 'Preload');
		Performer.Transformers('prompter','SetPrompt');
	},
    // listen for the required classnames
    Listeners: function(className,f,event)
    {
        $$('.' + className).each(function(element)
        {
            event.split(',').each(function(event)
            {
                Event.observe(element, event, Performer[f], false);
            });
        });
    },
    // transform the required classnames
    Transformers: function(className,f)
    {
        $$('.' + className).each(function(element)
        {
            Performer[f](element);
        });
    },
    // send a list selection to a remote page
    Select: function(e)
    {
      var el = Event.element(e);
      // check the element has the required attributes
      if (el.readAttribute && el.readAttribute('id') && el.readAttribute('name') && el.readAttribute('class'))
      {
        // get the classes
        var classes = el.readAttribute('class').split(' ');
        // loop the classes, trying to get the rev and rel
        for (var i=0; i<classes.length; i++)
        {
          // targetEl
          if (classes[i].match(/^targetEl-/)){ var targetEl = classes[i].replace('targetEl-', ''); }
          // targetPage
          if (classes[i].match(/^targetPage-/)){ var targetPage = classes[i].replace('targetPage-', ''); }
        }
        // check we have a targetPage and targetEl
        if (targetPage && targetEl)
        {
           // check the target element can be found
           if ($(targetEl))
           {
             Performer.FillerElement = targetEl;
             $Loader = new Ajax.Request(targetPage + '?selection=' + el.getValue(), {method: 'post', onComplete: Performer.FillAndInit});
           }
        }
      }
    },
    // check the strength of a password
    CheckPassword: function(e)
    {
        var el = Event.element(e);
        // check the element has the required attributes
        if (el.readAttribute && el.readAttribute('id') && el.readAttribute('name') && el.readAttribute('class'))
        {
          // get the classes
          var classes = el.readAttribute('class').split(' ');
          // loop the classes, trying to get the rev and rel
          for (var i=0; i<classes.length; i++)
          {
            // notifyEl
            if (classes[i].match(/^notifyEl-/)){ var notifyEl = classes[i].replace('notifyEl-', ''); }
          }
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
        var el = Event.element(e);
        // check the element has the required attributes
        if (el.readAttribute && el.readAttribute('id') && el.readAttribute('name') && el.readAttribute('class'))
        {
          // get the classes
          var classes = el.readAttribute('class').split(' ');
          // loop the classes, trying to get the rev and rel
          for (var i=0; i<classes.length; i++)
          {
            // notifyEl
            if (classes[i].match(/^notifyEl-/)){ var notifyEl = classes[i].replace('notifyEl-', ''); }
            // matchEl
            if (classes[i].match(/^matchEl-/)){ var matchEl = classes[i].replace('matchEl-', ''); }
          }
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
    Toggle: function(e,c)
    {
	r = false;
	var el = Event.findElement(e, 'A');
        // check the element has the required attribute
        if (el.readAttribute && el.readAttribute('rel'))
        {
            var targetEl = el.readAttribute('rel');
            // check the target element can be found
            if ($(targetEl))
            {
		// toggle the visibility
                if (!$(targetEl).visible())
                {
		    el.addClassName('toggleropen');
                    $(targetEl).show();
                    r = true;
                } else {
		    el.removeClassName('toggleropen');
                    $(targetEl).hide();
                    r = false;
                }
            }
        }
        if (!c) Event.stop(e);
        return r;
    },
    // switch visibility of two element
    Switch: function(e,c)
    {
	r = false;
        //var el = Event.element(e);
	var el = Event.findElement(e, 'A');
        // check the element has the required attribute
        if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev'))
        {
            var targetEl1 = el.readAttribute('rel');
	    var targetEl2 = el.readAttribute('rev');
            // check the target elements can be found
            if ($(targetEl1) && $(targetEl2))
            {
		// toggle the visibility
                if (!$(targetEl1).visible())
                {
                    $(targetEl1).show();
		    $(targetEl2).hide();
                    r = true;
                } else {
                    $(targetEl2).show();
		    $(targetEl1).hide();
                    r = false;
                }
            }
        }
        if (!c) Event.stop(e);
        return r;
    },
    // focus the element
    Focus: function(e)
    {
        var el = $(e);
        if (el)
        {
            $(el).focus();
        }        
    },
    // resize the element
    Size: function(e)
    {
        var el = Event.findElement(e, 'A');
        // check the element has the required attributes
        if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev'))
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
                    $(targetEl).setStyle({ height: newHeight });
                }
                if (width != 0)
                {
                    var newWidth = (parseFloat(width) + parseFloat(currentWidth)) + 'px';
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
	var el = Event.element(e);
        // check the element has the required attributes
        if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev'))
        { 
           var targetEl = el.getAttribute('rel');
           // check the target element can be found
           if ($(targetEl))
           {
             if (Performer.Toggle(e,true))
             {
               Performer.Load(e,true,true);
             }
           }
        }
        Event.stop(e);
    },
    // toggle tabs
    Tab: function(e)
    {
        var el = Event.findElement(e, 'A');
        // check the element has the required attributes
        if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev'))
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
                    $(tabs[i]).hide();
                }
		el.addClassName('tabbercurrent');
                // show the required tab
                $(openTab).show();
            }
        }
        Event.stop(e);
    },
    // load data into an element
    Load: function(e,c,s)
    {
        var el = Event.findElement(e, 'A');
        // check the element has the required attributes
        if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev'))
        {
            var targetEl = el.readAttribute('rel');
            var targetPage = el.readAttribute('rev');
            // check the target element can be found
            if ($(targetEl))
            {
	        $(targetEl).addClassName('loaderloading');
                Performer.FillerElement = targetEl;
		if(!s)
		{
			$Loader = new Ajax.Request(targetPage, {method: 'get', onComplete: Performer.FillAndInit});
		} else {
			$Loader = new Ajax.Request(targetPage, {method: 'get', onComplete: Performer.Fill});
		}
            }
        }
        if (!c) Event.stop(e);
    },
    // load data into an element on a regular basis
    Reload: function(e)
    {
        var el = Event.findElement(e, 'A');
        // check the element has the required attributes
        if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev'))
        {
            var delay = el.readAttribute('rel');
            var targetPage = el.readAttribute('rev');
            Performer.FillerElement = targetEl;
            $Loader = new Ajax.Request(targetPage, {method: 'get', onComplete: Performer.Fill});
        }
        if (!c) Event.stop(e);
        Performer.DoTransformers();
    },
    // load data into an element when the page loads
    Preload: function(e)
    {
        var el = $(e);
	// check the element has the required attributes
	if (el.readAttribute && el.readAttribute('rel'))
        {
	    var targetPage = el.readAttribute('rel');
	    Performer.FillerElement = e;
	    $Loader = new Ajax.Request(targetPage, {method: 'get', onComplete: Performer.Fill});
	}
    },
    // fill an element with data
    Fill: function(request)
    {
        var text = request.responseText;
        // check the target element can be found
        if ($(Performer.FillerElement))
        {
            $(Performer.FillerElement).innerHTML = text;
	    $(Performer.FillerElement).removeClassName('loaderloading');
        }
    },
    // fill an element with data then initialise the Performer functions
    FillAndInit: function(request)
    {
        var text = request.responseText;
        // check the target element can be found
        if ($(Performer.FillerElement))
        {
            $(Performer.FillerElement).innerHTML = text;
	    $(Performer.FillerElement).removeClassName('loaderloading');
        }
	Performer.Init();
    },
    // hide a hider element
    Hide: function(e)
    {
        var el = $(e);
        if (el)
        {
            el.hide();
        }
    },
    // show a shower element
    Show: function(e)
    {
        var el = $(e);
        if (el)
        {
            el.removeClassName('shower');
        }
    },
    // get the parameters for a limiter
    GetLimitParams: function(el)
    {
        // check the element has the required attributes and is an input or textarea
        if (el.readAttribute && el.readAttribute('id') && el.classNames() && (el.type == 'textarea' || el.type == 'text'))
        {
            var targetEl;
            var lengthLimit;
            // loop the classes, trying to get the rev and rel
            el.classNames().each(function(cls)
            {
                // targetEl
                if (cls.match(/^targetEl-/)){ targetEl = cls.replace('targetEl-', ''); }
                // targetPage
                if (cls.match(/^lengthLimit-/)){ lengthLimit = cls.replace('lengthLimit-', ''); } else { lengthLimit = 255; }
            })
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
        var el = Event.element(e);
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
        var el = Event.element(e);
        if (el.readAttribute && el.readAttribute('id') && el.classNames())
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
                Performer.Init();
            }
        }
    },
    // build the element editing form
    BuildEditForm: function(el,targetPage)
    {
        if (el && $(el) && targetPage)
        {
            var value = $(el).innerHTML;
            var editForm;
            editForm = '<form id="' + $(el).id + '-editor" class="performer-editor" action="' + targetPage + '" method="post">\n';
            editForm += '<fieldset>\n';
	    editForm += '<input type="text" id="' + $(el).id + '-value" name="' + $(el).id + '" value="' + value + '" />\n';
            editForm += '<input type="submit" id="' + $(el).id + '-save" name="' + $(el).id + '-save" value="Save" />\n';
            editForm += '<a href=\"#\" class="uneditor" rel="' + $(el).id + '">Cancel</a>\n';
            editForm += '</fieldset>\n';
            editForm += '</form>\n';
            return editForm;
        }
    },
    // cancel a Performer.Edit command and return the element to normal
    UnEdit: function(e)
    {
        var el = Event.element(e);
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
	if (el.readAttribute && el.readAttribute('id') && el.readAttribute('title') && el.value == "" && (el.type == 'textarea' || el.type == 'text'))
	{
		el.addClassName("performer-prompter");
		el.value = el.readAttribute('title');
	}
    },
    RemovePrompt: function(e)
    {
	var el = Event.element(e);
        if (el.readAttribute && el.readAttribute('id') && el.readAttribute("title")&& (el.value == el.readAttribute("title")) && (el.type == 'textarea' || el.type == 'text'))
        {
		el.value = "";
		el.removeClassName("performer-prompter");
	}
    },
    CheckPrompt: function(e)
    {
	var el = Event.element(e);
	if (el.readAttribute && el.readAttribute('id') && el.readAttribute("title")&& (el.value == "") && (el.type == 'textarea' || el.type == 'text'))
	{
		Performer.SetPrompt(el);
	}
    },
    // open a popup window
    Pop: function(e)
    {
        var el = Event.element(e);
        // check the element has the required attributes
        if (el.readAttribute && el.readAttribute('href') && el.readAttribute('rel') && el.readAttribute('rev'))
        {
            var targetURL = el.readAttribute('href');
			var targetName = el.readAttribute('rel');
            var pageOptions = el.readAttribute('rev');
			var win = window.open(targetURL,targetName,pageOptions);
			if (window.focus) {win.focus()}
			Event.stop(e);
		}
	}
}
// load Performer
Event.observe(window, 'load', Performer.Init, false);