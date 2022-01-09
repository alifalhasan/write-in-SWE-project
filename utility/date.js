//npm module for date formatting
const Date = require("dateformat");


//This function returns current date in a dd mmmm yyyy format
exports.GetDate = function () {
    return Date("dd mmmm yyyy");
}
