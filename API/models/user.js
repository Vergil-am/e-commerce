const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        FirstName: {type: String, required: true},
        LastName: {type: String, required: true},
        Email: {type: String, required: true, unique: true},
        Phone: {type: String, required: true,},
        Password: {type: String, required: true},
        isAdmin: {type: Boolean, default: false},
    }, {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema)