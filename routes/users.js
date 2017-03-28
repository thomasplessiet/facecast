var express = require('express');
var router = express.Router();
var user = require('../models/user');

/* Liste des figurants */
router.get('/', function(req, res, next) {
 user.find({},{},function(e,docs){
  res.render('users', {
   "title" : "Liste des figurants",
   "userlist" : docs
  });
 });
});

router.get('/delete/:id', function(req, res) {
  user.remove({_id: req.params.id},function(err,delData){
    res.redirect('/users');
  });  
});
module.exports = router;
