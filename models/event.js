var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create schema
var EventSchema  = new Schema({
    "name" : String,
    "type" : String,
    "date" : String,
    "dateAdd" : String,
    "days" : Number
});

module.exports = mongoose.model('event',EventSchema,'event');
