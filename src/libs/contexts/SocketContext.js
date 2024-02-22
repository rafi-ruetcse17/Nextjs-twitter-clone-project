import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { connectSocket } from "../actions/messageAction";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await connectSocket();
      if (!response) {
        throw new Error("Failed to fetch socket");
      }
      const newSocket = io();
      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } catch (error) {
      console.error("Error fetching socket:", error);
    }
  };

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
