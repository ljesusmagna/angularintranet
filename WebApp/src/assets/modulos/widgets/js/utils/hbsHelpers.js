requirejs(['handlebars'], function(Handlebars) {

  Handlebars.registerHelper('for', function(context, options) {
    var result = "";

    for(var i=1, j=context+1; i<j; i++) {
      result = result + options.fn({hbs_idx: i});
    }

    return result;
  });

  Handlebars.registerHelper('highlight', function(patternText, text) {
    if(patternText && text) {
      text = Handlebars.Utils.escapeExpression(text);
      patternText = Handlebars.Utils.escapeExpression(patternText);

      var pattern = new RegExp('('+patternText+')', 'gi');
      var result = text.replace(pattern,'<span class="highlight">$1</span>');

      return new Handlebars.SafeString(result);
    } else {
      return text;
    }
  });

  Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
  });

  Handlebars.registerHelper('ifCond', function (lvalue, operator, rvalue, options) {
    switch (operator) {
        case '==':
            return (lvalue == rvalue) ? options.fn(this) : options.inverse(this);
        case '===':
            return (lvalue === rvalue) ? options.fn(this) : options.inverse(this);
        case '<':
            return (lvalue < rvalue) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (lvalue <= rvalue) ? options.fn(this) : options.inverse(this);
        case '>':
            return (lvalue > rvalue) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (lvalue >= rvalue) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (lvalue && rvalue) ? options.fn(this) : options.inverse(this);
        case '||':
            return (lvalue || rvalue) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
})
