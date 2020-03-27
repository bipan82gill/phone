// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads keypad.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/keypad.html"));
  });

  // call to somebody route loads call.html
  app.get("/call", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/call.html"));
  });

  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/add.html"));
  });

  //  route loads contacts.html
  app.get("/contacts", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/contacts.html"));
  });

};
