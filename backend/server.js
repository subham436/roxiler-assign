
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
require("colors");
const env = process.env.NODE_ENV;
require("dotenv").config({ path: `.env.${env}` })

const port = process.env.NODE_PORT || 5000;

require("./config/mongodb");

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("/api", require("./api.routes"));

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () =>
  console.log(`server started on port ${port}`.yellow.bold)
);
