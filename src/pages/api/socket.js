import { Server } from "socket.io";
import { markMessagesSeen } from "@/libs/services/messageService";
import { sendMessage } from "@/libs/services/messageService";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("send-message", async (messageData) => {
      const { chatId, sender_id, receiver_id, message } = messageData;
      const chat = await sendMessage({
        query: { _id: chatId },
        update: {
          $push: {
            messages: {
              sender_id,
              receiver_id,
              message,
            },
          },
        },
      });

      if (chat) {
        const lastMessage = chat.messages[chat.messages.length - 1];
        io.to(chatId).emit("receive-message", {
          lastMessage,
          roomId: chatId,
        });
        io.emit("notification", chat);
      }
    });

    socket.on("mark-as-seen", async ({ chatId, messageIds }) => {
      const updatedChat = await markMessagesSeen({
        chatId,
        messageIds,
      });

      if (updatedChat) {
        io.to(chatId).emit("marked-as-seen", {
          chatId,
          messageIds,
        });
      }
    });

    socket.on("join-room", ({ roomId }) => {
      socket.join(roomId);
    });
  });
  res.end();
}
