/**
* @name dashboard-app-vm / DashboardVM
* @description VIEW-MODEL layer for dashboard-app-vm
*/
define(
  [
    'knockout' // ko
  , 'pubsub' // PubSub
  , 'controls/widgetsPanel/viewModels/widgetspanel-app-vm' //AppVM
  , 'controls/widgetsPanel/viewModels/widgetspanel-portal-vm' //PortalVM
  ],
  function(ko, PubSub, AppVM, PortalVM) {

    function DashboardVM(widgetsPanelRepo) {
      var self = this
        , tabsByName;

      this.title = ko.observable("DashBoard");
      this.currentTabName = ko.observable();
      this.appViewModel = ko.observable(new AppVM(widgetsPanelRepo));
      this.portalViewModel = ko.observable(new PortalVM(widgetsPanelRepo));

      tabsByName = {
        'Apps' : self.appViewModel
      , 'Portals' : self.portalViewModel
      }

      this.focusTab = function (tabName) {
        if (self.currentTabName() === tabName) return;

        tabsByName[tabName]().visible(true);

        if (self.currentTabName()) {
          tabsByName[self.currentTabName()]().visible(false);
        }

        self.currentTabName(tabName);
      }

      self.portalViewModel().load();
      self.appViewModel().load();
      self.focusTab('Apps');
    }

    return DashboardVM;
  }
);
