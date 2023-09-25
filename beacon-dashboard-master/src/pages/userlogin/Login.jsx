import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaSignInAlt } from "react-icons/fa";
import {  Container, Spinner } from "react-bootstrap";
import "index.css";
// IMPORT SLICE
import { login } from "slices/auth";
import {fetchLocation, locationSelector} from "slices/locations"
import { clearMessage } from "slices/message";

// FORMIK VALIDATION (initialValues, validationSchema, handleSubmit)
const Login = () => {
let navigate = useNavigate();

const [loading, setLoading] = useState(false);
const [selectedLocation, setSelectedLocation] = useState(""); 

const { isLoggedIn } = useSelector((state) => state.auth);
const { message } = useSelector((state) => state.message);
const dispatch = useDispatch();

// const { location} = useSelector(locationSelector);


// REDIRECT LOGIN TO LOCATION - CHECK LSTORAGE FOR TOKEN
// useEffect(() => {
//   dispatch(clearMessage());

//   console.log("ISLOGGEDIN", isLoggedIn)
//   if(isLoggedIn) {
//     return <Navigate to="/dashboard" />;
//   }
// }, [dispatch, isLoggedIn]);

// useEffect(() => {
//   dispatch(clearMessage());
// }, [dispatch]);


const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username."),
  password: Yup.string().required("Please enter your password."),
});



// HANDLE LOGIN ON SUBMIT
const handleLogin = (formValue) => {
  const { username, password } = formValue;
  setLoading(true);

dispatch(login({username, password}))
  .unwrap()
  .then(() => {
    localStorage.setItem("selectedLocation", selectedLocation);
     navigate("/dashboard?code=Gantry-0002&from=2023-04-24T08:41:00.000&to=2023-04-28T00:00:00.000")
    //  window.location.reload()
  })
  .catch(() => {
    setLoading(false);
  })
};


// SET LOCATION
useEffect(() => {
  dispatch(fetchLocation());
}, [dispatch]);

useEffect(() => {
  const storedLocation = localStorage.getItem("selectedLocation");
  if (storedLocation) {
    setSelectedLocation(storedLocation);
  }
}, []);


if (isLoggedIn) {
  return (
  <Navigate to="/dashboard?code=Gantry-0002&from=2023-04-24T08:41:00.000&to=2023-04-28T00:00:00.000"/>
  )
};


//   try {
//     const data = await dispatch(login({ username, password }));
//     localStorage.setItem("user", JSON.stringify({ accessToken: data.token }));
//     navigate("/dashboard?code=Gantry-0002");
//   } catch (error) {
//     window.location.reload();
//   } finally {
//     setLoading(false);
//   }
// };




return (
  <Container
    className="mx-auto justify-content-center align-items-center"
    style={{
      marginTop: "100px",
      padding: "32px",
      height: "70vh",
      width: "32%",
    }}
  >
    {/* TITLE */}
    <section
      className="heading"
      style={{ textAlign: "center", marginBottom: "40px" }}
    >
      <h1 style={{ fontWeight: 600 }}>
        <FaSignInAlt /> Login
      </h1>
      <p style={{ fontSize: "16px" }}>Login to your account</p>
    </section>
    <section
      className="form"
      style={{
        width: "80%",
        margin: "auto",
      }}
    >
      {/* END OF TITLE */}

      {/* FORM START */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="username" style={{marginBottom: "8px"}}>Username</label>
            <Field name="username" type="text" className="form-control" style={{lineHeight: "32px"}}></Field>
            <ErrorMessage 
              name="username"
              component="div"
              className= "alert alert-danger"
            />
          </div>
          <div className="form-group" style={{
              width: "100%",
              marginTop: "16px",
              border: "none",}}>
            <label htmlFor="password" style={{marginBottom: "8px"}}>Password</label>
            <Field name="password" type="password" className="form-control" style={{lineHeight: "32px"}}></Field>
            <ErrorMessage 
              name="password"
              component="div"
              className= "alert alert-danger"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{
              width: "100%",
              marginTop: "24px",
              background: "#41b883",
              border: "none",
              heigth: "28px",
              lineHeight: "32px"}}>
              {loading && (
                <Spinner
                animation="border"
                variant="primary"
                style={{
                  width: "24px",
                  height: "24px",
                }}
              />
              )}
              <span>Login</span>
            </button>
          </div>
        </Form>
      </Formik>
      {/* FORM END */}
    </section>
    {message && (
      <div className="form-group" >
        <div className="alert alert-danger" role="alert" style={{background: "none", border: "none", fontColor: "#e50914"}}>
         {message}
        </div>
      </div>
    )}
  </Container>
);
};



export default Login;
