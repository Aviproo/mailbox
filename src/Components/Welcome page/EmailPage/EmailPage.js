import { Button } from "react-bootstrap";
import classes from "./EmailPage.module.css";
import { useRef } from "react";
import axios from "axios";

const EmailForm = () => {
  const emailRef = useRef();
  const subjectRef = useRef();
  const descriptionRef = useRef();
  const userEmail = localStorage.getItem("email");
  let userEmailId = "";
  for (let i = 0; i < userEmail.length; i++) {
    if (userEmail[i] == "@" || userEmail[i] == ".") {
      continue;
    }
    userEmailId += userEmail[i];
  }
  const sendMail = async () => {
    let userId = "";
    for (let i = 0; i < emailRef.current.value.length; i++) {
      if (
        emailRef.current.value[i] == "@" ||
        emailRef.current.value[i] == "."
      ) {
        continue;
      }
      userId += emailRef.current.value[i];
    }

    try {
      const response = await axios.post(
        `https://ecom-3c668-default-rtdb.firebaseio.com/${userId}.json`,
        {
          email: localStorage.getItem("email"),
          subject: subjectRef.current.value,
          description: descriptionRef.current.value,
        }
      );
      if (response.statusText == "OK") {
        alert("message sent successfully");
      }
      const sentMail = await axios.post(
        `https://ecom-3c668-default-rtdb.firebaseio.com/${userEmailId}_sent.json`,
        {
          email: localStorage.getItem("email"),
          subject: subjectRef.current.value,
          description: descriptionRef.current.value,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className={classes.container}>
        <div>
          <input placeholder="To" type="email" ref={emailRef} />
        </div>
        <div>
          <input placeholder="Test mail" ref={subjectRef} />
        </div>
        <div>
          <input placeholder="This is a mail test" ref={descriptionRef} />
        </div>
        <Button onClick={sendMail}>Send</Button>
      </div>
    </>
  );
};

export default EmailForm;
