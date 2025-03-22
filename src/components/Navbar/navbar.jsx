import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/home" className="logo">
          ProcrastiMates
        </Link>
      </div>
      <ul className="nav-links"></ul>
      <div className="navbar-right">
        <Link to="/login" className="auth-link">
          Login
        </Link>
        <Link to="/signup" className="auth-link">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
