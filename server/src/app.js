const bodyParser = require("body-parser");
const express = require("express");

const morgan = require("morgan");
const cors = require("cors");
const app = express();
const taskRoute = require("./routes/task.route");

// middleware
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// route
app.get("/", (req, res) => {
  res.status(200).send("Hello Hackathon3-Advance");
});
app.use("/api/v1/task", taskRoute);

// handle err

// start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server express running http://localhost:${PORT}`);
});
