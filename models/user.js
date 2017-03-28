var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema  = new Schema({
    "name" : String,
    "firstname" : String,
    "mail" : String
});

module.exports = mongoose.model('user',userSchema,'user');
