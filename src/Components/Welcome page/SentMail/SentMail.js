import { useNavigate } from "react-router-dom";
import classes from "../Inbox/Inbox.module.css";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const SentMail = () => {
  const [sent, setSent] = useState([]);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("email");
    navigate("/");
  };
  const userEmail = localStorage.getItem("email");
  let userEmailId = "";
  for (let i = 0; i < userEmail.length; i++) {
    if (userEmail[i] == "@" || userEmail[i] == ".") {
      continue;
    }
    userEmailId += userEmail[i];
  }

  useEffect(() => {
    const getSentData = async () => {
      const getMail = await axios.get(
        `https://ecomapp-3b7b4-default-rtdb.firebaseio.com/${userEmailId}_sent.json`
      );
      if (getMail.data == null) {
        setCheck(true);
      } else {
        setSent(Object.entries(getMail.data));
      }
    };
    getSentData();
  }, []);

  const deleteHandler = async (id) => {
    const response = await axios.delete(
      `https://ecomapp-3b7b4-default-rtdb.firebaseio.com/${userEmailId}_sent/${id}.json`
    );
    alert("message deleted Successfully");
    try {
      const getData = async () => {
        let mailData = await axios.get(
          `https://ecomapp-3b7b4-default-rtdb.firebaseio.com/${userEmailId}_sent.json`
        );

        if (mailData.data == null) {
          setCheck(true);
        } else {
          setSent(Object.entries(mailData.data));
        }
      };
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const noMessage = <div>No sent Messages</div>;
  const mailItems = (
    <div>
      {sent.map((item) => {
        return (
          <div className={classes.item} key={Math.random()}>
            <div className={classes.email}>{item[1].email}</div>
            <div className={classes.subject}>{item[1].subject}</div>
            <Button
              onClick={() => {
                deleteHandler(item[0]);
              }}
            >
              Delete
            </Button>
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
              <div className={classes.inbox} onClick={() => navigate(-1)}>
                Inbox <sup></sup>
              </div>
              <div>Unread</div>
              <div>Starred</div>
              <div>Draft</div>
              <div>
                Sent
                <sup style={{ fontWeight: "700" }}>{sent.length}</sup>
              </div>
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
            {check ? noMessage : mailItems}
          </div>
        </div>
      </>
    </>
  );
};
export default SentMail;
