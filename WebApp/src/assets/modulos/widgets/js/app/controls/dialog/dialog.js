define(
  [
      'jquery' // $
    , 'handlebars' // Handlebars
    , 'text!./dialog.hbs.html' // hbs
    , 'utils/nowOrWhenReady' // NowOrWhenReady
    , 'utils/keyboardListener' // KeyboardListener
    , 'utils/hbsHelpers'
  ],
  function($, Handlebars, hbs, NowOrWhenReady, KeyboardListener) {
    var $hbs = $(hbs)

      , dialogPlaceHolderSource = $hbs.next('script.dialog-placeholder-control-template').html()
      , DialogPlaceHolderTemplate = Handlebars.compile(dialogPlaceHolderSource);

    /**
    * A Dialog.
    * @constructor
    */
    function Dialog(id) {
      var self = this
        , isOpen = false
        , $modalDocumentPlaceHolder
        , $modalWindow
        , $modalContentPlaceHolde
        , $window;

      NowOrWhenReady(function() {
        $('body')
          .append( DialogPlaceHolderTemplate({ id : id }) );

        $modalDocumentPlaceHolder = $('#'+id);
        $modalWindow = $modalDocumentPlaceHolder.find('.modal-body');
        $modalContentPlaceHolder = $modalWindow.find('.modal-contents .content-placeholder');
        $window = $(window);

        assignEvents();
      });

      function assignEvents() {
        var fn_close = function() { self.close() }
        $modalWindow
          .find('.close-button')
          .click(fn_close);

        KeyboardListener('Escape', fn_close);
      }

      /**
      * If not already opened, open the dialog.
      * @param e If fired by an mouseEvent, the event args must be passed to this function.
      */
      this.open = function(e) {
        if (isOpen === true) return;
        var fn_isOpen = function() { isOpen = true }
          , optsAnimation = {opacity: '1', height: '100vh', width: '100vw', 'border-radius': '0px'}
          , timeAnimation = 250;

        $modalDocumentPlaceHolder.show();
        $modalDocumentPlaceHolder.addClass('opening-or-opened')

        if(e) {
          var $caller = $(e.target)
            , offsetX = $caller.offset().left + e.offsetX - $window.scrollLeft()
            , offsetY = $caller.offset().top + e.offsetY - $window.scrollTop()

          optsAnimation.top = optsAnimation.left = '50%';
          $modalDocumentPlaceHolder
            .css({ top: offsetY+'px', left: offsetX+'px' })
            .animate(optsAnimation, timeAnimation, fn_isOpen);
        } else {
          $modalDocumentPlaceHolder
            .css({ top: '50%', left: '50%' })
            .animate(optsAnimation, timeAnimation, fn_isOpen);
        }
      }

      this.setContent = function(html) {
        $modalContentPlaceHolder.empty();
        $modalContentPlaceHolder.html(html);
      }

      this.close = function() {
        if (isOpen === false) return;

        if (self.onCloseRequest() === false) return;

        $modalDocumentPlaceHolder
          .animate({opacity: '0'}, 175,
            function() {
              $modalDocumentPlaceHolder.attr('style', '');
              $modalDocumentPlaceHolder.removeClass('opening-or-opened')
              $modalDocumentPlaceHolder.hide();
              isOpen = false;
              if (typeof self.onClosed === 'function') self.onClosed();
            }
          );
      }

      /**
      * @desc Override this method to determine an action before closing window
      * @return Returns true to continue closing or, otherwise, returns false to cancel closing
      */
      this.onCloseRequest = function() {
        return true;
      }

      /**
      * @desc Override this method to determine an action after window closed
      */
      this.onClosed = function() {
        return true;
      }

      this.get$DocumentPlaceHolder = function() {
        return $modalDocumentPlaceHolder;
      }
    }

    return Dialog;
  }
);
