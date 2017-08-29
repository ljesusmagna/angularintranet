/**
* @name widgetsPanel-panel-vm | PanelVM
* @description VIEW-MODEL layer for widgetpanel-app-tab
*/
define(
  [
    'knockout' // ko
  , 'pubsub' // PubSub
  ],
  function(ko, PubSub) {
    function PanelVM(widgetsPanelRepo) {
      var self = this;

      this.onCreating = function() { }
      function _onCreating() {
        if (typeof self.onCreating === 'function')
          self.onCreating();
      }

      this.visible = ko.observable(false);

      this.remove = function(widget) {
        widget.isRemoving(true);
        setTimeout(function() {
          widget.isVisible(false);
          self.widgets.remove(widget);
          PubSub.publish('panel-draggables-define-preferences');
        }, 500);
      }

      this.widgets = ko.observableArray([ ]);

      this.load = function() {
        widgetsPanelRepo.getUserWidgets(function(data) {
          _onCreating();

          if (data && data.length)
            for (var i = 0; i < data.length; i++) {
              var item = data[i];
              item.isRemoving = ko.observable(false);
              item.isVisible = ko.observable(true);

            }
          self.widgets(data);
          PubSub.publish('panel-draggables-creation');

          setTimeout(function() {
            PubSub.publish('loader-spin-widgets', { isLoading: false });
          }, 500);
        });
      }
    }

    return PanelVM;
  }
);
