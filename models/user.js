const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // password:  {
    //     type: String,
    //     required: true
    // },
    admin:   {
        type: Boolean,
        default: false
    },
    facebookId: String,
    // added for mongoose population
    firstname: {
        type: String,
          default: ''
      },
      lastname: {
        type: String,
          default: ''
      },
      
});

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User);