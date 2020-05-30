var express = require("express"),
	router  = express.Router(),
    Picture = require("../models/picture"),
	Comment = require("../models/comment")

router.get("/home/:id/comments/new", function(req, res){
	Picture.findById(req.params.id, function(err, picture){
		if(err){
			console.log(err);
		} else{
			res.render("pictures/show", {picture: picture});
		}
	});
});

router.post("/home/:id/comments", function(req, res){
   //lookup campground using ID
   Picture.findById(req.params.id, function(err, picture){
       if(err){
           console.log(err);
           res.redirect("/home/:id");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               pictures.comments.push(comment);
               picture.save();
               console.log(comment);
               res.redirect('/campgrounds/' + picture._id);
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
