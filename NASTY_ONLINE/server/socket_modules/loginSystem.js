module.exports = function (socket, io) {

  var crypto = require('crypto');
  var Account = require('./LoginSchema/Account');
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport('smtps://username@gmail.com:password@smtp.gmail.com');

  socket.on('activation', function(data){
    var actCode = data.actcode;
    Account.activate(actCode, function(err, account){
        if (err) {
          socket.emit('activationResponse',{err:err});
        }
        if (!account) {
            socket.emit('activationResponse',{err: "Can't activate account : Unknown token '<b>"+actCode+"</b>'."});
        }
        if (account){
          socket.emit('activationResponse',{msg: "success"});
        }
    });
  });

  socket.on('loginQuery', function(data){
 		Account.findByName(data.username, function(err, account){
 			if (err) {
 				return socket.emit('loginResponse', {
 					err: err.msg
 				});
 			}
 			if (!account) {
 				return socket.emit('loginResponse', {
 					err: "Invalid username"
 				});
 			}

 			crypto.pbkdf2(data.password, account.salt, 25000, 512, function(err, hashRaw){
 				var hpass = new Buffer(hashRaw, 'binary').toString('hex');
 				if (account.hash == hpass) {
          if (!account.activated){
            return socket.emit('loginResponse', {
            err: "Account Not Activated"
            });
          }
 					return socket.emit('loginResponse', {
 						msg: data.username
 					});
 				}
 				return socket.emit('loginResponse', {
 					err: "Invalid password"
 				});
 			});
 		});
 	});

   socket.on('registerUser', function(data){
     //Check if email not already used
     Account.findByEmail(data.email, function(err, account){
         if (err) {
             return socket.emit('registerResponse',{err : err});
         }
         if (account){
             return socket.emit('registerResponse',{err : "Email '"+account.email+"' already registered"});
           }
         //Create hash for activation code
         var shasum = crypto.createHash('sha1');
         shasum.update(data.username+data.email);
         actCode = shasum.digest('hex');

         //Hash the password a first time in sha1
         var shapwd = crypto.createHash('sha1').update(data.password + 'd28cb767c4272d8ab91000283c67747cb2ef7cd1').digest('hex');

         Account.register(new Account({
             username : data.username,
             email : data.email,
             activated : false,
             actCode: actCode,
             socketId: null,
             rank: 0
         }), shapwd, function(err, account) {
             if (err) {
              return socket.emit('registerResponse',{err : err});
             }
             //TODO
             actUrl = 'http://www.myserver.com:3000/activate/'+actCode;

             transporter.sendMail({
                 from: 'Team <no-reply@mygame.com>',
                 to: data.email,
                 subject: "RPGMaker MV MMO",
                 text: "Hello "+data.username+' and welcome to RPGMaker MV MMO!\nYour account has been registrated, but you need to activate it by following this link :\n'+actUrl+'\n\nEnjoy!\n\t-- Nelderson',
                 html: "Hello "+data.username+' and welcome to RPGMaker MV MMO!<br>Your account has been registrated, but you need to activate it by clicking on the following link : <br><a href="'+actUrl+'">'+actUrl+'</a><br>Enjoy!<br>-- Nelderson'
             });


             return socket.emit('registerResponse',{msg : data.username});
         });
     });
     });
};
