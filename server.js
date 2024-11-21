import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("a new user connected");

  socket.on("new message", (msg) => {
    io.emit("new message", msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
