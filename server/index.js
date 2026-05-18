require("dotenv").config();

const cors = require("cors");
const express = require("express");
const DBconnection = require("./config/db");
const Router = require("./router/router");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 9000;
app.use(express.json());
DBconnection();
app.use("/uploads", express.static("uploads"));
app.use("/api", Router);

app.listen(PORT, () => {
  console.log(`Inventory server is running on port ${PORT}`);
});

