import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("/api/socket");
        if (!response.ok) {
          throw new Error("Failed to fetch socket");
        }
        const newSocket = io();
        setSocket(newSocket);
        
        newSocket.on("disconnect", () => {
          console.log("user disconnected");
        });

        // Clean up the socket connection when the component unmounts
        return () => {
          newSocket.disconnect();
        };

        
      } catch (error) {
        console.error("Error fetching socket:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
