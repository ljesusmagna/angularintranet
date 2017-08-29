(function functioNameOnlyForCompilePurpose(params) {
  var self = this
    , $ = require('jquery')
    , moment = require('moment')
    , apiURL = 'http://moldavia:8082/CPTM.WebAPI/api/LineStatus/Situation';

  function LineSituation(lineNumber) {
    this.lineNumber = lineNumber;
    this.situationColor = ko.observable('gray');
    this.description = ko.observable('');
    this.status = ko.observable('Serviço indisponível.');
  }

  this.lastUpdate = ko.observable();
  this.line_7 = ko.observable(new LineSituation(7));
  this.line_8 = ko.observable(new LineSituation(8));
  this.line_9 = ko.observable(new LineSituation(9));
  this.line_10 = ko.observable(new LineSituation(10));
  this.line_11 = ko.observable(new LineSituation(11));
  this.line_12 = ko.observable(new LineSituation(12));

  function parseStatus(status) {
    switch (status) {
      case 'Operação Normal': return 'green';
      case 'Velocidade Reduzida': return 'yellow';
      case 'Paralisada':
      case 'Operações Encerradas': return 'red';
      default: return 'gray';
    }
  }

  function updateLines(data) {
    for (var i = 0; i < data.length; i++) {
      var situation = data[i]
        , line = self['line_'+situation.LinhaId];

      if (line){
        line().situationColor(parseStatus(situation.Status));
        line().description(situation.Descricao);
        line().status(situation.Status);
      }
    }
    self.lastUpdate(moment().format('[Atualizado às] h:mm:ss'))
  }

  (function fetchData() {
    $.get(apiURL, updateLines);
    //Fator randomico para evitar inundações na rede.
    setTimeout(fetchData, 60000 + Math.floor(Math.random()*10000));
  })();
})
