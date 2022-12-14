const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const chats = require("./dummydata");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const PORT = process.env.PORT || 5000;
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const messageRoute = require("./routes/messageRoute");
const { isBooleanObject } = require("util/types");
dotenv.config();
// database connection
connectDB();
const app = express();
app.use(express.json());

// endpoints
app.use("/api/user", userRoutes);
// chat route
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoute);
app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

socket.on('typing', (data)=>{
      io.to(data.room).emit('')
})
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});