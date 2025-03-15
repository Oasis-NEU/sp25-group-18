import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar/navbar";
//import Home from "./pages/Home";
import Events from "../src/pages/Events/Events";
//import Signup from "./pages/Signup";
//import Login from "./pages/Login";
//import Profile from "./pages/Profile"; 

function App() {
  return (
    <Router>
      <Navbar />
          <Routes>
            <Route path="/events" element={<Events />} />
          </Routes>
    </Router>
  );
}

export default App;
