import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  MDBIcon,
} from "mdb-react-ui-kit";

import "../../styles/RegisterStyle.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // form submit
  const handleSbumit = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name: name,
          email: email,
          phone: phone,
          password: password,
        }
      );
      if (response && response.data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow>
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
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-5">
                <MDBInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                  wrapperClass="mb-3"
                  label="Name"
                  id="form1"
                  type="text"
                />

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

                <MDBInput
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Your Phone Number"
                  wrapperClass="mb-3"
                  label="Phone Number"
                  id="form4"
                  type="text"
                />

                <button
                  type="button"
                  className="btn btn-primary w-100 mb-4"
                  style={{ maxWidth: "600px", margin: "0 auto" }}
                  onClick={handleSbumit}
                >
                  Sign up
                </button>

                <div className="text-center">
                  <p>or sign up with:</p>

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

export default Register;
