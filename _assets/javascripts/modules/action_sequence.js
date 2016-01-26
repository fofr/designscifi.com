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
          case 'phone-focus':
            action = focusPhone;
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
        var delay = currentAction.data('delay') || 1000;

        setTimeout(function() {
          fadeIn();
        }, delay);

        function fadeIn() {
          currentAction.fadeIn(200, function() {
            scrollDown();
            element.trigger('action-ended');
          });
        }
      }

      function focusPhone() {
        var delay = currentAction.data('delay') || 2000;
        setTimeout(function() {
          scrollDown();
          currentAction.show().removeClass('phone-unfocused');
          setTimeout(function() {
            element.trigger('action-ended');
          }, 1000);
        }, delay)
      }

      function message() {
        var message = currentAction.html(),
            delay = currentAction.data('delay') || 1500,
            duration = currentAction.data('writing-duration') || 1000;

        currentAction.text('…');

        setTimeout(function() {
          fadeInMessage();
        }, delay);

        function fadeInMessage() {
          currentAction.fadeIn(200, function() {
            scrollDown();
            setTimeout(function() {
              currentAction.html(message);
              scrollDown();
              element.trigger('action-ended');
            }, duration);
          });
        }
      }

      function scrollDown() {
        $('html,body').animate({scrollTop: document.body.scrollHeight}, 1000);
      }
    };
  };

})(window.App.Modules);
