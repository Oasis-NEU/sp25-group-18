import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar/navbar";
import Home from "../src/pages/Home/Home";
import Events from "../src/pages/Events/Events";
import Create from "../src/pages/Create/Create";
import Login from "../src/pages/Login/Login";
import SignUp from "../src/pages/SignUp/SignUp";
import LoggedInHome from "../src/pages/LoggedInHome/LoggedInHome";
import { useState, useEffect } from "react";
import supabase from "./supabaseClient";

//import Signup from "./pages/Signup";
//import Login from "./pages/Login";
//import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Checking session...");
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData.session) {
        const userId = sessionData.session.user.id;
        console.log("User ID found:", userId);

        // Fetch user name from 'users' table
        const { data: userData, error } = await supabase
          .from("users")
          .select("name")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
          return;
        }

        console.log("User data fetched:", userData);
        setUser({
          id: userId,
          name: userData.name,
          email: sessionData.session.user.email,
        });
      } else {
        console.log("No user session found.");
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my" element={<LoggedInHome user={user} />} />
        <Route path="/loggedInHome" element={<LoggedInHome user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
