require("dotenv").config();

const cors = require("cors");
const express = require("express");
const DBconnection = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const Router = require("./router/router");
const registerSoket = require("./socket");

const app = express();
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
  }),
);
const PORT = process.env.PORT;
app.use(express.json());
DBconnection();
app.use("/uploads", express.static("uploads"));
app.use("/api", Router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.set("io", io);

const jwt = require("jsonwebtoken");
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
    } catch {
      console.log("Socket token invalid, connecting as guest");
    }
  }
  next();
});

io.on("connection", (socket) => {
  registerSoket(io, socket);
});

server.listen(PORT, () => {
  console.log(`LMS server is running on port ${PORT}`);
});
