import React, { useState, useEffect } from "react";
import { Container, TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './App.css';
import { toast } from "react-toastify";
import AOS from 'aos';
import 'aos/dist/aos.css';
import sorry from './ass/sorry.png';
import { collection, addDoc } from 'firebase/firestore';
import { db } from "./firebaseconfig";
import { IoIosArrowForward } from "react-icons/io";
function App() {
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [yeauth, setAuth] = useState(false);
  const [error, setError] = useState("");
  const [submitmessage, setSMessage] = useState("Submit");
  const [messagebx, setmessagebox] = useState(false);
  const [userMessage, setUserMessage] = useState(""); // State for user message
  // Default password
  const defaultPassword = "janani1020";
  useEffect(() => {
    AOS.init();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loading for an additional 2 seconds
    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };
  // Function to handle input change
  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handlepwdSubmit = () => {
    if (password.toLowerCase() === defaultPassword) {
      setAuth(true)
      // window.open("https://www.example.com", "_blank");
    } else {
      setError("Invalid password");
    }
  };
  const submitToFirestore = async (value) => {
    setSMessage('Submiting....')

    if (userMessage) {
      try {
        await addDoc(collection(db, "messages"), {
          [value]: userMessage,
          timestamp: new Date(),
        });
        // Do not clear input field here
      } catch (error) {
        // Handle error if necessary
        console.error("Error submitting message: ", error.message);
      }
      finally{
        setSMessage('Submited')
      }
    }
  };
  const handleSubmit = () => {
    submitToFirestore('submited');
    setUserMessage(""); // Clear input field after submitting
    toast.success("Message submitted successfully!"); // Show toast only on button click
  };
  // Periodically send data to Firestore every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userMessage) {
        submitToFirestore("sText"); // Send data without clearing field or showing notification
      }
    }, 5000); // 5000 ms = 5 seconds
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [userMessage]);
  const toastify = () => toast(`Here is Your Hint, the Password Is Your Name + DayMonth (xxxx)`, {
    position: "top-center",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
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
        !yeauth ? (
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
              style={{
                maxWidth: '300px',
                width: '100%',
                margin: '0 auto',
              }}
            />
            <Button data-aos="fade-in" data-aos-delay="200" data-aos-duration="600" className="bg-black border-0 mt-3 text-white px-4" onClick={handlepwdSubmit} style={{ marginTop: '16px' }}>
              Submit
            </Button>
            <Button data-aos="fade-in" data-aos-delay="300" data-aos-duration="900" className="small " style={{ color: 'grey' }} disableRipple onClick={() => toastify()}> Hint</Button>
          </Container>
        ) : (
          !messagebx ?
            (
              <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div
                  className="d-flex justify-content-center align-items-center m-2"
                  style={{ height: "100vh" }}
                >
                  <div className="card" style={{ maxWidth: "400px", overflow: "visible" }}>
                    <img
                      src={sorry}
                      height={100}
                      data-aos="fade-up"
                      data-aos-duration="2000"
                      data-aos-delay="100"
                      className=" rounded-circle position-absolute start-50 translate-middle-x"
                      style={{ marginTop: "-80px", zIndex: '-10' }}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center mt-2">Sorry, please reevaluate my breakup.</h5>
                      <p className="card-text small " style={{ textAlign: 'justify' }}>
                        My Bad , etho theriyama theriyama elam nathurichu , una romba hurt panitan I feel Bad About it🥹😭 .please Break Up lam vena da please,We can resolve 🩹 this without breaking up, <spam className='small fw-bold'>enaku una romba pudikum da 🫂🫂 </spam> Enna manichuru da,I don't want to lose you , I understand that you're really hurt,but unfortunately It was happened, enaku theriyala evalo day it been take You to be normal, en old amu /janani vara varikum na wait panuran,I love you more today,than yesterday please ena manichuru ,na panathum thaaputha na apadi panierukakudathu tha ,pesamalam erukatha da , i understood,ni back to normal(heal) vara time eadukum ,na wait panuran  </p>
                      <p className="float-end">-CR/Rugged Raja</p>
                    </div>
                    <Button className="text-black small" disableRipple onClick={() => setmessagebox(true)}>Message <IoIosArrowForward /> </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="d-block">
                  <TextField
                    label="Your Text Here"
                    multiline
                    rows={4} // You can adjust the number of rows as needed
                    variant="standard"
                    value={userMessage} // Set the value to the userMessage state
                    onChange={handleMessageChange} // Handle change for user input
                    style={{ width: '400px' }} // Set the desired width
                  />
                  <div className="float-right">
                    <Button className="bg-black text-white mt-2 px-4" onClick={handleSubmit}>{submitmessage}</Button>
                  </div>
                </div>
              </div>
            )
        )
      )}
    </div>
  );
}
export default App;
