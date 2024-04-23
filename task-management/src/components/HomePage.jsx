import React, { useState, useEffect } from 'react';
import Login from './LogIn';
import SignUp from './SignUp';
import DashBoard from './DashBoard';
import TaskForm from './TaskForm';

function HomePage() {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDashBoard, setIsDashBoard] = useState(false);
  useEffect(() => {
    // Check if user is logged in using session storage
    const loggedIn = sessionStorage.getItem('token');
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    setIsLogin(true);
    setIsSignup(false);
  };

  const handleSignupClick = () => {
    setIsSignup(true);
    setIsLogin(false);
  };

  const handleGoToDashboard = () => {
    // Navigate to dashboard page
    setIsDashBoard(true)
    console.log('Navigate to dashboard');
  };

  const handleLogout = () => {
    // Remove user session and reset states
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsLogin(false);
    setIsSignup(false);
  };

  return (
    <div>
      {!isLoggedIn && (
        <div>
          <h1>Welcome to the Homepage</h1>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignupClick}>Sign Up</button>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <h1>Welcome back!</h1>
        
          <button onClick={handleGoToDashboard}>Go to Dashboard</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {isLogin && (
        <div>
          <h2>Login Component</h2>
          <Login />
          <button onClick={() => setIsLogin(false)}>Back</button>
        </div>
      )}
      {isSignup && (
        <div>
          <h2>Signup Component</h2>
          <SignUp />
          <button onClick={() => setIsSignup(false)}>Back</button>
        </div>
      )}
      {isDashBoard && (
        <div>
          <h2>Dashboard Component</h2>
          <DashBoard/>
          <button onClick={() => setIsDashBoard(false)}>Back</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
