(function($, root) {
  "use strict";

  var App = root.App = {
    Modules: {}
  };

  App.init = function(container) {
    this.initModules();
  };

  App.initModules = function(container) {
    var modules = this.findModules(container);

    for (var i = 0, l = modules.length; i < l; i++) {
      var module,
      element = $(modules[i]),
      type = camelCaseAndCapitalise(element.data('module'));

      if (typeof App.Modules[type] === "function") {
        module = new App.Modules[type]();
        module.init(element);
      }
    }

    // eg some-module to SomeModule
    function camelCaseAndCapitalise(string) {
      return capitaliseFirstLetter(camelCase(string));
    }

    // http://stackoverflow.com/questions/6660977/
    function camelCase(string) {
      return string.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    }

    // http://stackoverflow.com/questions/1026069/
    function capitaliseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };

  App.findModules = function(container) {
    var modules,
    moduleSelector = '[data-module]',
    container = container || $('body');

    modules = container.find(moduleSelector);

    // Also include container if it matches pattern
    if (container.is(moduleSelector)) {
      modules.push(container);
    }

    return modules;
  };

})(jQuery, window);
