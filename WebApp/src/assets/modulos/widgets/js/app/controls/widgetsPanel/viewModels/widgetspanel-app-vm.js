/**
* @name widgetpanel-app-vm | AppVM
* @description VIEW-MODEL layer for widgetpanel-app-tab
*/
define(
  [
    'knockout' // ko
  , 'pubsub' // PubSub
  ],
  function(ko, PubSub) {
    function AppVM(widgetsPanelRepo) {
      var self = this;

      this.visible = ko.observable(false);
      this.title = ko.observable("Aplicativos");
      this.widgets = ko.observableArray();

      this.load = function() {
        widgetsPanelRepo.getStoreWidgets('App', function(data) {
          self.widgets(data);
          PubSub.publish('draggables-creation');
        });
      }
    }

    return AppVM;
  }
);
