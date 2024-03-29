import "./App.css";
import SignUp from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";

import Inbox from "./Components/Welcome page/Inbox/Inbox";
import EmailForm from "./Components/Welcome page/EmailPage/EmailPage";
import Description from "./Components/Welcome page/Description/Description";
import SentMail from "./Components/Welcome page/SentMail/SentMail";

function App() {
  return (
    <div className="App " id="responsive-off">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="login/inbox" element={<Inbox />} />
        <Route path="login/inbox/email" element={<EmailForm />} />
        <Route path="/login/inbox/:id" element={<Description />} />
        <Route path="/login/inbox/sent" element={<SentMail />} />
      </Routes>
    </div>
  );
}

export default App;
