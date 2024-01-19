import { getUser } from "@/libs/actions/userAction";
import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { FaGithub } from "react-icons/fa";
import { FcApproval, FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter()

  const handleGoogleLogin = () => {
    signIn("google");
  };
  const handleGithubLogin = () => {
    signIn("github");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const response = await getUser({ email, password });
    const status = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if(status.ok)
      router.push("/home");
    else
      setError(status.error)
    //setError(null);
  };

  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <button className={styles["close"]} onClick={onClose}>
          &times;
        </button>
        {/* <div className=""><FcApproval/> <span>Successfully verified!</span></div> */}
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /> */}

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

          <button type="submit">Sign in</button>
          <div className={styles["or"]}>or</div>
          <div className={styles["button"]} onClick={handleGoogleLogin}>
            <FcGoogle className={styles["button-icon"]} />
            Sign up with Google
          </div>
          <div className={styles["button"]} onClick={handleGithubLogin}>
            <FaGithub className={styles["button-icon"]} />
            Sign up with Github
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
