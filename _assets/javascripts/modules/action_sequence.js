(function(Modules) {
  "use strict";

  Modules.ActionSequence = function() {
    this.init = function(element) {

      var actions = element.find('[data-action]'),
          currentAction,
          actionIndex = 0;

      element.find('.hide').hide().removeClass('hide');
      element.on('action-start', perform);
      element.on('action-ended', progress);

      progress();

      function progress() {
        if (actionIndex < actions.length) {
          currentAction = actions.eq(actionIndex);
          actionIndex++;
          element.trigger('action-start');
        }
      }

      function perform() {
        var type = currentAction.data('action'),
            action,
            delay = currentAction.data('delay');

        switch (type) {
          case 'message':
            action = message;
            break;
          default:
            action = reveal;
            break;
        }

        if (delay) {
          setTimeout(function() {
            action();
          }, parseInt(delay, 10));
        } else {
          action();
        }
      }

      function reveal() {
        currentAction.fadeIn(200, function() {
          element.trigger('action-ended');
        });
      }

      function message() {
        var message = currentAction.html(),
            delay = currentAction.data('delay') || 1000,
            duration = currentAction.data('writing-duration') || 1000;

        currentAction.text('…');

        setTimeout(function() {
          fadeInMessage();
        }, delay)

        function fadeInMessage() {
          currentAction.fadeIn(200, function() {
            setTimeout(function() {
              currentAction.html(message);
              //window.scrollTo(0,document.body.scrollHeight);
              element.trigger('action-ended');
            }, duration);
          });
        }
      }
    };
  };

})(window.App.Modules);
