const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/dbLogin");

//Handle Errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    //Incorrect email
    if (err.message == "Incorrect email") {
        errors.email = "that email si not registered";
    }

    //Incorrect password
    if (err.message == "Incorrect password") {
        errors.password = "that password is incorrect";
    }

    //Duplicate error code
    if (err.code === 11000) {
        errors.email = "that email is already registered";
        return errors;
    }

    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge = 60 * 60 * 24 * 3;

const createToken = (id) => {
    return jwt.sign({ id }, secretKey, {
        expiresIn: maxAge
    })
}

module.exports.pricing_get = (req, res) => {
    res.render("pricing");
}
module.exports.signup_get = (req, res) => {
    res.render("signup");
}
module.exports.login_get = (req, res) => {
    res.render("login");
}

module.exports.pricing_post = (req, res) => {
    const { email, password } = req.body;
    res.send("User Login");
}
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * maxAge });
        res.status(200).json({ user: user._id });

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}


module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge : 1 });
    res.redirect("/");
}