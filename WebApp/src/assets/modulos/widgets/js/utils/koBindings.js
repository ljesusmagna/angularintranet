define(['jquery', 'knockout', 'moment', 'jquery-ui'], function($, ko) {
  ko.bindingHandlers.asWidget = {
      init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var widget = valueAccessor()
          , template = widget.ScriptView
          , $element = $(element)
          , parent = bindingContext.$parent;

        var vm = new Function(getAdornedViewModelToFunctionWithKoParam(widget.ScriptViewModel))
          , datePart = (new Date()).getTime()
          , ultraSafeName = 'd_'+(datePart + Math.floor(Math.random()*100000))
          , ultraSafeTag = ultraSafeName + '-widget'
          , html = '<'+ultraSafeTag+'></'+ultraSafeTag+'>';

        if(template.indexOf('cptmsp.sharepoint.com') > 0) {
          var $template = $('<div>'+template+'</div>');
          $template
            .find('a[href*="https://cptmsp.sharepoint.com/"]')
            .each(function(idx, value) {
              var $value = $(value);
              var href = $value.attr('href');
              var origin = window.location.protocol + "//" + window.location.hostname;
              var hash = /#/;
              href += hash.test(href)
                ? "&origin=" + origin
                : "#origin=" + origin;
              $value.attr('href', href);
            });
          template = $template.html();
        }

        ko.components.register(ultraSafeTag, {
            viewModel: vm()(ko),
            template: template
          });

        $element
          .empty()
          .html(html);
      }
  };

  function getAdornedViewModelToFunctionWithKoParam(originalSrc) {
    //Explanation:
    // (function(ko) { return
    //   /*we got from here*/
    //   function(params) {
    //   }/*to here*/
    // })
    return 'return (function(ko) { return ' + originalSrc + '})';
  }

  ko.bindingHandlers.datepicker = {
    init: function(element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().datepickerOptions || {},
            $el = $(element);

        //initialize datepicker with some optional options
        $el.datepicker(options);

        //handle the field changing
        ko.utils.registerEventHandler(element, "change", function() {
            var observable = valueAccessor();
            observable($el.datepicker("getDate"));
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            $el.datepicker("destroy");
        });

    },
    update: function(element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            $el = $(element),
            current = $el.datepicker("getDate");

        if (value - current !== 0) {
            $el.datepicker("setDate", value);
        }
    }
  };

  ko.bindingHandlers.radio = {
    init: function(element, valueAccessor, allBindings, data, context) {
      var $buttons, $element, observable;
      observable = valueAccessor();
      if (!ko.isWriteableObservable(observable)) {
        throw "You must pass an observable or writeable computed";
      }
      $element = $(element);
      if ($element.hasClass("btn")) {
        $buttons = $element;
      } else {
        $buttons = $(".btn", $element);
      }
      elementBindings = allBindings();
      $buttons.each(function() {
        var $btn, btn, radioValue;
        btn = this;
        $btn = $(btn);
        radioValue = elementBindings.radioValue || $btn.attr("data-value") || $btn.attr("value") || $btn.text();
        $btn.on("click", function() {
          observable(ko.utils.unwrapObservable(radioValue));
        });
        return ko.computed({
          disposeWhenNodeIsRemoved: btn,
          read: function() {
            $btn.toggleClass("active", observable() === ko.utils.unwrapObservable(radioValue));
          }
        });
      });
    }
  };

  ko.bindingHandlers.datepicker = {
    init: function(element, valueAccessor, allBindingsAccessor) {
      //initialize datepicker with some optional options
      var options = allBindingsAccessor().datepickerOptions || {format: 'DD/MM/YYYY'};
      $(element).datepicker(options);

      //when a user changes the date, update the view model
      ko.utils.registerEventHandler(element, "dp.change", function(event) {
        var value = valueAccessor();
        if (ko.isObservable(value)) {
          value(event.date);
        }
      });
    },
    update: function(element, valueAccessor)   {
       var widget = $(element).data("DateTimePicker");
       //when the view model is updated, update the widget
       if (widget) {
           var date = ko.utils.unwrapObservable(valueAccessor());
           widget.date(date);
       }
    }
 };

 ko.bindingHandlers.highlighting = {
   init: function(element, valueAccessor, allBindingsAccessor) {
     var text = valueAccessor().text;
     var highlight = valueAccessor().highlight;
     var $element = $(element);

     var content = $('<div/>').text(text).html();
     content = content.replace(new RegExp(highlight, 'gi'), '<span class="highlight">$&</span>');

     $element.html(content);
   },
   update: function(element, valueAccessor) {
   }
 };
  return ko;
});
