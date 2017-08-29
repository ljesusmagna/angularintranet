define([], function() {
  var map = { };

  document.addEventListener("keydown", onKeyDown, false);
  function onKeyDown(e) {
    var handler = map[e.key];
    if (handler) handler();
  }

  return function(key, fn) {
    if (key == 'Left' || key == 'ArrowLeft')
      map['Left'] = map['ArrowLeft'] = fn;
    else if (key == 'Right' || key == 'ArrowRight')
      map['Right'] = map['ArrowRight'] = fn;
    else if (key == 'Esc' || key == 'Escape')
      map['Esc'] = map['Escape'] = fn;

    else
      map[key] = fn;
  }
});
