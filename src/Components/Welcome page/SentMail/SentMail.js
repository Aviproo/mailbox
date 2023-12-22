import { useNavigate } from "react-router-dom";
import classes from "../Inbox/Inbox.module.css";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const SentMail = () => {
  const [sent, setSent] = useState([]);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("email");
    navigate("/");
  };
  useEffect(() => {
    const getSentData = async () => {
      const userEmail = localStorage.getItem("email");
      let userEmailId = "";
      for (let i = 0; i < userEmail.length; i++) {
        if (userEmail[i] == "@" || userEmail[i] == ".") {
          continue;
        }
        userEmailId += userEmail[i];
      }
      const getMail = await axios.get(
        `https://ecom-3c668-default-rtdb.firebaseio.com/${userEmailId}_sent.json`
      );
      console.log(getMail);
      setSent(Object.entries(getMail.data));
      console.log(sent);
    };
    getSentData();
  }, []);

  const mailItems = (
    <div>
      {sent.map((item) => {
        return (
          <div className={classes.item} key={Math.random()}>
            <div className={classes.email}>{item[1].email}</div>
            <div className={classes.subject}>{item[1].subject}</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
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
                Inbox <sup></sup>
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
              <h4>{localStorage.getItem("email")}</h4>
              <Button onClick={logoutHandler}>logout</Button>
            </div>
            {mailItems}
          </div>
        </div>
      </>
    </>
  );
};
export default SentMail;
