// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the contacts
  app.get("/api/contacts", function(req, res) {
    var query = {};
    
   // here we find all contacts from database 
    db.Post.findAll({})
    .then(function(dbContact) {
      res.json(dbContact);
    });
  });

  // Get route for retrieving a single contact
  app.get("/api/contacts/:id", function(req, res) {
    // here we get particular contact 
    db.Contact.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbContact) {
      res.json(dbContact);
    });
  });

  // Contact route for saving a new contact
  app.post("/api/contacts", function(req, res) {
    db.Contact.create(req.body).then(function(dbContact) {
      res.json(dbContact);
    });
  });

  // DELETE route for deleting contact
  app.delete("/api/contacts/:id", function(req, res) {
    db.Contact.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbContact) {
      res.json(dbContact);
    });
  });

  // PUT route for updating Contacts
  app.put("/api/contacts", function(req, res) {
    db.Contact.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbContact) {
      res.json(dbContact);
    });
  });
};
