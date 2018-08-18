const express = require('express');

let router = express.Router();

let burger = require('../models/burger');

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      let hbsObject = {
        burgers: data
      };
      //console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });
  
  router.post("/burgers", function(req, res) {
    burger.insertOne(["burger_name"], [req.body.burger_name], function(data) {
      // Send back the ID of the new quote
      res.redirect('/');
    });
  });
  
  router.put("/burgers/:id", function(req, res) {
    let condition = "id = " + req.params.id;
  
    //console.log("condition", condition);
  
    burger.updateOne(
      {
        devoured: true
      },
      condition,function(data) {
        res.redirect('/');
      }
    );
  });
  
  // Export routes for server.js to use.
  module.exports = router;