define(
  [
      'jquery' // $
    , 'knockout' // ko
    , 'pubsub' // PubSub
    , 'text!./koLoader.html' // templateElement
  ],
  function($, ko, PubSub, templateElement) {
    var $templateElement = $(templateElement)
      , template = $templateElement.html();

    ko.components.register('loader-spin', {
      viewModel: ViewModel,
      template: template
    });

    function ViewModel(params) {
      var self = this;

      this.topic = ((params && params.topic)
                    || console.log('You didnt setted a topic for loader-spin')
                    || 'global');
      this.message = ko.observable(params && params.message || 'Carregando...');
      this.isLoading = ko.observable(true);

      PubSub.subscribe('loader-spin-' + self.topic, progress);

      function progress(msg, data) {
        if (data) {
          if (!(typeof data.isLoading === 'undefined')) self.isLoading(data.isLoading);
          if (data.message) self.message(data.message);
        }
      }
    }
  }
);
