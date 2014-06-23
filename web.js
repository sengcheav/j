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
//THis need tobe in ORDER otherwise it wont work
app.use(express.static(__dirname));

app.use(express.cookieParser()); //just for auth
 
app.use(express.bodyParser());

// for passport

app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());
// // if not able to serve up a static file try and handle as REST invocation
app.use(flash());
app.use(app.router);



app.get('/' , function(req, res){
   res.sendfile('index.html');
     
     
     
  });
  
  
  
  var u = "sengcheav@yahoo.com";
  var pass = "pass";
 app.get('/3', function (req,res){console.log("checking database");
 	client.query('INSERT INTO login_database1 (username, password) VALUES($1, $2)',
	[u, pass]);
//res.end();	
 }); 
 

 
function signup(username, password){
	var query = client.query('SELECT * FROM login_database1 WHERE username = $1' , [username]);
	query.on('row', function(row) {
		console.log("Username exist");
		
	});
 	client.query('INSERT INTO login_database1 (username, password) VALUES($1, $2)',
	[username, password]);
	res.send(200);
}  


function password(username, password){
	console.log("checking password");
//var g = [];
var b = []; 
var query = client.query('SELECT * FROM login_database1 WHERE username = $1' , [username]);
query.on('row', function(row) {
  console.log('user "%s" is %s years old lolololol' , row.username, row.password);
  if(username == row.username && password == row.password){ console.log ("yess");}
  return true;
  
  
});
	//if(password == query.password){ return true;}
	return false;
	
};
 

function findOne(username , fn) {console.log("findone  ++");

/*
 fn (null , function(user){
    var query = client.query('SELECT * FROM login_database1 WHERE username = $1' , [username]);
     query.on('row', function(row ) {
   	  console.log("inside");
	
       console.log('user "%s" is %s years old', row.username, row.password);
   	//b.push(row);
   	var user = new Object();
   	user.username = row.username; user.password = row.password;});
})*/

 // var b =
// /*
 var query = client.query('SELECT * FROM login_database1 WHERE username = $1' , [username]);
  query.on('row', function(row ) {
	  console.log("inside findOne function ");
	
    console.log('user "%s" is %s years old', row.username, row.password);
	//b.push(row);
	var user = new Object();
	var randomnumber=Math.floor(Math.random()*11);
	user.username = row.username; user.password = row.password; user.id =randomnumber; 
	return  fn(null, user);
	
  });
//   return fn(null, null);
// */ 
  
  
  
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(username, done) {
   findOne( username//{ email: email } 
	   , function (err, user) {
    done(err, user);
  });
});

 passport.use(new LocalStrategy( function(username, password, done) {
  
   //process.nextTick(function () {
	findOne( username, function(err, user) { console.log(user.username + " should be " + user.password);
    if (err) { console.log ( "err "); return done(err); }
    if (!user) { console.log ( "!user "); return done(null, false, { message: 'Unknown user ' + username }); }
	//if(password(username, password) == false){return done(null, false, { message: 'Invalid password' });}
    if ( password != user.password){ console.log("LLLL"); return done(null, false, { message: 'Invalid password' });}
   else { console.log(user.username + " ----------- " + user.password);
	return done(null , user);
   }
  });
 //});
}));

//app.post('/signUp')
/*
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {  console.log ("user"+ user + info);
    if (err) { return next(err) }
    if (!user) {
     // req.session.messages =  [info.message];
      console.log("nooooo"); 
	  return res.redirect('/')
	  
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
	  console.log("in");
      return res.redirect('/');
    });
  })(req, res, next);
});
*/
///*
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })

  );
//*/
app.get('/logout', function(req, res){
  req.logout();
  console.log("out");
  res.redirect('/');
});



app.listen(port, function() {
//   console.log('Listening on:', port);
});
// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  else {res.redirect('/login');}
}
