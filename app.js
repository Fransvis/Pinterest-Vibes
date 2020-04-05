var express       = require("express"),
    app           = express(),
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose")
    

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/pinterest_vibes", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var pictureSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Picture = mongoose.model("picture", pictureSchema); 
 

app.get("/", function(req, res){
	res.render("landing")
});

app.get("/home", function(req, res){
	Picture.find({}, function(err, pictures){
		if(err){
			console.log(err);
		} else{
			res.render("index", {pictures: pictures});
		}
	});
});

app.post("/home", function(req, res){
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

app.get("/home/new", function(req, res){
	 res.render("new");
});

app.get("/home/:id", function(req, res){
	Picture.findById(req.params.id, function(err, foundPicture){
		if(err){
			console.log(err);
		} else{
			res.render("show", {picture: foundPicture});
		}
	});
});




app.listen("3000", function(){
	console.log("Pinterest is running");
});
		