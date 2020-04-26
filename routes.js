const express = require("express");

module.exports = (app) => {
    
    app.use("/api/partner", require("./app_modules/partners/route"));
    app.use("/api/circle", require('./app_modules/circles/route'));
    // app.use("/api/tmp-user", require('./app_modules/circles/temp-users/route'));
};

// app.use(express.json());