import { Link } from "react-router-dom";
import "./LoggedInNavBar.css";

const LoggedInNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/loggedInHome" className="logo">
          StudyBuddy
        </Link>
      </div>
      <ul className="nav-links"></ul>
      <div className="navbar-right">
        <Link to="/Events" className="auth-link">
          Events
        </Link>
        <Link to="/Create" className="auth-link">
          Create
        </Link>
        <Link to="/My" className="auth-link">
          My
        </Link>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;
