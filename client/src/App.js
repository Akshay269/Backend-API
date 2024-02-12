import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashBoard from "./pages/DashBoard";

function App() {
 
  return (
    <div className="App">
      <Routes>
        <Route exact path="/dashboard" element={<DashBoard />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;