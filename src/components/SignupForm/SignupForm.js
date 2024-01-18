import { createUser } from "@/libs/actions/userAction";
import React, { useState } from "react";
import styles from "./SignupForm.module.css";
import { signIn, useSession } from "next-auth/react";

const SignupForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {data: session} = useSession()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({name, username, email, password });
      // const status = await signIn("credentials", {
      //   email: email,
      //   password: password,
      // });
      setError("Check Email & Verify Account!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <button className={styles["close"]} onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <h4 className={styles["error"]}>{error}</h4>}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
