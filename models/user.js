var mongoose               = require("mongoose")
var passportLocalMongoose  = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	name: String,
	password: String,
	// user: {
	// 	id: {
	// 	   type: mongoose.Schema.Types.ObjectId,
	// 	   ref: "Profile"
	// },
		
	// }
	
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);