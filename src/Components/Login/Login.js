import { useRef, useState } from "react";
import classes from "./Login.module.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [validation, setValidation] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (password.length >= 8) {
      setValidation(true);
    } else {
      alert("Password should not less then 8 character");
    }

    if (validation) {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCvzryAZ4dVWRP2PJ-eM4EE78m3NrDF5F0";

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            alert("You have succesfully loggedIn");
            localStorage.setItem("email", data.email);
            navigate("inbox");
            setTimeout(() => {
              alert(`Welcome to mailbox`);
            }, 300);
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
        <h4>Login</h4>
        <Form.Group className="mb-4">
          <Form.Control t placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        <div className={classes.forgot}>forgot password</div>
        <div>
          create an account?
          <span className={classes.sign} onClick={() => navigate("/")}>
            Sign
          </span>
        </div>
      </Form>
    </div>
  );
};
export default Login;
