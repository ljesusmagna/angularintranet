define(
  ['require'], function(require) {

  function WidgetStoreView(guid, title, description, iconSrc, category, isPurchased) {
    this.Name = title;
    this.Description = description;
    this.Code = guid;

    this.guid = guid;
    this.title = title;
    this.iconSrc = iconSrc;
    this.category = category;
    this.isPurchased = isPurchased;
  }

  function Widget(guid, template, koViewModel) {
    this.guid = guid;
    this.Code = guid;
    this.ScriptView = template;
    this.ScriptViewModel = koViewModel;
  }

  function HomeWidgetsPanelRepository() {
    var self = this;
    /**
    * @desc Updates user widgets preferences based on @see {@link widgets} for further information.
    * @param {Guid[]} widgets An ordered array with user widgets guids in 'N' format */
    this.defineWidgetsPreferences = function(widgets, onSuccess) {
      var postData = JSON.stringify(widgets);
      localStorage.setItem('WidgetsPreferences', postData);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }

    /**
    * @desc StoreWidgets are models with description only. NOT functional.
    * @see {@link WidgetStoreView} for further information.
    * @param {string} category The category of widgets desired;
    * @return {WidgetStoreView[]} */
    this.getStoreWidgets = function(category, callBack) {
      var storeItems = [];
      for (var i = 0; i < GLOBAL_WIDGETS.length; i++) {
        storeItems.push(GLOBAL_WIDGETS[i].Store);
      }
      callBack(storeItems);
    }

    /**
    * @desc StoreWidgets are models with description only. NOT functional
    * @see {@link Widget} for further information.
    * @return {Widget[]} */
    this.getWidget = function(code, callBack) {
      for (var i = 0; i < GLOBAL_WIDGETS.length; i++) {
        var storeWidget = GLOBAL_WIDGETS[i].Widget;
        if (storeWidget.guid === code) {
          callBack(storeWidget);
        }
      }
    }

    /**
    * @desc StoreWidgets are models with description only. NOT functional
    * @see {@link Widget} for further information.
    * @return {Widget[]} */
    this.getUserWidgets = function(callBack) {
      var widgetsPreferences = JSON.parse(localStorage.getItem('WidgetsPreferences'));
      if (!widgetsPreferences || !widgetsPreferences.length) {
        self.defineWidgetsPreferences(['guid_1', 'guid_2']);
        self.getUserWidgets(callBack);
      } else {
        var result = [];
        for (var i = 0; i < GLOBAL_WIDGETS.length; i++) {
          var storeWidget = GLOBAL_WIDGETS[i].Widget;
          for (var j = 0; j < widgetsPreferences.length; j++) {
            var userWidgetGuid = widgetsPreferences[j];
            if (storeWidget.guid === userWidgetGuid) {
              result.push(storeWidget);
            }
          }
        }
        callBack(result);
      }
    }
  }

  var GLOBAL_WIDGETS = [
    {
      "Store": new WidgetStoreView('guid_1', 'teste', 'teste desc', '/', 'portal', true),
      "Widget": makeWidget('guid_1', 'pink', '1')
    },
    {
      "Store": new WidgetStoreView('guid_2', 'teste', 'teste desc', '/', 'portal', true),
      "Widget": makeWidget('guid_2', 'purple', '1')
    },
    {
      "Store": new WidgetStoreView('guid_3', 'teste', 'teste desc', '/', 'portal', true),
      "Widget": makeWidget('guid_3', 'red', '1')
    },
    {
      "Store": new WidgetStoreView('guid_4', 'teste', 'teste desc', '/', 'portal', true),
      "Widget": makeWidget('guid_4', 'yellow', '1')
    },
  ]

  function makeWidget(guid, color, text) {
    var template = "";
    template += "<p style=\"";
    template += "        display: block;";
    template += "        width: 100%;";
    template += "        height: 100%;";
    template += "        background: "+color+";";
    template += "        border-radius: 5px;";
    template += "\"> "+text+" <\/p>";

    var viewModel = "(function functioNameOnlyForCompilePurpose(params) { })";

    return new Widget(guid, template, viewModel);
  }

  return HomeWidgetsPanelRepository;
});
