import { useNavigate, useParams } from "react-router-dom";
import classes from "../Inbox/Inbox.module.css";
import { Button } from "react-bootstrap";
const Description = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const logoutHandler = () => {
    localStorage.removeItem("email");
    navigate("/");
  };

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
                Inbox <sup>{""}</sup>
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
            <div>{id}</div>
          </div>
        </div>
      </>
    </>
  );
};
export default Description;
