const date = require("dateformat");

exports.getdate = function () {
    return date("dd mmmm yyyy");
}
