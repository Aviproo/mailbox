import { Button } from "react-bootstrap";
import classes from "./EmailPage.module.css";

const EmailForm = () => {
  return (
    <>
      <div className={classes.container}>
        <div>
          <input placeholder="To" type="email" />
        </div>
        <div>
          <input placeholder="Test mail" />
        </div>
        <div>
          <input placeholder="This is a mail test" />
        </div>
        <Button>Send</Button>
      </div>
    </>
  );
};

export default EmailForm;
