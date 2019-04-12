//Taken from https://stackoverflow.com/questions/41423727/handlebars-registerhelper-serverside-with-expressjs

var register = function(Handlebars) {
    var helpers = {
      celsiusToFahrenheit: function(celsiusTemp){
          return (celsiusTemp * 9/5) + 32;
      },
      mbarToInHg: function(pressureInMbar) {
          return pressureInMbar * 0.029530
      }
    };
  
    if (Handlebars && typeof Handlebars.registerHelper === "function") {
      // register helpers
      for (var prop in helpers) {
          Handlebars.registerHelper(prop, helpers[prop]);
      }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }
  
  };
  
  module.exports.register = register;
  module.exports.helpers = register(null);    