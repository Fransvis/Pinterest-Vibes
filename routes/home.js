var express = require("express"),
	router  = express.Router(),
	Picture = require("../models/picture")
	
	

router.get("/home", function(req, res){
	Picture.find({}, function(err, pictures){
		if(err){
			console.log(err);
		} else{
			res.render("pictures/index", {pictures: pictures, currentUser: req.user});
		}
	});
});

router.post("/home", isLoggedIn, function(req, res){
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

router.get("/home/new", isLoggedIn, function(req, res){
	 res.render("pictures/new");
});

router.get("/home/:id", function(req, res){
	Picture.findById(req.params.id, function(err, foundPicture){
		if(err){
			console.log(err);
		} else{
			res.render("pictures/show", {picture: foundPicture});
		}
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;