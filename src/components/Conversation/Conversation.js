import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./Conversation.module.css";
import { TiMessages } from "react-icons/ti";
import { TbMessagePlus } from "react-icons/tb";

let socket;

export default function Conversation({ sessionUser, user, conversation }) {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socketInitializer();

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  async function socketInitializer() {
    await fetch("/api/socket");

    socket = io();

    socket.on("receive-message", (data) => {
      console.log("data", data);
      setAllMessages((pre) => [...pre, data]);
    });

    socket.on("disconnect", function () {
      console.log("user disconnected");
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("emitted");

    socket.emit("send-message", {
      username,
      message,
    });

    setMessage("");
  }

  return (
    <section className={styles["container"]}>
      <h2>{user?.name}</h2>
      <h1>Enter a username</h1>

      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <br />
      <br />

      <div>
        {allMessages.map(({ username, message }, index) => (
          <div key={index}>
            {username}: {message}
          </div>
        ))}

        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete={"off"}
          />
        </form>
      </div>
    </section>
  );
}
