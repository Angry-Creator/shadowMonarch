const mongoose = require("mongoose");
const { isEmail } = require("validation");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt();
    this.password = bcrypt.hash(this.password, salt);
    console.log(this.password);
});

const User = mongoose.model("user", userSchema);


module.exports = User;