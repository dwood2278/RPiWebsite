const exphbs = require('express-handlebars');

//Custom helpers for Handlebars

module.exports = {
    getCurrentYear: function() {
        return new Date().getFullYear();
    }
}