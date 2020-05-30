var express = require("express"),
	router  = express.Router()

router.get("/user", function(req, res){
	res.render("user/profile");
});

module.exports = router;