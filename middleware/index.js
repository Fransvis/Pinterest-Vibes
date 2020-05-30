var Picture = require("../models/picture")
    // Comment = require("../models/Comment")

var middlewareObj = {};

middlewareObj.checkPictureOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Picture.findById(req.params.id, function(err, foundPicture){
			if(err){
				res.redirect("back");
			} else {
				if(foundPicture.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		});
           } else {
			   res.redirect("back")
		   }
}

module.exports = middlewareObj;