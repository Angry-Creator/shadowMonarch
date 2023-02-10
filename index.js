const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dbLogin = require("./config/dbLogin");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();
const PORT = 8000;

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(authRoutes);

//view engine
app.set("view engine", "ejs");

//routes
app.get("*", checkUser);
app.all(["/", "/home"], (req, res) => {
    res.render("home");
});

app.get("/admin", requireAuth, (req, res) => {
    res.render("admin");
});


//Database connection
//Removing Deprecation Warning on mongoose
mongoose.set("strictQuery", false);
const dbUri = `mongodb+srv://${dbLogin.username}:${dbLogin.password}@mydb.jio0eir.mongodb.net/?retryWrites=true&w=majority   `;
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    app.listen(PORT, () => {
        console.log("Server is listening at PORT: ", PORT);
    });
}).catch((err) => {
    console.log(err)
});

//Delete with done with admin panel design
// app.listen(PORT, () => {
//     console.log("Server is listening at PORT: ", PORT);
// });