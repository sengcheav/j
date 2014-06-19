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
//app.use(express.logger());  
app.use(express.static(__dirname));

app.use(express.cookieParser()); //just for auth
  // make express handle JSON and other requests
app.use(express.bodyParser());
// // serve up files from this directory 


// for passport

app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());
// // if not able to serve up a static file try and handle as REST invocation
app.use(app.router);



app.get('/' , function(req, res){
   res.sendfile('testinghtml.html');
     
     
     
  });
  
  
  
  var u = "sengcheav@yahoo.com";
  var pass = "pass";
 app.get('/3', function (req,res){console.log("checking database");
 	client.query('INSERT INTO login_database1 (username, password) VALUES($1, $2)',
	[u, pass]);
res.end();	
 }); 
  
  


function password(username, password){console.log("checking password");
//var g = [];
query.on('row', function(row) {
  console.log('user "%s" is %s years old', row.username, row.password);
});
	//if(password == query.password){ return true;}
	return false;
	
}


function findOne(username , fn) {console.log("findone  ++");
var g = [];
//  var query = client.query("SELECT * from login_database1 ");//WHERE username =$1', [username]);
//query.on("row", function (result) {
//	console.log("Result:" + result.row);
//		g.push(result);
//	});
var user = 0, pass =0 ;

var query = client.query('SELECT * FROM login_database1 WHERE username = $1' , [username]);
var r = [];
  query.on('row', function(row) {console.log("inside");
  r.push(row);
    console.log('user "%s" is %s years old', row.username, row.password);
	
	user = row.username ; pass =password;
	//fn(null , username);
  });
  if (user != 0 ){ console.log("no user hahahha" + username);}
  else {console.log ( "user + pass" + username);}
  console.log("ROOOOW "+ r.length);
	/*
 if (query == username) {
    fn(null, username);
 } else {
    fn(new Error('User ' + username + ' does not exist'));
 	fn(null, null );
  }

  */
}



passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(username, done) {
   findOne( username//{ email: email } 
	   , function (err, user) {
    done(err, user);
  });
});

 passport.use(new LocalStrategy( function(username, password, done) {
    findOne( username, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    //comparePassword(username , password, function(err, isMatch) {
      //if (err) return done(err);
      if(!password(user, password)){return done(null, false, { message: 'Invalid password' });}
      else { return done(null , user);} 
    //});
  });
}));



app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {  console.log ("user"+ user + info);
    if (err) { return next(err) }
    if (!user) {
      req.session.messages =  [info.message];
      console.log("nooooo"); //alert("no");
	  return res.redirect('/')
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
	  //alert("login success");
	  console.log("in");
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', function(req, res){
  req.logout();
  //alert("u r loging out");
  console.log("out");
  res.redirect('/');
});

  


app.listen(port, function() {
  console.log('Listening on:', port);
});

