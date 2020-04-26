const Regex = require('./regex');

const templateToString = function (templateString, strVarsObj) {
    var match; // holds the match array when regex match is executed on a string

    // if templateString is not a string, return it back
    if (typeof templateString !== "string") {
        return templateString;
    }

    // if strVarsObj is not present, set it as an empty object
    if (!strVarsObj) {
        strVarsObj = {};
    }

    // run regex match on provided string
    match = Regex.templateRegex.exec(templateString);

    // if there are matches
    while (match !== null) {

        // if match is not present in the strVarsObj, remove that markdown variable from the string
        if (!strVarsObj[match[1]]) {
            templateString = templateString.replace(match[0], "");

            // else, replace it with the given value in the object
        } else {
            templateString = templateString.replace(match[0], strVarsObj[match[1]]);
        }

        // re-run the regex to find more matches if exists
        match = Regex.templateRegex.exec(templateString);
    }

    // finally, return the string
    return templateString;
};


module.exports = {
    templateToString
};