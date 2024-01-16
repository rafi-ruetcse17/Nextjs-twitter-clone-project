// import React from 'react'
// import styles from "./Login.module.css"
// import { BsTwitterX } from "react-icons/bs";
// import {FcGoogle} from "react-icons/fc"
// import {FaGithub} from "react-icons/fa"
// import { signIn } from 'next-auth/react';

// const Login = () => {
//   const handleGoogleLogin = () =>{
//     signIn('google')
//   }
//   const handleGithubLogin = () =>{
//     signIn('github')
//   }
//   return (
//     <div className={styles["container"]}>
//         <div className={styles["logo"]}>
//             <BsTwitterX className={styles["x-color"]}/>
//         </div>

//         <div className={styles["authentication"]}>
//             <div className={styles["button"]} onClick={handleGoogleLogin}>
//                 <FcGoogle className={styles["button-icon"]}/>
//                 Sign up with Google
//             </div>
//             <div className={styles["button"]} onClick={handleGithubLogin}>
//                 <FaGithub className={styles["button-icon"]}/>
//                 Sign up with Github
//             </div>
//             <div className={styles["or"]}>or</div>
//             <div className={styles["create-account"]} onClick={handleGithubLogin}>
//                 Create account
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Login

import React, { useState } from "react";
import styles from "./Login.module.css";
import { BsTwitterX } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import SignupForm from "@/components/SignupForm/SignupForm";
import LoginForm from "@/components/LoginForm/LoginForm";

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleGoogleLogin = () => {
    signIn("google");
  };

  const handleGithubLogin = () => {
    signIn("github");
  };

  const toggleSignupForm = () => {
    setShowSignup(!showSignup);
    setShowLogin(false); // Hide LoginForm when SignupForm is shown
  };

  const toggleLoginForm = () => {
    setShowLogin(!showLogin);
    setShowSignup(false); // Hide SignupForm when LoginForm is shown
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["logo"]}>
        <BsTwitterX className={styles["x-color"]} />
      </div>

      <div className={styles["authentication"]}>
        {!showSignup && !showLogin && (
          <>
            <div className={styles["button"]} onClick={handleGoogleLogin}>
              <FcGoogle className={styles["button-icon"]} />
              Sign up with Google
            </div>
            <div className={styles["button"]} onClick={handleGithubLogin}>
              <FaGithub className={styles["button-icon"]} />
               Sign up with Github
            </div>
            <div className={styles["or"]}>
              or
            </div>
            <div className={styles["create-account"]} onClick={toggleSignupForm}>
              Create account
            </div>
            <h3 className={styles["sign-in-header"]}>Already have an account?</h3>
            <div className={styles["create-account"]} onClick={toggleLoginForm}>
              Sign in
            </div>
          </>
        )}

        {showSignup && <SignupForm onClose={toggleSignupForm} />}

        {showLogin && <LoginForm onClose={toggleLoginForm} />}
      </div>
    </div>
  );
};

export default Login;
