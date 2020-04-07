var express       = require("express"),
    app           = express(),
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose"),
	Picture       = require("./models/picture"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local"),
	User          = require("./models/user")


    

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/pinterest_vibes", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(require("express-session")({
	secret: "This is my secret!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})
 

app.get("/", function(req, res){
	res.render("landing")
});

app.get("/home", function(req, res){
	Picture.find({}, function(err, pictures){
		if(err){
			console.log(err);
		} else{
			res.render("pictures/index", {pictures: pictures, currentUser: req.user});
		}
	});
});

app.post("/home", isLoggedIn, function(req, res){
	var name  = req.body.name;
	var image = req.body.image;
	var desc  = req.body.description;
	var newPicture = {name: name, image: image, description: desc};
	Picture.create(newPicture, function(err, newPicture){
		if(err){
			console.log(err);
		} else{
			res.redirect("/home");
		}
	});
});

app.get("/home/new", isLoggedIn, function(req, res){
	 res.render("pictures/new");
});

app.get("/home/:id", function(req, res){
	Picture.findById(req.params.id, function(err, foundPicture){
		if(err){
			console.log(err);
		} else{
			res.render("pictures/show", {picture: foundPicture});
		}
	});
});

// app.get("/home/:id", function(req, res){
// 	Picture.findById(req.params.id, function(err, picture){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			res.render("pictures/show", {picture: picture});
// 		}
// 	});
// });

// app.post("home/:id", function(req, res){
// 	Picture.findById(req.params.id, function(err, picture){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			Comment.create(req.body.comment, function(err, comment){
// 				if(err){
// 					console.log(err);
// 				} else{
// 					picture.comments.push(comment);
// 					picture.save();
// 					res.redirect("/show/" + picture._id)
// 				}
// 			});
// 		}
// 	});
// });


app.get("/register", function(req, res){
	res.render("register")
});

app.post("/register", function(req, res){
	var newUser = new User({username:req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register");
		} 
			passport.authenticate("local",)(req, res, function(){
				res.redirect("/home")
		});
	});
});

app.get("/login", function(req, res){
	res.render("login");
})

app.post("/login", passport.authenticate("local", 
		{
	     successRedirect: "/home",
	     failureRedirect: "/login"
	}),	function(req, res){
	
});
 
app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/home");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen("3000", function(){
	console.log("Pinterest is running");
});
		