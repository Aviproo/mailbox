import { Button } from "react-bootstrap";
import classes from "./Inbox.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Inbox = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState([]);

  const logoutHandler = () => {
    localStorage.removeItem("email");
    navigate("/");
  };

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
        setMail(Object.values(mailData.data));
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log(mail.length);
  const show = <div>Nothing received</div>;
  const mailItems = (
    <div>
      {mail.map((item) => {
        return (
          <div className={classes.item} key={Math.random()}>
            <div className={classes.email}>{item.email}</div>
            <div className={classes.subject}>{item.subject}</div>
          </div>
        );
      })}
    </div>
  );
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
            <Button onClick={logoutHandler}>logout</Button>
          </div>
          <div>{mail.length == 0 ? show : mailItems}</div>
        </div>
      </div>
    </>
  );
};
export default Inbox;
