var express = require('express')
  ,app = express()//.createServer(express.logger())
  ,pg = require('pg').native
  ,fs = require('fs')
  ,http = require ('http') 
  ,passport = require('passport')
  ,LocalStrategy = require('passport-local').Strategy
  ,flash = require('connect-flash') //flash message
  , start = new Date()
  , connectionString = process.env.DATABASE_URL
  , port = process.env.PORT || 3000
  , client;
 //var app1 = express(); 
//var app = http.createServer(app1);
client = new pg.Client(connectionString);
client.connect();
app.use(express.static(__dirname));//THis need tobe in ORDER otherwise it wont work
app.use(express.cookieParser()); //just for auth
app.use(express.bodyParser());
// for passport
//app.use(express.session({ secret: 'SECRET' ,maxage:60000}));
app.use(passport.initialize());
app.use(passport.session());
// // if not able to serve up a static file try and handle as REST invocation
app.use(flash());
app.use(app.router);



app.get('/' , function(req, res){
   res.send('index.html');
});
  
var u = "sengcheav@yahoo.com";
var pass = "pass";
var newLogin = {
   username : "sengcheav@yahoo.com",
   password : "pass"
};

passport.use(new LocalStrategy({
    // set the field name here
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    /* get the username and password from the input arguments of the function */

    // query the user from the database
    // don't care the way I query from database, you can use
    // any method to query the user from database
    User.find( { where: {username: username}} )
      .success(function(user){
      
        if(!user)
          // if the user is not exist
          return done(null, false, {message: "The user is not exist"});
        else if(!hashing.compare(password, user.password))
          // if password does not match
          return done(null, false, {message: "Wrong password"});
        else
          // if everything is OK, return null as the error
          // and the authenticated user
          return done(null, user);
        
      })
      .error(function(err){
        // if command executed with error
        return done(err);
      });
  }
));



app.listen(port, function() {
//   console.log('Listening on:', port);
});



