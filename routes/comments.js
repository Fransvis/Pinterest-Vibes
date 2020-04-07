var express = require("express"),
	router  = express.Router(),
    Picture = require("../models/picture"),
	Comment = require("../models/comment")

router.get("/home/:id", function(req, res){
	Picture.findById(req.params.id, function(err, picture){
		if(err){
			console.log(err);
		} else{
			res.render("pictures/show", {picture: picture});
		}
	});
});

router.post("home/:id", function(req, res){
	Picture.findById(req.params.id, function(err, picture){
		if(err){
			console.log(err);
		} else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else{
					picture.comments.push(comment);
					picture.save();
					res.redirect("/show/" + picture._id)
				}
			});
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
