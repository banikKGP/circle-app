(function () {
    "use strict";

    var Regex = {};

    Regex.email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    Regex.name = /^[a-zA-Z\s\.]+$/i;
    Regex.templateRegex = /\{(.+)\}/g;
    Regex.mongooseObjectId = /^[0-9a-fA-F]{24}$/;

    Regex = Object.freeze(Regex);

    module.exports = Regex;
})();