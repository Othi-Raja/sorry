import React, { useState, useEffect } from "react";
import { Container, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './App.css';
import {  toast } from "react-toastify";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
function App() {
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Default password
  const defaultPassword = "janani1020";

  useEffect(() => {
    AOS.init();
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
    if (password.toLowerCase() === defaultPassword) {
      window.open("https://www.example.com", "_blank"); // Open a new tab with the specified URL
    } else {
      setError("Invalid password");
    }
  };
const toastify= ()=> toast(`Here is Your Hint, the Password Is Your Name + DayMont (xxxx)`, {
  
  position: "top-center",
  autoClose: false,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  style:{
    textAlign: "center",
  }
  

  });
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
            data-aos="fade-in" 
              data-aos-duration="200"
                data-aos-delay="100"
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
            
          />
          
          <Button   data-aos="fade-in"   data-aos-delay="200"  data-aos-duration="600"   className="bg-black border-0 mt-3 text-white px-4"  onClick={handleSubmit} style={{ marginTop: '16px' }}>
            Submit 
          </Button>
          <Button   data-aos="fade-in"    data-aos-delay="300"   data-aos-duration="900" className= "small "style={{color:'grey'}} disableRipple  onClick={()=> toastify()}> Hint</Button>

        </Container>
      )}
    </div>
  );
}

export default App;
