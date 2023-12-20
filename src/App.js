import "./App.css";
import SignUp from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";

import Inbox from "./Components/Welcome page/EmailPage/Inbox/Inbox";
import EmailForm from "./Components/Welcome page/EmailPage/EmailPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="login/inbox" element={<Inbox />} />
        <Route path="login/inbox/email" element={<EmailForm />} />
      </Routes>
    </div>
  );
}

export default App;
