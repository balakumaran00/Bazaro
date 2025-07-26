const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectToDatabase = require("./config/db");
const routes = require("./routes/routes");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routes);

app.use(express.json());

connectToDatabase();

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
