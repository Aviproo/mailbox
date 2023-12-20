import { Button } from "react-bootstrap";
import classes from "./Inbox.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Inbox = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState([]);

  useEffect(() => {
    const emailId = localStorage.getItem("email");
    let userid = "";
    for (let i = 0; i < emailId.length; i++) {
      if (emailId[i] == "@" || emailId[i] == ".") {
        continue;
      }
      userid += emailId[i];
    }
    try {
      const getData = async () => {
        let mailData = await axios.get(
          `https://ecom-3c668-default-rtdb.firebaseio.com/${userid}.json`
        );
        console.log(Object.values(mailData.data));
        setMail(mailData.data);
        console.log(mail);
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <div className={classes.container}>
        <div className={classes.leftSide}>
          <div className={classes.mail}>
            <h2>Inbox Mail</h2>
          </div>
          <div className={classes.compose}>
            <Button
              onClick={() => navigate("email")}
              className={classes.composeBtn}
            >
              Compose
            </Button>
          </div>
          <div className={classes.inboxDivs}>
            <div className={classes.inbox}>
              Inbox <sup>{mail.length}</sup>
            </div>
            <div>Unread</div>
            <div>Starred</div>
            <div>Draft</div>
            <div>Sent</div>
            <div>Archive</div>
            <div>Spam</div>
            <div>Deleted</div>
          </div>
        </div>
        <div className={classes.rightSide}>
          <div className={classes.input}>
            <input />
            <Button>Search</Button>
          </div>
          <div>Your mail are Here</div>
        </div>
      </div>
    </>
  );
};
export default Inbox;
