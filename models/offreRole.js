var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OffreSchema = new Schema({
    "idEvent" : { type: Schema.Types.ObjectId, ref: 'event' },
    "nameRole" : { type: Schema.Types.ObjectId, ref: 'role' },
    "nbRole" : String
 })

module.exports = mongoose.model('offre',OffreSchema,'offre');
