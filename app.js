var express       = require("express"),
    app           = express(),
	bodyParser    = require("body-parser"),
	mongoose      = require("mongoose")
    

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/pinterest_vibes", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var pictures = [
		{name: "Beautiful", image: "https://images.unsplash.com/photo-1485970671356-ff9156bd4a98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Pretty", image: "https://images.unsplash.com/photo-1485970671356-ff9156bd4a98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Stunning", image: "https://images.unsplash.com/photo-1485970671356-ff9156bd4a98?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
	]

app.get("/", function(req, res){
	res.render("landing")
});

app.get("/home", function(req, res){
	res.render("home", {pictures: pictures});
})

app.post("/home", function(req, res){
	var name  = req.body.name;
	var image = req.body.image;
	var newPicture = {name: name, image: image};
	pictures.push(newPicture);
	res.redirect("/home");
});

app.get("/home/new", function(req, res){
	 res.render("new");
});




app.listen("3000", function(){
	console.log("Pinterest is running");
});
		