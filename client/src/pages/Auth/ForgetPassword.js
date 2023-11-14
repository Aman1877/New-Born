import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

import "../../styles/ForgetPassword.css";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/send-otp`,
        {
          email: email,
        }
      );
      if (response && response.data.success) {
        toast.success("OTP sent Successfully");
        navigate("/otp");
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
              id="radius-shape-5"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-6"
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

                <button
                  type="button"
                  className="btn btn-primary w-100 mb-4"
                  style={{ maxWidth: "600px", margin: "0 auto" }}
                  onClick={handleSubmit}
                >
                  Send OTP
                </button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <ToastContainer position="top-center" theme="dark" autoClose={1000} />
    </>
  );
}

export default ForgetPassword;
