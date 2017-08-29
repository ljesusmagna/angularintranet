(function functioNameOnlyForCompilePurpose(params) {
  var self = this
    , lineNumber = 7
    , cityId = 244
    , serviceInfoURL = 'http://www.cptec.inpe.br/cidades/tempo/'+cityId
    , moment = require('moment')
    , apiURL = 'http://moldavia:8082/CPTM.WebAPI/api/Weather/Forecast?cityId='+cityId
    , _1_minute = 60 * 1000;

  this.State = ko.observable('loading');
  this.LineNumber = ko.observable(lineNumber);
  this.CityName = ko.observable();
  this.Provider = ko.observable();
  this.ServiceInfoURL = ko.observable();

  this.day_0 = ko.observable(new DayForecast());
  this.day_1 = ko.observable(new DayForecast());
  this.day_2 = ko.observable(new DayForecast());
  this.day_3 = ko.observable(new DayForecast());

  (function fetchData() {
    $.get(apiURL, function(data) {
      updateLines(data);
      setTimeout(fetchData, 60*_1_minute);
    }).fail(function() {
      onFail();
      setTimeout(fetchData, 2*_1_minute);
    });
  })();

  function onFail() {
    self.State('fail');
  }

  function updateLines(data) {
    self.CityName(data.CityName);
    self.Provider(data.Provider);
    self.ServiceInfoURL(serviceInfoURL);

    for (var i = 0; i < data.Forecasts.length; i++) {
      var day = self['day_'+i]
        , forecast = data.Forecasts[i]
        , dateDisplay
        , _day;

      if (typeof day === 'undefined')
        return;

      _day = day();

      if (i === 0) dateDisplay = 'Hoje'
      else if (i === 1) dateDisplay = 'Amanhã'
      else dateDisplay = moment(forecast.Date).format('dddd');

      _day.DateDisplay(dateDisplay);
      _day.WeatherDescription(forecast.WeatherDescription);
      _day.MinimumTemperature(forecast.MinimumTemperature);
      _day.MaximumTemperature(forecast.MaximumTemperature);
      _day.WeatherFlags(forecast.WeatherFlags);
      _day.Weather(forecast.Weather);
    }

    self.State('ok');
  }

  function DayForecast() {
    var self = this;

    this.Weather = ko.observable();
    this.DateDisplay = ko.observable();
    this.WeatherFlags = ko.observable();
    this.WeatherDescription = ko.observable();
    this.ServiceInfoURL = ko.observable();

    this.MinimumTemperature = ko.observable();
    this.MaximumTemperature = ko.observable();
  }
})
