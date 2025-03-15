import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar/navbar";
//import Home from "./pages/Home";
import Events from "../src/pages/Events/Events";
import Create from "../src/pages/Create/Create";
//import Signup from "./pages/Signup";
//import Login from "./pages/Login";
//import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/events" element={<Events />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
