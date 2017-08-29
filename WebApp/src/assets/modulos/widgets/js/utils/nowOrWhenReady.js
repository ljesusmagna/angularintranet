define(
  ['jquery'],
  function($) {

    function nowOrWhenReady(f) {
      if ($.isReady) f();
      else $(f);
    }

    return nowOrWhenReady;
  }
)
