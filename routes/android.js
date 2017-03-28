var express = require('express');
var router = express.Router();
var event = require('../models/event');
var offre = require('../models/offreRole');

/* Liste des utilisateurs par JSon */
router.get('/events', function(req, res, next) {
  var response = {};
 
  event.find({},function(err,event){
   if (err) {
    response = {"error" : true,"message" : "Error fetching data"};
   } else {
     response = {event};
    }

   res.json(response);
  });
});

router.get('/event/:id/offres', function(req, res, next) {
  var response = {};
  var  idEvent = req.params.id;

  offre.find({"idEvent": idEvent},function(err,offres){
   if (err) {
    response = {"error" : true,"message" : "Error fetching data"};
   } else {
     response = {offres};
    }

   res.json(response);
  }).populate('nameRole');
});
module.exports = router;
