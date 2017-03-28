var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostulSchema = new Schema({
    "idOffre" : { type: Schema.Types.ObjectId, ref: 'offreRole' },
    "idFigu" : { type: Schema.Types.ObjectId, ref: 'user' },
    "etat" : String
 })

module.exports = mongoose.model('postul',PostulSchema,'postul');
