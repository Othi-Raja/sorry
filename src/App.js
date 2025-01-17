import React, { useState, useEffect } from "react";
import { Container, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Default password
  const defaultPassword = "defaultPassword";

  useEffect(() => {
    const handleLoad = () => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // Show loading for an additional 2 seconds

      return () => clearTimeout(timer);
    };

    // Attach the event listener for when the DOM is fully loaded
    window.addEventListener("load", handleLoad);
    
    // Clean up the event listener on component unmount
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (password === defaultPassword) {
      window.open("https://www.example.com", "_blank"); // Open a new tab with the specified URL
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      {loading ? (
        <Container style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
          <DotLottieReact
            src="https://lottie.host/3e778809-cecd-4d7a-9548-2b78d02b7442/ujaCGqzJZG.lottie"
            loop
            autoplay
          />
        </Container>
      ) : (
        <Container style={{ height: '100vh' }} className="d-flex flex-column justify-content-center align-items-center">
          <TextField
          
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="standard"
            value={password}
            onChange={handlePasswordChange}
            error={!!error}
            helperText={error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <Button variant="contained"  onClick={handleSubmit} style={{ marginTop: '16px' }}>
            Submit
          </Button>
        </Container>
      )}
    </div>
  );
}

export default App;
