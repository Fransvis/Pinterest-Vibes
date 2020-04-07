var mongoose = require("mongoose")

var postSchema = new mongoose.Schema({
	name: String,
	password: String
	
});

module.exports = mongoose.model("Post", userSchema);