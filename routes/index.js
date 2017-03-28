var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'FaceCast' });
});

router.get('/n/:nom', function(req, res, next) {
  leNom = req.params.nom;
  res.render('index', { title: leNom });
});

module.exports = router;
