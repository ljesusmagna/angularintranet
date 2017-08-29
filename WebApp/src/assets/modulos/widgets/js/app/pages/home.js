requirejs(['../../common'],
function (common) {
  requirejs( [
    'jquery' // $
  , 'controls/widgetsPanel/widgetsPanel' // WidgetsPanel
  , 'repository/dumbWidgetsPanelRepository' // DumbWidgetsPanelRepo
  , 'utils/nowOrWhenReady' // NowOrWhenReady
  , 'bootstrap'
  ],

  function($, WidgetsPanel, DumbWidgetsPanelRepo, NowOrWhenReady) {

    NowOrWhenReady(function() {
      var widgets = new WidgetsPanel('.widgets-place-holder', new DumbWidgetsPanelRepo());
      $('#btn-show-widgets').click(function(e) { widgets.showOptionWindow(e) });
    });

  })
});
