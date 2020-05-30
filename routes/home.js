var express = require("express"),
	router  = express.Router(),
	Picture = require("../models/picture"),
	middleware = require("../middleware")
	
	

router.get("/", function(req, res){
	Picture.find({}, function(err, pictures){
		if(err){
			console.log(err);
		} else{
			res.render("pictures/index", {pictures: pictures, currentUser: req.user});
		}
	});
});

router.post("/", isLoggedIn, function(req, res){
	var name   = req.body.name;
	var image  = req.body.image;
	var desc   = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newPicture = {name: name, image: image, description: desc, author: author}
	Picture.create(newPicture, function(err, newPicture){
		if(err){
			console.log(err);
		} else{
			console.log(newPicture);
			res.redirect("/home");
		}
	});
});

router.get("/new", isLoggedIn, function(req, res){
	 res.render("pictures/new");
});

router.get("/:id", function(req, res){
	Picture.findById(req.params.id, function(err, foundPicture){
		if(err){
			console.log(err);
		} else{
			res.render("pictures/show", {picture: foundPicture});
		}
	});
});

router.get("/:id/edit", middleware.checkPictureOwnership, function(req, res){
	Picture.findById(req.params.id, function(err, foundPicture){
		if(err){
			res.redirect("/home")
		} else{
			res.render("pictures/edit", {picture: foundPicture});
		}
	});
});

router.put("/:id", middleware.checkPictureOwnership, function(req, res){
	Picture.findByIdAndUpdate(req.params.id, req.body.picture, function(err, updatedPicture){
		if(err){
			res.redirect("/home/:id")
		} else{
			res.redirect("/home/" + req.params.id)
		}
	});
});

router.delete("/:id", middleware.checkPictureOwnership, function(req, res){
	Picture.findByIdAndRemove(req.params.id, function(err, removedPicture){
		if(err){
			res.redirect("/home/:id");
		} else{
			res.redirect("/home");
		}
	})
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;