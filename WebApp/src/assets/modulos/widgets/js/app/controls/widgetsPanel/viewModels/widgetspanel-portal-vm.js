/**
* @name widgetpanel-portal-vm | PortalVM
* @description VIEW-MODEL layer for widgetpanel-portal-vm
*/
define(
  [
    'knockout' // ko
  , 'pubsub' // PubSub
  ],
  function(ko, PubSub) {
    function PortalVM(widgetsPanelRepo) {
      var self = this;

      this.visible = ko.observable(false);
      this.title = ko.observable("Portais");
      this.widgets = ko.observableArray();

      this.load = function() {
        widgetsPanelRepo.getStoreWidgets('Portal', function(data) {
          self.widgets(data);
          PubSub.publish('draggables-creation');
        });
      }
    }

    return PortalVM;
  }
);
