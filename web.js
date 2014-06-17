var express = require('express')
 //, http =requrie('http')
  , app = express()//.createServer(express.logger())
  , pg = require('pg').native
  ,fs = require('fs')
  //,AWS = require('aws-sdk')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , flash = require('connect-flash') //flash message
  
  ,Sequelize = require('sequelize')
  
  , start = new Date()
  , connectionString = process.env.DATABASE_URL
  , port = process.env.PORT
  , client;
//var server = http.createServer(app);
client = new pg.Client(connectionString);
client.connect();
var p = port; 

  
  
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
var coords = [
{ lat: -42.5667, lon: 32.767 }, 
{ lat: 35.76556, lon: 75.5675 }, 
{ lat: -35.65756, lon: 20.656 }, 
{ lat: 67.356756, lon: 45.896 }, 
{ lat: -50.567, lon:185.3450 }, 
{ lat: 0, lon: 0 }, 
{ lat: -40.930, lon: 173.050 }
]

var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";
  

/*kk
app.post('/upload', function(req, res) {
	fs.readFile(req.files.image.path, function (err, data) {
		console.log("data", data)
		var newData = '\\x' + data;
		// console.log("hex data", data)

var des ="";//description
		var imageName = req.files.image.name

		/// If there's an error
		if(!imageName){
			console.log("There was an error")
			res.redirect("/");
			res.end();
		}

		else {
			var newPath = __dirname + "/uploads/fullsize/" + imageName;
			var thumbPath = __dirname + "/uploads/thumbs/" + imageName;
		  /// write file to uploads/fullsize folder*/
		  /*fs.writeFile(newPath, data, function (err) {

		  	/// write file to uploads/thumbs folder
		  	im.resize({
		  		srcPath: newPath,
		  		dstPath: thumbPath,
		  		width:   200
		  	}, function(err, stdout, stderr){
		  		if (err) throw err;
		  		console.log('resized image to fit within 200x200px');
		  	});

		  	// console.log((JSON.stringify(req.files)))
		  	res.redirect("/uploads/fullsize/" + imageName);

		  });
//
	client.query("insert into tasman_table (imgName, img, des) values ($1, $2, $3)", 
		[imageName, newData, des],
		function(err, writeResult) {
			console.log("err", err, "pg writeResult", writeResult)
		});


	res.end();
		}
	});
});

/// Show files
app.get('/uploads/fullsize/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFile( __dirname + "/uploads/fullsize/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');
});


app.get('/uploads/thumbs/:file', function (req, res){
	file = req.params.file;
	var img = fs.readFile( __dirname + "/uploads/thumbs/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');
});
*/
//app.get('/', function(req, res) {
 // var date = new Date();

 // client.query('INSERT INTO visits(date) VALUES($1)', [date]);

 // query = client.query('SELECT COUNT(date) AS count FROM visits WHERE date = $1', [date]);
 // query.on('row', function(result) {
  //  console.log(result);
//
  //  if (!result) {
  //    return res.send('No data found');
  //  } else {
  //    res.send('Visits today: ' + result.count);
  //  }
  //});
//});
/*
passport.use(new LocalStrategy(
    usernameField: 'email', // use email as user name
    passwordField: 'passwd'
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


//redirect & Flash Message
app.post('/login', 
  passport.authenticate('local', { successRedirect: '/', // redirecting to homepage if success
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

function userExist(req, res, next) { // need to check when !user
   // Users.count({   // need to check database if username exist
     //   username: req.body.username
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            // req.session.error = "User Exist"
            res.redirect("/singup");
        }
    });
}


req.login(user, function(err) {
  if (err) { return next(err); }
  return res.redirect('/users/' + req.user.username);
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
//passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
//passport.authenticate('local', { successFlash: 'Welcome!' });
app.listen(port, function() {
  console.log('Listening on:', port);
});
*/
// or 'sqlite', 'postgres', 'mariadb'
//  3306, // or 5432 (for postgres)


app.get('/' , function(req, res){
   res.sendfile('testinghtml.html')
     
     
     
  });
var p = port ; 
var sequelize = new Sequelize('login_database', 'username', 'password', {
      dialect: "postgres", 
      port:  p 
    })
 
sequelize
  .authenticate()
  .complete(function(err) {
    if (err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })
  
  var User = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
})
  User.sync();
  sequelize.sync({force: true});
  //var user = User.create({ username: "admin", password: "admin" });
  // Serialize sessions
  
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.find({where: {id: id}}).success(function(user){
    done(null, user);
  }).error(function(err){
    done(err, null);
  });
});

// Use local strategy to create user account
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.find({ username: username }).success(function(user) {
      if (!user) {
        done(null, false, { message: 'Unknown user' });
      } else if (password != user.password) {
        done(null, false, { message: 'Invalid password'});
      } else {
        done(null, user);
      }
    }).error(function(err){
      done(err);
    });
  }
));
/*
var auth = {};
  auth.localStrategy = new LocalStrategy({
    username: 'username',
    password: 'password'
  },

  function (username, password, done){
    var User = require('./User').User;
    User.find({username: username}).success(function(user){
      if (!user){
        return done(null, false, { message: 'Nobody here by that name'} );
      }
      if (user.password !== password){
        return done(null, false, { message: 'Wrong password'} );
      }
      return done(null, { username: user.username });
    });
  }
);

auth.validPassword = function(password){
  return this.password === password;
}

auth.serializeUser = function(user, done){
  done(null, user);
};

auth.deserializeUser = function(obj, done){
  done(null, obj);
};

var passport = require('passport');
var AuthController = {

  login: passport.authenticate('local', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failure'
  }),

  loginSuccess: function(req, res){
    res.json({
      success: true,
      user: req.session.passport.user
    });
  },

  loginFailure: function(req, res){
    res.json({
      success:false,
      message: 'Invalid username or password.'
    });
  },

  logout: function(req, res){
    req.logout();
    res.end();
  },
};
*/
app.listen(port, function() {
  console.log('Listening on:', port);
});









