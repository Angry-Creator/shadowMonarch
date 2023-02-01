const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dbLogin = require("./config/dbLogin");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.all(["/", "/home"], (req, res) => {
    res.render("home");
});

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