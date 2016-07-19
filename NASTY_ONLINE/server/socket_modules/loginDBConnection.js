module.exports = function(){
  //Mongo DB Database Connection for Passive MMO Module
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://Username:Password@mongodburl.com:43222', function(err) {
      if (err) {
        console.log(err);
      }
    });
};
