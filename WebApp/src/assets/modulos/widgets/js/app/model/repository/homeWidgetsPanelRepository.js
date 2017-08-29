define(
  ['require',
   'services/whoamiTransaction',
   'repository/globalConfigurationsRepository'], function(require) {
  var whoamiTransaction = require("services/whoamiTransaction")
    , globalRepo = new (require('repository/globalConfigurationsRepository'))()
    , selectStore = "?$select=Code,Name,Description,IconFileName,Type&$filter=Type eq "
    , selectUserWidgets = "?$select=Code,Name,Description,IconFileName,Type"
    , getWidgetByCode = "?$top=1&$filter=Code eq ";

  function WidgetStoreView(guid, title, description, iconSrc, category, isPurchased) {
    this.guid = guid;
    this.title = title;
    this.description = description;
    this.iconSrc = iconSrc;
    this.category = category;
    this.isPurchased = isPurchased;
  }

  function Widget(guid, template, koViewModel) {
    this.guid = guid;
    this.ScriptView = template;
    this.ScriptViewModel = koViewModel;
  }

  function HomeWidgetsPanelRepository() {
    /**
    * @desc Updates user widgets preferences based on @see {@link widgets} for further information.
    * @param {Guid[]} widgets An ordered array with user widgets guids in 'N' format */
    this.defineWidgetsPreferences = function(widgets, onSuccess) {
      var postData = JSON.stringify(widgets);
      globalRepo.GetWidgetsModel(function(data) {
        whoamiTransaction({
          url: data.serviceURI+'/api/Widgets/SetWidgets'
        , method: "POST"
        , data: postData
        , contentType: "application/json; charset=utf-8"
        , dataType: "json"
        , success: function(data) {
            if (typeof onSuccess === 'function') {
              onSuccess();
            }
          }
        });
      });
    }

    /**
    * @desc StoreWidgets are models with description only. NOT functional.
    * @see {@link WidgetStoreView} for further information.
    * @param {string} category The category of widgets desired;
    * @return {WidgetStoreView[]} */
    this.getStoreWidgets = function(category, callBack) {
      globalRepo.GetWidgetsModel(function(data) {
        whoamiTransaction({
          url: data.serviceURI + "/odata/WidgetsOData"+selectStore+"'"+category+"'"
        , method: "GET"
        , success: function(data) {
            for (var i = 0; i < data.value.length; i++) {
              var item = data.value[i];
              item.IconFileName = '/assets/modulos/widgets/css/images/widgets/' + item.IconFileName;
            }
            callBack(data.value);
          }
        });
      });
    }

    /**
    * @desc StoreWidgets are models with description only. NOT functional
    * @see {@link Widget} for further information.
    * @return {Widget[]} */
    this.getWidget = function(code, callBack) {
      globalRepo.GetWidgetsModel(function(data) {
        $.get(data.serviceURI + "/odata/WidgetsOData"+getWidgetByCode+"'"+code+"'", function(data) {
          callBack(data.value[0]);
        });
      });
    }

    /**
    * @desc StoreWidgets are models with description only. NOT functional
    * @see {@link Widget} for further information.
    * @return {Widget[]} */
    this.getUserWidgets = function(callBack) {
      globalRepo.GetWidgetsModel(function(data) {
        whoamiTransaction({
          url: data.serviceURI +'/api/Widgets/MyWidgets'
        , crossDomain: true
        , method: "GET"
        , success: function(data) {
            callBack(data.Data) ;
          }
        });
      });
    }
  }

  return HomeWidgetsPanelRepository;
});
