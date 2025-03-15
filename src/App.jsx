import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar/navbar";
import Events from "../src/pages/Events/Events";
import Home from "./pages/Home/Home";
import Create from "../src/pages/Create/Create";
//import Signup from "./pages/Signup";
//import Login from "./pages/Login";
//import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
            <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
