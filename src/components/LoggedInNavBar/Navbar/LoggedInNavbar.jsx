import { Link, useNavigate } from "react-router-dom";
import supabase from "../../../supabaseClient";
import "./LoggedInNavBar.css";

const LoggedInNavbar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/home"); // Redirect to home page
    } else {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/loggedInHome" className="logo">
          StudyBuddy
        </Link>
      </div>
      <ul className="nav-links"></ul>
      <div className="navbar-right">
        <Link to="/Events" className="auth-link">Events</Link>
        <Link to="/Create" className="auth-link">Create</Link>
        <Link to="/My" className="auth-link">My</Link>
        <button onClick={handleSignOut} className="logout-button">Sign Out</button>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;
