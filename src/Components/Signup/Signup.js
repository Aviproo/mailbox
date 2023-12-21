import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Signup.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  let [validation, setValidation] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password.length < 8) {
      alert("password should not lees then 8");
    } else if (password != confirmPassword) {
      alert("Both password should match");
    } else {
      validation = true;
    }

    if (validation) {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCvzryAZ4dVWRP2PJ-eM4EE78m3NrDF5F0";

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            alert("You have succesfully signup");
            navigate("login");
          });
        } else {
          return res.json().then((data) => {
            alert(data.error.message);
          });
        }
      });
    }
  };

  return (
    <div>
      <Form className={classes.form} onSubmit={submitHandler}>
        <h4>Signup</h4>
        <Form.Group className="mb-4">
          <Form.Control placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="confirm Password"
            ref={confirmPasswordRef}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        <div className={classes.haveAnAccount}>
          Have an account?{" "}
          <span onClick={() => navigate("login")} className={classes.login}>
            Login
          </span>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
