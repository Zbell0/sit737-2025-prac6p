const express = require("express");
const dbConnect = require("./config/dbConnect");
const methodOverride = require("method-override");

const app = express(); // Initialize the app before using it

app.use(methodOverride("_method")); // Place methodOverride after app initialization

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public/css"));

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes after middleware setup
app.use("/todos", require("./routes/toDoRoutes"));

app.get("/", (req, res) => {
  res.send("hello, node!");
});
app.get("/healthz", (req, res) => res.send("OK"));

app.listen(3000, () => {
  console.log("Server is on");
});
