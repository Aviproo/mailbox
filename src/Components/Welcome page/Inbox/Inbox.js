import { Button } from "react-bootstrap";
import classes from "./Inbox.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Inbox = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState([]);
  const [check, setCheck] = useState(false);
  const [item, setItem] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("email");
    navigate("/");
  };

  let userid = "";
  const emailId = localStorage.getItem("email");

  for (let i = 0; i < emailId.length; i++) {
    if (emailId[i] == "@" || emailId[i] == ".") {
      continue;
    }
    userid += emailId[i];
  }

  useEffect(() => {
    try {
      const getData = async () => {
        let mailData = await axios.get(
          `https://ecom-3c668-default-rtdb.firebaseio.com/${userid}.json`
        );
        if (mailData.data == null) {
          setItem(true);
        } else {
          setCheck(true);
          setItem(false);
          setMail(Object.entries(mailData.data));
        }
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteHandler = async (id) => {
    const response = await axios.delete(
      `https://ecom-3c668-default-rtdb.firebaseio.com/${userid}/${id}.json`
    );

    try {
      const getData = async () => {
        let mailData = await axios.get(
          `https://ecom-3c668-default-rtdb.firebaseio.com/${userid}.json`
        );
        console.log();
        if (mailData.data != null) {
          setCheck(true);
          setMail(Object.entries(mailData.data));
        }
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const show = <div>Loading...</div>;
  const itemNotFOund = <div>No mails</div>;

  const mailItems = (
    <div>
      {mail.map((item) => {
        return (
          <div className={classes.item} key={Math.random()}>
            <div
              className={classes.email}
              onClick={() => navigate(`${item[1].description}`)}
            >
              {item[1].email}
            </div>
            <div
              className={classes.subject}
              onClick={() => navigate(`${item[1].description}`)}
            >
              {item[1].subject}
            </div>
            <Button onClick={() => deleteHandler(item[0])}>Delete</Button>
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
            <div onClick={() => navigate("sent")}>Sent</div>
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
          <div>{item && itemNotFOund}</div>
          <div>{!item && !check ? show : mailItems}</div>
        </div>
      </div>
    </>
  );
};
export default Inbox;
