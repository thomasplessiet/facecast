var express = require('express');
var router = express.Router();
var event = require('../models/event');
var role = require('../models/role');
var offre = require('../models/offreRole');
var postul = require('../models/postul');

var now = new Date();
var annee   = now.getFullYear();
var mois    = now.getMonth() + 1;
var jour    = now.getDate();

var dateNow = " " +jour + "/" + mois + "/" +annee;

router.get('/', function(req, res, next) {
  res.render('insertevent', { "title" : "Ajout d'un évènement" });
});


router.post('/addevent', function(req, res) {
    // Récupération des valeurs du formulaire
    var eventName = req.body.name;
    var eventType = req.body.type;
    var eventDate = req.body.date;
    var eventDays = req.body.days;

    // Création de l'objet utilisateur suivant le schéma
    var newEvent = new event({
        "name" : eventName,
        "type" : eventType,
        "date" : eventDate,
        "dateAdd" : dateNow,
        "days" : eventDays
    });

    var newPostul = new postul({
        "idOffre" : newEvent._id,
        "idFigu" : "58d524730b884219b043d119",
        "etat" : "en attente"
    });
    newEvent.save( function (err, doc) {
        if (err) {
            // Retour d'une erreur
            res.send("Pas glop !");
        }
        else {
            newPostul.save( function (err, doc) {
                if (err) {
                    res.send("Pas glop 2!");
                }
                else {
                    res.redirect("/events");
                }
            });
        }         
    });
});

router.post('/:id/addrole', function(req, res) {
    
    var nameRole = req.body.role;
    var numberR = req.body.nbRole;
    var id = req.params.id;

    var newRole = new role({
        "name" : nameRole
    });

    var newOffre = new offre({
        "idEvent" : id,
        "nameRole" : newRole._id,
        "nbRole" : numberR
    })

    newRole.save( function (err, doc) {
        if (err) {
            res.send("Pas glop !");
        }
        else {
            newOffre.save( function (err, doc) {
                if (err) {
                    res.send("Pas glop 2!");
                }
                else {
                    res.redirect("/events/"+ id);
                }
            });
        }
    });
});

module.exports = router;
