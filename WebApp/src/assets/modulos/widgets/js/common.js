requirejs.config({
    baseUrl: '/assets/modulos/widgets/js/lib'
  , paths: {
        "app": '../app'
      , "repository": '../app/model/repository'
      , "services": '../app/services'
      , "templates": '../app/templates'
      , "Q": 'q'
      , "handlebars": 'handlebars.amd.min'
      , "utils": '../utils/'
      , "controls": '../app/controls'
      , "bindingHandlers": '../app/bindingHandlers'
      , "jquery": 'jquery-2.2.3.min'
      , "moment": 'moment.min'
      , "knockout": 'knockout-3.4.0'
      , "knockout.mapping": 'plugins/knockout.mapping.2.4.1'
      , "knockout.validation": 'plugins/knockout.validation.min'
      , "jquerychosen": 'plugins/chosen.jquery.min'
      , "jquery-ui": 'plugins/jquery-ui.min'
      , "pubsub": 'pubsub.min'
      , "masonry": 'plugins/masonry.pkgd.min'
      , "jsencrypt": 'jsencrypt.min'
      , "bootstrap": 'bootstrap.min'
      , "plugins/jqueryNoty": 'plugins/jquery.noty.packaged.min'
      , "plugins/jqueryDatables": 'plugins/jquery.dataTables.min'
      , "plugins/portamento": 'plugins/portamento-min'
      , "underscore": 'underscore-min'
    }
  , shim: {
        'Q': { exports: 'Q' }
      , 'breeze' : { deps: [ 'Q' ] }
      , 'breeze' : { deps: [ 'Q' ] }
      , 'jquerychosen' : { deps: [ 'jquery' ] }
      , 'jquery-ui' : { deps: [ 'jquery' ] }
      , 'bootstrap' : { deps :[ 'jquery' ] }
      , 'plugins/portamento' : { deps :[ 'jquery' ] }
      , 'plugins/jqueryNoty' : { deps :[ 'jquery' ] }
      , 'plugins/jqueryDatables' : { deps :[ 'jquery' ] }
      , 'plugins/knockout.validation.localization.pt-br' : { deps :[ 'knockout.validation' ] }
    }
  , map: {
        '*': {
            'jquery-ui': 'wrappers/jquery-ui.wrapper'
        },
        'wrappers/jquery-ui.wrapper': {
            'jquery-ui': 'jquery-ui'
        },
        'services' : {
          'whoamiTransaction': 'whoamiTransaction.dist'
        , 'secure': 'secure.dist'
        }
    }
});



// Sharepoint Online
// var _APP_CPTM = _APP_CPTM || {};
// _APP_CPTM._Functions = _APP_CPTM._Functions || {};
// _APP_CPTM._Functions.getHashRegex = function (key) { return new RegExp(key+'=([^&]*)'); };
//
// if(location.hash && location.hash.match(_APP_CPTM._Functions.getHashRegex('origin'))) {
//   var _origin = location.hash.match(_APP_CPTM._Functions.getHashRegex('origin'));
//   if (_origin[1] && localStorage) {
//     localStorage.setItem('sp_origin', _origin[1]);
//   }
// }

// Sharepoint Server
// $('a[href*="https://cptmsp.sharepoint.com/"]')
//   .each(function(idx, value) {
//     var $value = $(value);
//     var href = $value.attr('href');
//     var origin = window.location.origin;
//     var hash = /#/;
//     href += hash.test(href)
//       ? "&origin=" + origin
//       : "#origin=" + origin;
//     $value.attr('href', href);
//     console.log(href);
//   });


/*requirejs(['jquery', 'bootstrap'], function($) {
  $(function() {
    $('.dropdown-toggle').dropdown();
  })
});

//Execução obrigatória em qualquer página do site.
requirejs([
  'bootstrap'
, 'controls/socialBar/socialBar' //SocialBar
, 'urlParamParser' // UrlParamParser
, 'utils/forgivable' // forgivable
, 'controls/koMyShortcuts/koMyShortcuts'
], function(_, SocialBar, UrlParamParser, forgivable) {

  forgivable(function() {
    var socialBar = new SocialBar();
  });

  forgivable(function() {
    var params = UrlParamParser(window.location.href).hash;
    if (params && params.origin) {
      localStorage.setItem('sp_origin', params.origin);
    }
  });

  forgivable(function() {
    ko.applyBindings({ }, document.getElementsByTagName('body')[0]);
  });

  $('.dropdown-toggle').dropdown();
})*/
