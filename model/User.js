const mongoose = require("mongoose");
const { isEmail } = require("validation");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validation: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        require: [true, "Please enter a password"],
        minlength: [6, "Minimun password length is 6 characters"]
    },
});

const User = mongoose.model("user", userSchema);

module.exports = User;