import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

import "../../styles/LoginStyle.css";

function Login() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // form submit
  const handleSbumit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        {
          email: email,
          password: password,
        }
      );
      if (response && response.data.success) {
        toast.success("User Logged In Successfully");
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow
          className="justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              The best offer <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                for your business
              </span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              itaque accusantium odio, soluta, corrupti aliquam quibusdam
              tempora at cupiditate quis eum maiores libero veritatis? Dicta
              facilis sint aliquid ipsum atque?
            </p>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <div
              id="radius-shape-3"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-4"
              className="position-absolute shadow-5-strong"
            ></div>

            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-5">
                <MDBInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  wrapperClass="mb-3"
                  label="Email"
                  id="form2"
                  type="email"
                />

                <MDBInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  wrapperClass="mb-3"
                  label="Password"
                  id="form3"
                  type="password"
                />

                <a
                  href="/register"
                  style={{
                    color: "#34495e",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                    float: "left",
                    marginLeft: "10px",
                    marginBottom: "15px",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#e74c3c")} // Darker color on hover
                  onMouseOut={(e) => (e.target.style.color = "#34495e")} // Restore original color on mouse out
                >
                  Sign Up?
                </a>

                <a
                  href="/forgot-password"
                  style={{
                    color: "#34495e",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                    float: "right",
                    marginRight: "20px",
                    marginBottom: "15px",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#e74c3c")} // Darker color on hover
                  onMouseOut={(e) => (e.target.style.color = "#34495e")} // Restore original color on mouse out
                >
                  Forgot Password?
                </a>

                <button
                  type="button"
                  className="btn btn-primary w-100 mb-4"
                  style={{ maxWidth: "600px", margin: "0 auto" }}
                  onClick={handleSbumit}
                >
                  Log in
                </button>

                <div className="text-center">
                  <p>or log in with:</p>

                  <a href="#" className="btn btn-outline-primary mx-3">
                    <FontAwesomeIcon icon={faFacebookF} size="sm" />
                  </a>

                  <a href="#" className="btn btn-outline-primary mx-3">
                    <FontAwesomeIcon icon={faTwitter} size="sm" />
                  </a>

                  <a href="#" className="btn btn-outline-danger mx-3">
                    <FontAwesomeIcon icon={faGoogle} size="sm" />
                  </a>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ToastContainer position="top-center" theme="dark" autoClose={1000} />
    </>
  );
}

export default Login;
