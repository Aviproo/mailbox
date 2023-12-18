import { Button } from "react-bootstrap";
import "./App.css";
import SignUp from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
