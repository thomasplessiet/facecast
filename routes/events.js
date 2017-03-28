var express = require('express');
var router = express.Router();
var event = require('../models/event');
var role = require('../models/role');
var offre = require('../models/offreRole');
var postul = require('../models/postul');

var method_Override = require('../node_modules/method-override');
var bodyParser = require('../node_modules/body-parser');


router.use(bodyParser.urlencoded({extended:true}));

router.use(method_Override(function(req,res){
    if(req.body && typeof req.body == 'object' && '_method' in req.body)
        var method = req.body._method;
        delete req.body._method;
        return method;
}));

/* Liste des évenements */
router.get('/', function(req, res, next) {
 event.find({},{},function(e,docs){
  res.render('events', {
   "title" : "Liste des événements",
   "eventlist" : docs
  });
 });
});

router.get('/:id', function(req, res, next) {    
    id = req.params.id;
    
    event.find({"_id": id},{},function(e,eventdocs){
        role.find({},{},function(e,roledocs){
            offre.find({"idEvent" : id},{},function(e,offredocs){
                res.render('event', {
                    "title" : "Événement",
                    "eventlist" : eventdocs,
                    "rolelist" : roledocs,
                    "offrelist" : offredocs
                });
            }).populate("idEvent").populate("nameRole");
        });
    });
});

router.get('/:id/postul', function(req, res) {

    postul.find({"idOffre" : req.params.id},function(e,postuldoc){
      res.render('postul', {
        "title" : "Demande(s) pour l'\offre",
        "postullist" : postuldoc
      });
    }).populate("idOffre").populate("idFigu");
});

router.delete('/:id/delete',function(req,res,next){
    var id =req.params.id;
    event.findOneAndRemove({_id:id},function(err){
        if(err){
            res.send(err);
        }else{
            offre.find({idEvent:id}).remove().exec();
            res.redirect("/events");  
        }    
    });
})

router.delete('/role/delete/:id',function(req,res,next){
    var id =req.params.id;
    role.findOneAndRemove({_id:id},function(err){
        if(err){
            res.send(err);
        }else{
            offre.find({nameRole:id}).remove().exec();
            res.redirect("/events");  
        }    
    });
})
module.exports = router;