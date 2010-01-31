/*

Performer JavaScript library
Created by Chris Taylor (from http://www.stillbreathing.co.uk)
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
        // set up listeners
        Performer.Transformers('hider','Hide');
        Performer.Transformers('focusser','Focus');
        Performer.Listeners('toggler','Toggle','click');
        Performer.Listeners('loader','Load','click');
        Performer.Listeners('toggleloader','ToggleLoad','click');
        Performer.Listeners('sizer','Size','click');
        Performer.Listeners('tabber','Tab','click');
        Performer.Listeners('selector','Select','change,keyup');
        // set up global variables
        Performer.FillerElement;
    },
    // listen for the required classnames
    Listeners: function(className,f,event)
    {
        // get all the elements with this classname
        var Els = document.getElementsByClassName(className);
        // if there were elements found
        if (Els.length > 0)
        {
            // loop the elements
            for (var i=0; i<Els.length; i++)
            {
                // if there are multiple events to listen for, get each of them
                var events = event.split(',');
                if (events.length > 1)
                {
                  for (var x=0; x<events.length; x++)
                  {
                    // listen for this event and do the function
                    Event.observe(Els[i], events[x], Performer[f], false);
                  }
                } else {
                  // listen for the event and do the function
                  Event.observe(Els[i], event, Performer[f], false);
                }
            }
        }
    },
    // transform the required classnames
    Transformers: function(className,f)
    {
        // get all the elements with this classname
        var Els = document.getElementsByClassName(className);
        // if there were elements found
        if (Els.length > 0)
        {
            // loop the elements
            for (var i=0; i<Els.length; i++)
            {
                // when the element loads do the function
                Performer[f](Els[i]);
            }
        }
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
          if (classes[i].substring(0,9) == 'targetEl-'){ var targetEl = classes[i].replace('targetEl-', ''); }
          // targetPage
          if (classes[i].substring(0,11) == 'targetPage-'){ var targetPage = classes[i].replace('targetPage-', ''); }
        }
        // check we have a targetPage and targetEl
        if (targetPage && targetEl)
        {
           // check the target element can be found
           if ($(targetEl))
           {
             Performer.FillerElement = targetEl;
             $Loader = new Ajax.Request(targetPage + '?selection=' + el.getValue(), {method: 'post', onComplete: Performer.Filler});
           }
        }
      }
    },
    // toggle element
    Toggle: function(e,c)
    {
        var el = Event.element(e);
        // check the element has the required attribute
        if (el.readAttribute && el.readAttribute('rel'))
        {
            var targetEl = el.readAttribute('rel');
            // check the target element can be found
            if ($(targetEl))
            {
                if ($(targetEl).getStyle('display') == 'none')
                {
                    $(targetEl).setStyle({ display: '' });
                    r = true;
                } else {
                    $(targetEl).setStyle({ display: 'none' });
                    r = false;
                }
            }
        }
        if (!c) Event.stop(e);
        Performer.Listeners();
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
        var el = Event.element(e);
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
        Performer.Listeners();
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
               Performer.Load(e,true);
             }
           }
        }
        Event.stop(e);
        Performer.Listeners();
    },
    // toggle tabs
    Tab: function(e)
    {
        var el = Event.element(e);
        // check the element has the required attributes
        if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev'))
        {
            var tabGroup = el.readAttribute('rel');
            var openTab = el.readAttribute('rev');
            // check the tabgroup can be found
            if ($(tabGroup))
            {
                // hide all the tabs
                var tabs = $(tabGroup).getElementsByClassName('tab');
                for (var i=0; i<tabs.length; i++)
                {
                    $(tabs[i]).setStyle({ display: 'none' });
                }
                // show the required tab
                $(openTab).setStyle({ display: '' });
            }
        }
        Event.stop(e);
    },
    // load data into an element
    Load: function(e,c)
    {
        var el = Event.element(e);
        // check the element has the required attributes
        if (el.readAttribute && el.readAttribute('rel') && el.readAttribute('rev'))
        {
            var targetEl = el.readAttribute('rel');
            var targetPage = el.readAttribute('rev');
            // check the target element can be found
            if ($(targetEl))
            {
                Performer.FillerElement = targetEl;
                $Loader = new Ajax.Request(targetPage, {method: 'get', onComplete: Performer.Filler});
            }
        }
        if (!c) Event.stop(e);
        Performer.Listeners();
    },
    // fill an element with data
    Filler: function(request)
    {
        var text = request.responseText;
        // check the target element can be found
        if ($(Performer.FillerElement))
        {
            $(Performer.FillerElement).innerHTML = text;
        }
    },
    // hide a hider element
    Hide: function(e)
    {
        var el = $(e);
        if (el)
        {
            el.setStyle({ display: 'none' });
        }
    }
}
// load Performer
Event.observe(window, 'load', Performer.Init, false);