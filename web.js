var express = require('express')
 //, http =requrie('http')
  , app = express()//.createServer(express.logger())
  , pg = require('pg').native
  ,fs = require('fs')
  ,http = require ('http') 
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , flash = require('connect-flash') //flash message

  , start = new Date()
  , connectionString = process.env.DATABASE_URL
  , port = process.env.PORT || 3000
  , client;
 //var app1 = express(); 
//var app = http.createServer(app1);
client = new pg.Client(connectionString);
client.connect();

  
  
  // make express handle JSON and other requests
app.use(express.bodyParser());
// // serve up files from this directory 
app.use(express.static(__dirname));
// // if not able to serve up a static file try and handle as REST invocation
app.use(app.router);
// for passport
app.use(express.cookieParser()); //just for auth
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/' , function(req, res){
   res.sendfile('testinghtml.html');
     
     
     
  });
  
  
  /*
  var u = "sengcheav@yahoo.com";
  var pass = "pass";
 app.get('/3', function (req,res){
 	client.query("INSERT INTO login_database1 (username, password) VALUES($1, $2)",
	[u, pass]);
res.end();	
 }); 
  
  


function password(user, password){
	var query = client.query("SELECT * from login_database1 WHERE username =VALUES ($1)", [username]);
	if(password == query.password){ return true;}
	return false;
	
}


function findOne(username , fn) {
  var query = client.query("SELECT * from login_database1 WHERE username =VALUES ($1)", [username]);
 if (query.username) {
    fn(null, query.username);
 } else {
    fn(new Error('User ' + query.username + ' does not exist'));
 	fn(null, null );
  }
}



passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  User.findOne( { email: email } , function (err, user) {
    done(err, user);
  });
});

 passport.use(new LocalStrategy(function(username, password, done) {
    findOne( username, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    comparePassword(username , password, function(err, isMatch) {
      if (err) return done(err);
      if(!password(user, password)){return done(null, false, { message: 'Invalid password' });}
      else { return done(null , user);} 
    });
  });
}));



app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

  */


app.listen(port, function() {
  console.log('Listening on:', port);
});

