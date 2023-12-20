import { Button } from "react-bootstrap";
import classes from "./EmailPage.module.css";
import { useRef } from "react";
import axios from "axios";

const EmailForm = () => {
  const emailRef = useRef();
  const subjectRef = useRef();
  const descriptionRef = useRef();
  const userEmail = localStorage.getItem("email");

  const getData = async () => {
    let mailData = await axios.get(
      `https://ecom-3c668-default-rtdb.firebaseio.com/agmailcom.json`
    );
    console.log(Object.values(mailData.data));
  };

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
        <Button onClick={getData}>Get data</Button>
      </div>
    </>
  );
};

export default EmailForm;
