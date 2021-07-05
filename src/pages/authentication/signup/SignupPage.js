import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { signUp } from "../../../helpers/signupHelper";
import Background from "../../../assets/clothingBackground.jpg";
import "../signup/signup.module.scss";

const SignupPage = () => {
  const [values, setValues] = useState({
    userName: "",
    phoneNumber: "",
    userID: "",
    password: "",
    error: "",
    success: false,
  });

  const { userName, phoneNumber, userID, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  // OnSubmit Method for Submit Button
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ userName, phoneNumber, userID, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            userName: "",
            phoneNumber: "",
            userID: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup!"));
  };

  // Success message will pops up after successful signup.
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account was successfully created
            <Link to="/login"> Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  // Error message will pops up after failed signup.
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  /* Signup Form */
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="flex-container">
          <div className="col-sm-4">
            <img src={Background} className="img-fluid" alt='' />
          </div>
          <div className="col-sm-4 ">
            <form className="mt-5">
              {/* Email Field */}
              <div className="form-group">
                <TextField
                  onChange={handleChange("userName")}
                  id="standard-basic"
                  label="Full Name"
                  value={userName}
                />
              </div>

              {/* Mobile number */}
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  label="Mobile Number"
                  onChange={handleChange("phoneNumber")}
                  value={phoneNumber}
                />
              </div>

              {/* User ID */}
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  onChange={handleChange("userID")}
                  value={userID}
                  label="User ID"
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  onChange={handleChange("password")}
                  value={password}
                  label="Password"
                />
              </div>

              {/* Submit Button */}
              <Button
                className="btn btn-outline-secondary"
                type="submit"
                onClick={onSubmit}
                variant="outlined"
                color="default"
                size="medium"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-center pt-4">
      <div className="container">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
      </div>
    </div>
  );
};

export default SignupPage;
