/**
* @name widgetsPanel CONTROLLER
* @description CONTROLLER layer for widgetsPanel
*/
define(
  [
      'jquery' // $
    , 'knockout' // ko
    , 'handlebars' // Handlebars
    , 'pubsub' // PubSub

    , 'text!./widgetsPanel.hbs.html' // hbs
    , 'controls/dialog/dialog' // Dialog

    , 'controls/widgetsPanel/viewModels/dashboard-app-vm' //DashboardViewModel - Dialog
    , 'controls/widgetsPanel/viewModels/widgetsPanel-panel-vm' //PanelViewModel - Panel

    , 'controls/koLoader/koLoader'
    , 'jquery-ui'
    , 'utils/hbsHelpers'
    , 'utils/koBindings'
  ],
  function($, ko, Handlebars, PubSub, hbs, Dialog, DashboardViewModel, PanelViewModel) {
    var widgetsDialogTemplate
      , widgetsPanelTemplate
      , optionsDialog = new Dialog('widgets-dialog');

    /**
    * A WidgetsPanel.
    * @constructor
    */
    function WidgetsPanel(placeHolderSelector, widgetsPanelRepo, options) {
      var self = this
        , inEditMode = false
        , $placeHolder = $(placeHolderSelector).slice(0,1) //Yeah, just 1
        , $controlPanel
        , $primaryMenuButtons
        , $selectedItem
        , isDialogContentLoaded = false
        , panelVM = new PanelViewModel(widgetsPanelRepo);

      loadHandlebarsTemplates(options);
      function loadHandlebarsTemplates(opt) {
        var $hbs = $(hbs)
          , widgetsDialogSource
          , widgetsPanelSource;

        widgetsDialogSource = (opt && opt.$dialogTemplate) ?
          opt.$dialogTemplate.html() :
          $hbs.closest('script.widgetsPanel-dialog-template').html();

        widgetsPanelSource = (opt && opt.$panelTemplate) ?
          opt.$panelTemplate.html() :
          $hbs.closest('script.widgetsPanel-panel-template').html();

        widgetsDialogTemplate = Handlebars.compile(widgetsDialogSource);
        widgetsPanelTemplate = Handlebars.compile(widgetsPanelSource);
      }

      optionsDialog.onClosed = function() {
        inEditMode = false;
      }

      panelVM.onCreating = function() {
        $controlPanel = $placeHolder.find('.widgetsPanel-control .widgetsPanel-list');
        $controlPanel.empty();
      }

      this.showOptionWindow = function(e) {
        inEditMode = true;
        optionsDialog.open(e);
        bindEventsIfFirstTime();
      }

      function onPanelCreation() {
        $controlPanel = $placeHolder.find('.widgetsPanel-control .widgetsPanel-list');
        $controlPanel
        .sortable({
          disableSelection: true
          , forcePlaceholderSize : true
          , stop: function(e, elt) { PubSub.publish('panel-draggables-define-preferences'); }
          , beforeStop: function(e, elt) {
            var $obj = $(elt.helper[0]);

            if ($obj.data('loaded') == true) return;
            $obj.addClass('purchased-now');//.css({width:'390px', height:'115px'});
          }
        })
        .disableSelection();
      }

      function bindEventsIfFirstTime() {
        if (isDialogContentLoaded) return;
        PubSub.subscribe('draggables-creation', onDraggablesCriation);

        ko.applyBindings(
          new DashboardViewModel(widgetsPanelRepo),
          document.getElementById("widgets-dialog")
        );

        isDialogContentLoaded = true;
      }

      function onDraggablesCriation() {
        var targetPanelSelector = placeHolderSelector + " .widgetsPanel-control .widgetsPanel-list"
          , $targetPanel = $(targetPanelSelector)
          , $currentDraggable
          , begin
          , cssOffset
          , onStopActionHasBeenExecuted
          , $dialog = optionsDialog.get$DocumentPlaceHolder()
          , $draggables = optionsDialog
                            .get$DocumentPlaceHolder()
                            .find('.draggable-widget-definition:not(.purchased)')
          , fn_onStart = function( e, ui ) {
              onStopActionHasBeenExecuted = false;
              begin = { X: e.clientX, Y: e.clientY };
              $currentDraggable = $(ui.helper[0]);
              $dialog.css('margin-top', '100%');
            }
          , fn_onDrag = function(e) {
              cssOffset = { left: e.clientX - begin.X, top: e.clientY - begin.Y };
            }
          , fn_onMouseUp = function() {
              onStopActionHasBeenExecuted = true;
              $dialog.css('margin-top', '0');
              if($currentDraggable)
                $currentDraggable.css(cssOffset);
            }
          , fn_onStop = function(e) {
              PubSub.publish('panel-draggables-define-preferences');
              if (!onStopActionHasBeenExecuted)
                fn_onMouseUp();
            }
          , fn_click = function(e, ui) {
              $targetPanel.append($(e.currentTarget).addClass('purchased-now'));
              PubSub.publish('panel-draggables-define-preferences');
            };

        $draggables.draggable({
            connectToSortable: targetPanelSelector
          , cursorAt: { left: 188, top: 57 }
          , revert: "invalid"
          , start : fn_onStart
          , drag : fn_onDrag
          , stop : fn_onStop
          }
        )
        .click(fn_click)
        .mouseup(fn_onMouseUp);
      }

      function defineWidgetsPreferences() {
        var targetChilds = $placeHolder.find('.widgetsPanel-control .widgetsPanel-list > li[data-code]')
          , newOderedList = [];

          targetChilds.each(function(idx, item) {
            newOderedList.push($(item).attr('data-code'));
          });

          widgetsPanelRepo.defineWidgetsPreferences(newOderedList, (!inEditMode || panelVM.load));
      }

      function selectTab(e) {
        var $this = $(e.delegateTarget)
          , tabName = $this.data('tab');

        if($selectedItem) $selectedItem.removeClass('active');
        $selectedItem = $this;
      }

      optionsDialog.setContent(widgetsDialogTemplate());
      optionsDialog.onCloseRequest = function() {
        widgetsPanelRepo.update
        return true;
      }

      $placeHolder
        .empty()
        .html(widgetsPanelTemplate())
        .each(function() { ko.applyBindings(panelVM, this) });

      PubSub.subscribe('panel-draggables-creation', onPanelCreation);
      PubSub.subscribe('panel-draggables-define-preferences', defineWidgetsPreferences);
      panelVM.load();
    }

    return WidgetsPanel;
  }
);
