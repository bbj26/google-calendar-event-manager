import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import getGoogleOAuthUrl from "../../utils/getGoogleUrl";
import { Typography } from "@mui/material";

const Login = () => {
  const handleLogin = () => {
    return getGoogleOAuthUrl();
  };
  return (
    <div className="login-container">
      <Typography variant="h4" mb="4rem">
        Google Calendar Events Manager
      </Typography>

      <Link className="google-login-button" to={handleLogin()}>
        <img
          src="https://img.icons8.com/color/16/000000/google-logo.png"
          alt="Google Logo"
        />
        Sign in with Google
      </Link>
    </div>
  );
};

export default Login;
