const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();

// app.set("view engine", "ejs");
// app.set("views", "./views");

// app.use(express.static("./public"));

dbConnect();

app.get("/", (req, res) => {
  res.send("hello,node!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/todos", require("./routes/toDoRoutes"));

app.listen(3000, () => {
  console.log("Server is on");
});
