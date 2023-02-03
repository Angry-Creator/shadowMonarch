const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dbLogin = require("./config/dbLogin");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.all(["/", "/home"], (req, res) => {
    res.render("home");
});

app.get("/read-cookie", (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.status(200).send(cookies);
});

app.get("/create-cookie", (req, res) => {
    //Clearing all cookies
    for(let cookieKey in req.cookies){
        res.clearCookie(cookieKey);
    }
    
    res.cookie("loggedIn", "false", { maxAge: 1000 * 60 * 60 * 24 });
    res.send("Cookies Sent!");
})

app.use(authRoutes);

//Removing Deprecation Warning on mongoose
mongoose.set("strictQuery", false);
const dbUri = `mongodb+srv://${dbLogin.username}:${dbLogin.password}@mydb.jio0eir.mongodb.net/?retryWrites=true&w=majority   `;


// mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
//     app.listen(PORT, () => {
//         console.log("Server is listening at PORT: ", PORT);
//     });
// }).catch((err) => {
//     console.log(err)
// });

//Delete with done with admin panel design
app.listen(PORT, () => {
    console.log("Server is listening at PORT: ", PORT);
});