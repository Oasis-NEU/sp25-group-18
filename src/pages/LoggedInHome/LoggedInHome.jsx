import { useState, useEffect } from "react";
import "./LoggedInHome.css";
import LoggedInNavbar from "../../components/LoggedInNavBar/Navbar/LoggedInnavbar";
import PropTypes from "prop-types";

function LoggedInHome({ user }) {
  if (!user) {
    return <div>Loading...</div>; // Fallback for when user is still null
  }
  return (
    <>
      <LoggedInNavbar />
      <div className="welcome">
        <h1>Hi, {user.name}</h1>
        <h2>Ready to Find a Study Buddy?</h2>
      </div>
    </>
  );
}

LoggedInHome.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default LoggedInHome;
