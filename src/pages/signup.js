// pages/signup.js
import React, { useState } from 'react';
import SignupForm from '@/components/SignupForm/SignupForm';
import Login from '@/components/Login/Login';

const Signup = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleToggleSignupForm = () => {
    setShowSignupForm(!showSignupForm);
  };

  return (
    <div>
      <Login onToggleSignupForm={handleToggleSignupForm} />
      {showSignupForm && <SignupForm />}
    </div>
  );
};

export default Signup;
