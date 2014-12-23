(function(Modules) {
  "use strict";

  Modules.StoryBlock = function() {
    this.init = function(element) {
      element.on('click', '.js-proceed', proceed);
      element.on('show', show);

      function show(evt) {
        element.fadeIn().removeClass('hide');
      }

      function proceed(evt) {
        var $link = $(this);

        element.fadeOut(function() {
          var next = $link.attr('href');
          console.log(next, $(next));
          $(next).trigger('show');
        });
        evt.preventDefault();
      }
    };
  };

})(window.App.Modules);
