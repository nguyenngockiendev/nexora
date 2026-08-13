require("dotenv").config();

const cors = require("cors");
const express = require("express");
const DBconnection = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const Router = require("./router/router");
const registerSoket = require("./socket");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 9000;
app.use(express.json());
DBconnection();
app.use("/uploads", express.static("uploads"));
app.use("/api", Router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.set("io", io);

io.on("connection", (socket) => {
  registerSoket(io, socket);
});

server.listen(PORT, () => {
  console.log(`Inventory server is running on port ${PORT}`);
});
