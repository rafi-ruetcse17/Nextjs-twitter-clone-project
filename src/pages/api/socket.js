import { Server } from "socket.io";
import Chat from "@/libs/models/chatSchema";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("send-message", async (messageData) => {
      const { conversation, sender_id, receiver_id, message } = messageData;
      //io.emit("receive-message", message);
      const chat = await Chat.findOneAndUpdate(
        {
          _id: conversation,
        },
        {
          $push: {
            conversation: {
              sender_id,
              receiver_id,
              message,
            },
          },
        },
        { upsert: true, new: true }
      );

      if(chat)
        io.to(conversation).emit("receive-message", { sender_id, receiver_id, message})
    });

    socket.on("join-room", ({roomId})=>{
      socket.join(roomId);
    })

    socket.on("disconnect", function(){
      console.log("user disconnected");
    })
  });

  console.log("Setting up socket");
  res.end();
}
