const basicController = require("./controllers/basicController");
const advancedController = require("./controllers/advancedController");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello, node!");
});

app.get("/add", basicController.add);
app.get("/subtract", basicController.subtract);
app.get("/multiply", basicController.multiply);
app.get("/divide", basicController.divide);

app.get("/power", advancedController.power);
app.get("/sqrt", advancedController.sqrt);
app.get("/mod", advancedController.mod);

app.listen(port, () => {
  console.log(`Calculator app is running at http://localhost:${port}`);
});
