
require('dotenv').config();

const express = require('express');
const connectToDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const conversationRoutes = require('./routes/conversation-routes');
const messageRoutes = require('./routes/message-routes');
const userRoutes = require('./routes/userroutes');
const http = require('http');
const {Server} = require("socket.io");
connectToDB();

const app = express();

const server = http.createServer(app);

app.use(express.json());

const {setIo, onlineUsers} = require("./socket");

const cors = require("cors");


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 3000;

const io = new Server(server, {
  cors : {
    origin: "http://localhost:5173",
    credentials: true,
  }
});

setIo(io);


io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;

    console.log(
      "User joined:",
      userId,
      socket.id
    );
  });

  socket.on("disconnect", () => {

    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }

    console.log(
      "User Disconnected:",
      socket.id
    );
  });
});

server.listen(PORT, () => {
    console.log(`Server is now running at ${PORT}`);
})
