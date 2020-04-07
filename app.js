var express       = require("express"),
    app           = express(),
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose"),
	Picture       = require("./models/picture"),
	passport      = require("passport"),
	LocalStrategy = require("passport-local"),
	User          = require("./models/user")

var pictureRoutes = require("./routes/home"),
	// CommentRoutes = require("./routes/comments"),
    authRoutes    = require("./routes/auth")


    

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
 
// app.use(CommentRoutes);
app.use(pictureRoutes);
app.use(authRoutes);



app.listen("3000", function(){
	console.log("Pinterest is running");
});
		